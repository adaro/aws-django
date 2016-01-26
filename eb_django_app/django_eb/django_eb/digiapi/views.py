from django.http import HttpResponse
from django.shortcuts import render, render_to_response
from models import Project


def index(request):
    ctx = {}
    return render(request, 'index.html', ctx)


def set_project_name(request):
    # if this is a POST request we need to process the form data
    if request.method == 'POST':
        # create a form instance and populate it with data from the request:
        post = str(request) or None
        project_id = "test id"
        project_name = "test name"
        # deadline = ""
        client_name = "test client name"

        p = Project(project_id=project_id, project_name=project_name, client_name=client_name)
        p.save()
        return HttpResponse(post)
    else:
        return HttpResponse("GET")
