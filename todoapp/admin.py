from django.contrib import admin

from .models import TODO, Project

# Register your models here.

admin.site.register(Project)
admin.site.register(TODO)
