from __future__ import unicode_literals

from django.db import models
from django.conf import settings


class Todo(models.Model):
    detail = models.TextField(null=False)
    status = models.CharField(max_length=1, choices=settings.STATUS_TYPES, null=True)
    priority = models.CharField(max_length=1, choices=settings.PRIORITY_TYPES, null=True)


class Photo(models.Model):
    related_project_id = models.CharField(max_length=250, null=True)
    #TODO: create sub directory
    image = models.ImageField(upload_to=settings.PROJECT_ROOT + settings.IMG_URL, null=True)


class Project(models.Model):
    project_id = models.CharField(max_length=250, null=True)
    project_name = models.CharField(max_length=250, null=True)
    client_name = models.CharField(max_length=250, null=True)
    deadline = models.DateTimeField(default=False, null=True)
    project_type = models.CharField(max_length=1, choices=settings.PROJECT_TYPES, null=True)
    #TODO: create sub directory
    poster = models.ImageField(upload_to=settings.PROJECT_ROOT + settings.IMG_URL, null=True)
    todos = models.ForeignKey(Todo, on_delete=models.SET_NULL, null=True, blank=True)
    photos = models.ForeignKey(Photo, on_delete=models.SET_NULL, null=True, blank=True)
    active = models.BooleanField(default=True)




