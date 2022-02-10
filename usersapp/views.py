# from django.shortcuts import render
from rest_framework import mixins, viewsets
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer

from .models import User
from .serializers import UserSerializer, UserSerializerWithDetails

# Create your views here.


class UserCustomViewSet(
    viewsets.GenericViewSet,
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]

    def get_serializer_class(self):
        if self.request.version == "0.2":
            return UserSerializerWithDetails
        return UserSerializer