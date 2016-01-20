from __future__ import unicode_literals

from django.db import models

from djangotoolbox.fields import ListField


class Project(models.Model):
    PROJECT_TYPES = (
        ('I', 'Invitation'),
        ('L', 'Logo'),
        ('D', 'Dayof'),
        ('S', 'Syleshoot'),
        ('A', 'Addressing'),
    )
    project_id = models.CharField(max_length=250, null=True)
    project_name = models.CharField(max_length=250, null=True)
    client_name = models.CharField(max_length=250, null=True)
    deadline = models.DateTimeField(default=False, null=True)
    project_type = models.CharField(max_length=1, choices=PROJECT_TYPES)
    tags = ListField()



