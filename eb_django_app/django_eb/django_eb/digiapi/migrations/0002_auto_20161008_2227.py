# -*- coding: utf-8 -*-
# Generated by Django 1.9 on 2016-10-09 05:27
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('digiapi', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='todo',
            name='title',
            field=models.TextField(unique=True),
        ),
    ]