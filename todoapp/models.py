from uuid import uuid4

from django.db import models
from django.utils import timezone

from usersapp.models import User

# Create your models here.


class Project(models.Model):
    uuid = models.UUIDField(primary_key=True, default=uuid4)
    name = models.CharField(max_length=128)
    repo_link = models.URLField(blank=True, null=True)
    users = models.ManyToManyField(User)

    def __str__(self):
        return self.name


class TODO(models.Model):
    uuid = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    task_text = models.CharField(max_length=255)
    date_created = models.DateTimeField(default=timezone.now)
    date_updated = models.DateTimeField(default=timezone.now)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    is_active = models.BooleanField(default=True)
