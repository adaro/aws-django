from django.contrib import admin
from .models import Project

class ProjectAdmin(admin.ModelAdmin):
    pass

admin.site.register(Project)
# Register your models here.
