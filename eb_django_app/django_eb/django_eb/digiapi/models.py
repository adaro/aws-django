from __future__ import unicode_literals

from django.db import models

class Project(models.Model):
    PROJECT_TYPES = (
        ('I', 'Invitation'),
        ('L', 'Logo'),
	('D', 'Dayof'),
        ('S', 'Syleshoot'),
        ('A', 'Addressing'),
    )
    project_id = models.CharField(max_length=250, )
    project_name = models.CharField(max_length=250)
    client_name = models.CharField(max_length=250)
    deadline = models.DateTimeField('absolute dealine', default=False, null=True)
    project_type = models.CharField(max_length=1, choices=PROJECT_TYPES)



