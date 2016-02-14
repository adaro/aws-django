from django.http import JsonResponse, HttpResponseForbidden
from django.shortcuts import render, render_to_response
from django.http import HttpResponse, HttpResponseBadRequest, HttpResponseNotAllowed
from models import Project, Todo, Photo
from django.conf import settings
from django.contrib.auth.decorators import login_required
from utils import generate_token
from django.views.decorators.csrf import csrf_exempt
from auth import authenticate_digi_user, logout_digi_user
from django.shortcuts import redirect
import json
from forms import ProjectForm, PhotoForm, TodoForm
from django.core import serializers

@csrf_exempt
def login(request):
    # handle any POST login attempts, authenticate user and render login view
    if request.method == "POST":
        data = json.loads(request.body)
        is_valid = authenticate_digi_user(data.get('username', None), data.get('password', None))
        if is_valid:
            token = generate_token()
            return JsonResponse({"token": token})
        else:
            return JsonResponse({"login_error": settings.LOGIN_ERROR_MSG})


    # redirected to logout view if GET request
    print "not auth'd rendering logout view"
    return redirect('%s?next=%s' % ("/api/logout", "/"))

@csrf_exempt
def logout(request):
    # render index with logout view
    logout_digi_user(request)
    return render(request, 'index.html', {'STATIC_URL': settings.STATIC_URL})

@csrf_exempt
def index(request):
    # check is user is authenticated and render index else redirect to login view
    if request.user.is_authenticated():
        print "auth'd! rendering index.html"
        return render(request, 'index.html', {'STATIC_URL': settings.STATIC_URL})
    else:
        return redirect('%s?next=%s' % ("api/login", request.path))


@csrf_exempt
def get_projects(request):
    data = serializers.serialize('json', Project.objects.all(), use_natural_foreign_keys=True)
    return HttpResponse(data)

def get_project(request, project_id):
    data = serializers.serialize('json', Project.objects.filter(id=project_id), use_natural_foreign_keys=True)
    return HttpResponse(data)

#TODO: serialize these into the Project model
# @csrf_exempt
# def get_photos(request, project_id):
#     all = Photo.objects.all()
#     for i in all:
#         print i.image
#     data = serializers.serialize('json', Photo.objects.filter(related_project_id=project_id))
#     return HttpResponse(data)


#TODO: create update_poject views, one for updating adding todos  along with a view or editing project

@csrf_exempt
def post_project(request):
    if request.method == 'POST':
        form = ProjectForm(request.POST, request.FILES)
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
            #TODO: dont redirect here send through ajax
            return render(request, 'index.html', {'STATIC_URL': settings.STATIC_URL})
        print form.errors

@csrf_exempt
def post_todo(request, project_id):
    if request.method == 'POST':
        form = TodoForm(request.POST)

        if form.is_valid():

            detail = form.cleaned_data['detail']
            status = form.cleaned_data['status']
            priority = form.cleaned_data['priority']

            p = Project.objects.get(id=project_id)
            t = Todo.objects.create(detail=detail, status=status, priority=priority)
            p.todos.add(t)
            p.save()
            return JsonResponse({"data": "success"})
        print form.errors

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