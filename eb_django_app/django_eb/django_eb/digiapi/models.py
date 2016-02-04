from __future__ import unicode_literals

from django.db import models
from django.conf import settings


class Todo(models.Model):
    detail = models.TextField(null=False)
    status = models.CharField(max_length=1, choices=settings.STATUS_TYPES, null=True)
    priority = models.CharField(max_length=1, choices=settings.PRIORITY_TYPES, null=True)


class Photo(models.Model):
    image = models.ImageField(upload_to=settings.PROJECT_ROOT + settings.IMG_URL)


class Project(models.Model):
    project_id = models.CharField(max_length=250, null=True)
    project_name = models.CharField(max_length=250, null=True)
    client_name = models.CharField(max_length=250, null=True)
    deadline = models.DateTimeField(default=False, null=True)
    project_type = models.CharField(max_length=1, choices=settings.PROJECT_TYPES, null=True)
    poster = models.ImageField(upload_to=settings.PROJECT_ROOT + settings.IMG_URL, null=True)
    todos = models.ForeignKey(Todo, on_delete=models.CASCADE)
    photos = models.ForeignKey(Photo, on_delete=models.SET_NULL, null=True, blank=True, related_name='+')
    active = models.BooleanField(default=True)




