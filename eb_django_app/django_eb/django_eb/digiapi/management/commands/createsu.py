from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from profiles.models import MyUser

class Command(BaseCommand):
    def handle(self, *args, **options):
        if MyUser.objects.count() == 0:
            MyUser.objects.create_superuser("admin", "treerating", "password")