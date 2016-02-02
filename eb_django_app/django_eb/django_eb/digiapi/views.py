from django.http import JsonResponse, HttpResponseForbidden
from django.shortcuts import render, render_to_response
from django.http import HttpResponse, HttpResponseBadRequest, HttpResponseNotAllowed
from models import Project
from django.conf import settings
from django.contrib.auth.decorators import login_required
from utils import generate_token
from django.views.decorators.csrf import csrf_exempt
from auth import authenticate_digi_user
from django.shortcuts import redirect
import json
from forms import ProjectForm

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


def logout(request):
    # render index with logout view
    return render(request, 'index.html', {'STATIC_URL': settings.STATIC_URL})


def index(request):
    # check is user is authenticated and render index else redirect to login view
    if request.user.is_authenticated():
        print "auth'd! rendering index.html"
        return render(request, 'index.html', {'STATIC_URL': settings.STATIC_URL})
    else:
        return redirect('%s?next=%s' % ("api/login", request.path))


@csrf_exempt
def create_project(request):
    if request.method == 'POST':
        form = ProjectForm(request.POST, request.FILES)
        if form.is_valid():
            print form.cleaned_data
            #TODO: needs a fixin' use get or create project
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