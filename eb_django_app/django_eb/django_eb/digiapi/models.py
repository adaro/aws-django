from __future__ import unicode_literals

from django.db import models
from django.conf import settings


class TodoManager(models.Manager):
    def get_by_natural_key(self, detail, status, priority):
        return self.get(detail=detail, status=status, priority=priority)


class Todo(models.Model):
    objects = TodoManager()

    detail = models.TextField(null=False)
    status = models.CharField(max_length=1, choices=settings.STATUS_TYPES, null=True)
    priority = models.CharField(max_length=1, choices=settings.PRIORITY_TYPES, null=True)

    def natural_key(self):
        return {"detail":self.detail, "status":self.status, "priority":self.priority}

    class Meta:
        unique_together = (('detail', 'status', 'priority'),)


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
    todos = models.ManyToManyField(Todo, blank=True)
    #TODO: refactor to m2m
    photos = models.ForeignKey(Photo, on_delete=models.SET_NULL, null=True, blank=True)
    active = models.BooleanField(default=True)


