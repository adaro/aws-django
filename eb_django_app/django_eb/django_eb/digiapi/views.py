from django.http import JsonResponse
from django.shortcuts import render, render_to_response
from models import Project
from django.conf import settings
from utils import generate_token
from auth import authenticate_digi_user
import json


def login(request):
    data = json.loads(request.body)
    print data
    if data.get("username", None) and data.get("password", None):
        valid_user = authenticate_digi_user(data["username"], data["password"])
        if valid_user:
            token = generate_token()
            return JsonResponse({'STATIC_URL': settings.STATIC_URL, 'token': token})
        else:
            return JsonResponse({'STATIC_URL': settings.STATIC_URL, 'error': 'Username / password combination did not authenticate'})
    else:
        return JsonResponse({'STATIC_URL': settings.STATIC_URL, 'error': 'Must supply username and password'})


def logout(request):
    return render(request, 'index.html', {'STATIC_URL': settings.STATIC_URL})


def index(request):
    return render(request, 'index.html', {'STATIC_URL': settings.STATIC_URL})
