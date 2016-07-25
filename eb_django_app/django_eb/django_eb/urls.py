"""django_eb URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.9/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, patterns
from digiapi.views import index, login, logout, post_project, get_projects, post_photo, post_todo, get_project, get_media
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = patterns('',
    url(r'^admin/', admin.site.urls),
    url(r'^api/login', login),
    url(r'^api/logout', logout),
    url(r'^api/post_project', post_project),
    url(r'^api/projects', get_projects),
    url(r'^api/media/(?P<project_id>[A-Za-z0-9]+)', get_media),
    url(r'^api/projects/(?P<project_id>[A-Za-z0-9]+)', get_project),
    # url(r'^api/photos/(?P<project_id>[A-Za-z0-9]+)', get_photos),
    url(r'^api/post_photo/(?P<project_id>[A-Za-z0-9]+)', post_photo),
    url(r'^api/post_todo/(?P<project_id>[A-Za-z0-9]+)', post_todo),
    url(r'^$', index),

) + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
