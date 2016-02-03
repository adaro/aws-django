from django.contrib import admin
from .models import Project, Todo

class ProjectAdmin(admin.ModelAdmin):
    pass

class TodoAdmin(admin.ModelAdmin):
    pass

admin.site.register(Project)
admin.site.register(Todo)
# Register your models here.
