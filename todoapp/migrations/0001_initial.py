# Generated by Django 2.2.26 on 2022-01-19 18:40

import uuid

import django.db.models.deletion
import django.utils.timezone
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name="Project",
            fields=[
                ("uuid", models.UUIDField(default=uuid.uuid4, primary_key=True, serialize=False)),
                ("name", models.CharField(max_length=128)),
                ("repo_link", models.URLField(blank=True, null=True)),
                ("users", models.ManyToManyField(to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name="TODO",
            fields=[
                (
                    "uuid",
                    models.UUIDField(
                        default=uuid.UUID("670de5c4-79f1-4b92-9f14-4324958adea8"), primary_key=True, serialize=False
                    ),
                ),
                ("task_text", models.CharField(max_length=255)),
                ("date_created", models.DateTimeField(default=django.utils.timezone.now)),
                ("date_updated", models.DateTimeField(default=django.utils.timezone.now)),
                ("is_active", models.BooleanField(default=True)),
                (
                    "created_by",
                    models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
                ),
                ("project", models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to="todoapp.Project")),
            ],
        ),
    ]
