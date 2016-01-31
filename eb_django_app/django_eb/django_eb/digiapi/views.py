from django.http import JsonResponse
from django.shortcuts import render, render_to_response
from models import Project
from django.conf import settings
from django.contrib.auth.decorators import login_required
from utils import generate_token
from django.views.decorators.csrf import csrf_exempt
from auth import authenticate_digi_user
from django.shortcuts import redirect
import json

@csrf_exempt
def login(request):
    if request.method == "POST":
        data = json.loads(request.body)
        is_valid = authenticate_digi_user(data.get('username', None), data.get('password',None))
        if is_valid:
            return render(request, 'index.html', {'STATIC_URL': settings.STATIC_URL})
        else:
            return redirect('%s?next=%s' % ("api/login", "/"))

    return render(request, 'index.html', {'STATIC_URL': settings.STATIC_URL})


def logout(request):
    return render(request, 'index.html', {'STATIC_URL': settings.STATIC_URL})


def index(request):
    if request.user.is_authenticated():
        return render(request, 'index.html', {'STATIC_URL': settings.STATIC_URL})
    else:

        return redirect('%s?next=%s' % ("api/login", request.path))
