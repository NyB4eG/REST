import json  # нужен для чтения содержимого ответа от сервера
from django.test import TestCase  # базовый класс для создания Django-теста
from rest_framework import status  # содержит константы для ответов сервера
from rest_framework.test import (
    APIRequestFactory,  # фабрика для создания запросов
    force_authenticate,  # функция для авторизации пользователя
    APIClient,  # клиент для удобной отправки REST-запросов
    APISimpleTestCase,  # класс для создания простых test cases
    APITestCase,  # класс для создания test cases для REST API
)

# from mixer.backend.django import mixer  # библиотека для генерации тестовых данных
# from django.contrib.auth.models import User  # модель пользователя
from django.contrib.auth import get_user_model
from rest_framework.authtoken.models import Token

# from .views import ProjectModelViewSet, TODOModelViewSet
# from .models import User

# Create your tests here.
User = get_user_model()


class TestUserModelViewSet(TestCase):
    def test_edit_user(self):
        admin = User.objects.create_superuser("admin", "admin@local.host", "password")

        client = APIClient()

        user = User.objects.create(
            email="user@local.host", username="user", password="password"
        )

        client.login(username="admin", password="password")

        response = client.put(
            f"/api/users/{user.uuid}/",
            {
                "email": "user_new@local.host",
                "username": "user_new",
                "password": "password",
            },
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        user = User.objects.get(uuid=user.uuid)
        self.assertEqual(user.email, "user_new@local.host")
        self.assertEqual(user.username, "user_new")
        client.logout