from django.views.generic import View
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from models import Project, Todo, Photo
from django.conf import settings
from utils import generate_token
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from auth import authenticate_digi_user, logout_digi_user
from django.shortcuts import redirect
import json
from forms import ProjectForm, PhotoForm, TodoForm, DeleteTodoForm


class LoginView(View):

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super(LoginView, self).dispatch(request, *args, **kwargs)

    def post(self, request):
        data = json.loads(request.body)
        is_valid = authenticate_digi_user(data.get('username', None), data.get('password', None))
        if is_valid:
            token = generate_token()
            return JsonResponse({"token": token})
        else:
            return redirect('%s?next=%s' % ("/api/logout", "/"))


class LogoutView(View):

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super(LogoutView, self).dispatch(request, *args, **kwargs)

    def post(self, request):
        # render index with logout view
        logout_digi_user(request)
        return render(request, 'index.html', {'STATIC_URL': settings.STATIC_URL})


class IndexView(View):
    def get(self, request):
        # check is user is authenticated and render index else redirect to login view
        if request.user.is_authenticated():
            return render(request, 'index.html', {'STATIC_URL': settings.STATIC_URL})
        else:
            return redirect('%s?next=%s' % ("api/login", request.path))

class ProjectsView(View):
    @staticmethod
    def get(self):
        project = Project()
        return project.get_projects()

class ProjectView(View):

    form_class = ProjectForm
    template_name = 'index.html'

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super(ProjectView, self).dispatch(request, *args, **kwargs)

    def get(self, request, project_id):
        project = Project()
        return project.get_project(project_id)

    def post(self, request):
        form = self.form_class(request.POST, request.FILES)
        if form.is_valid():
            m = Project()
            m.project_id = form.cleaned_data['projectid']
            m.project_name = form.cleaned_data['projectname']
            m.client_name = form.cleaned_data['clientname']
            m.deadline = form.cleaned_data['deadline']
            #TODO: needs a fixin'
            m.project_type = 1
            m.poster = form.cleaned_data['poster']
            m.save()
            #TODO: dont render here send through ajax
            return render(request, self.template_name, {'STATIC_URL': settings.STATIC_URL})
        print form.errors

class MediaView(View):

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super(MediaView, self).dispatch(request, *args, **kwargs)

    def get(self, request, project_id):
        project = Project()
        return project.get_media(project_id)



#TODO: serialize these into the Photo model
# @csrf_exempt
# def get_photos(request, project_id):
#     all = Photo.objects.all()
#     for i in all:
#         print i.image
#     data = serializers.serialize('json', Photo.objects.filter(related_project_id=project_id))
#     return HttpResponse(data)


#TODO: create update_poject views, one for updating adding todos  along with a view or editing projectc
class TodoView(View):

    form_class = TodoForm
    delete_form_class = DeleteTodoForm

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super(TodoView, self).dispatch(request, *args, **kwargs)

    def post(self, request, project_id):
        form = self.form_class(request.POST)
        if form.is_valid():
            title = form.cleaned_data['title']
            detail = form.cleaned_data['detail']
            status = form.cleaned_data['status']
            priority = form.cleaned_data['priority']
            index = form.cleaned_data['index']
            print index
            p = Project.objects.get(id=project_id)
            t = Todo.objects.create(title=title, detail=detail, status=status, priority=priority, index=index)
            p.todos.add(t)
            p.save()
            return HttpResponse({"data": "success"})
        print form.errors

    def delete(self, request, project_id):
        print dir(request)
        # form = self.delete_form_class(request.POST)
        # if form.is_valid():
        #     detail = form.cleaned_data['todo']
        #     print detail
        #     todo = Todo.objects.get(detail=detail)
        #     p = Project.objects.get(id=project_id)
        #     result = p.todos.remove(todo)
        #     #TODO: add check here for reult
        #     return HttpResponse("success")

# @csrf_exempt
# def delete_todo(request, project_id):
#     if request.method == 'POST':
#         form = DeleteTodoForm(request.POST)
#         if form.is_valid():
#             detail = form.cleaned_data['todo']
#             todo = Todo.objects.get(detail=detail)
#             p = Project.objects.get(id=project_id)
#             result = p.todos.remove(todo)
#             #TODO: add check here for reult
#             return HttpResponse("success")

@csrf_exempt
def post_photo(request, project_id):
    if request.method == 'POST':
        form = PhotoForm(request.POST, request.FILES)

        if form.is_valid():
            p = Project.objects.get(id=project_id)
            image = form.cleaned_data['file']
            ph = Photo.objects.create(image=image)
            p.photos.add(ph)
            p.save()
            return JsonResponse({"data": "success"})
        print form.errors