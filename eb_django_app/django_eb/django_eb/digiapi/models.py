from __future__ import unicode_literals
import os
from django.core import serializers
from utils import send_file
from django.db import models
from django.conf import settings
from django.core.files.storage import FileSystemStorage
from django.http import HttpResponse

PRIVATE_DIR = os.path.join(settings.BASE_DIR, '/eb_django_app/static/img/')
FS = FileSystemStorage(location=PRIVATE_DIR)


class TodoManager(models.Manager):
    def get_by_natural_key(self, detail, status, priority, index):
        return self.get(detail=detail, status=status, priority=priority, index=index)


class Todo(models.Model):
    objects = TodoManager()
    index = models.IntegerField(null=True)
    title = models.TextField(null=False, unique=True)
    detail = models.TextField(null=False)
    status = models.CharField(max_length=1, choices=settings.STATUS_TYPES, null=True)
    created = models.DateTimeField(auto_now_add=True)
    priority = models.CharField(max_length=1, choices=settings.PRIORITY_TYPES, null=True)

    def natural_key(self):
        return {"title": self.title, "detail": self.detail, "status": self.status, "created": self.created,
                "priority": self.priority, 'index': self.index}

    class Meta:
        unique_together = (('title', 'detail', 'status', 'created', 'priority', 'index'),)


class PhotoManager(models.Manager):
    def get_by_natural_key(self, image):
        return self.get(image=image)


class Photo(models.Model):
    objects = PhotoManager()
    #TODO: create sub directory
    image = models.ImageField(upload_to='photo', null=True, blank=True) #storage=FS

    def natural_key(self):
        return (self.image.url)


class Project(models.Model):
    project_id = models.CharField(max_length=250, null=True)
    project_name = models.CharField(max_length=250, null=True)
    client_name = models.CharField(max_length=250, null=True)
    deadline = models.DateTimeField(default=False, null=True)
    project_type = models.CharField(max_length=1, choices=settings.PROJECT_TYPES, null=True)
    #TODO: create sub directory
    poster = models.ImageField(upload_to='photo', null=True, blank=True)
     # /Users/adaro/PycharmProjects/DIGIBOARD/eb_django_app/static/img/photos
    todos = models.ManyToManyField(Todo, blank=True)
    photos = models.ManyToManyField(Photo, blank=True)
    active = models.BooleanField(default=True)

    def get_projects(self):
        #TODO: this should not use the model it should use self, refactor to JsonResponse
        data = serializers.serialize('json', Project.objects.all(), use_natural_foreign_keys=True)
        return HttpResponse(data)

    def get_project(self, project_id):
        #TODO: this should not use the model it should use self, refactor to JsonResponse
        data = serializers.serialize('json', Project.objects.filter(id=project_id), use_natural_foreign_keys=True)
        return HttpResponse(data)

    def get_media(self, project_id):
        #TODO: this should not use the model it should use self, refactor to JsonResponse
        project = Project.objects.get(id=project_id)
        img = open(str(project.poster), 'r')
        return send_file(img)
