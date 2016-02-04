from django.contrib import admin
from .models import Project, Todo, Photo


class ProjectAdmin(admin.ModelAdmin):
    pass


class PhotoAdmin(admin.ModelAdmin):
    pass


class TodoAdmin(admin.ModelAdmin):
    pass

admin.site.register(Project)
admin.site.register(Photo)
admin.site.register(Todo)
# Register your models here.
