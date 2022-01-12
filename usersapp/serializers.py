from rest_framework.serializers import HyperlinkedModelSerializer

from .models import User


class UserModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = User
        # fields = "__all__"
        fields = [
            "username",
            "first_name",
            "last_name",
            "email",
        ]
