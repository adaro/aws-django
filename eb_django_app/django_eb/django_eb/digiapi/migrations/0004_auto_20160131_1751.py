# -*- coding: utf-8 -*-
# Generated by Django 1.9 on 2016-02-01 01:51
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('digiapi', '0003_project_poster'),
    ]

    operations = [
        migrations.AlterField(
            model_name='project',
            name='poster',
            field=models.ImageField(upload_to='/Users/adaro/AWS/aws-django/eb_django_app/static/img'),
        ),
    ]
