import graphene
from graphene_django import DjangoObjectType
from todoapp.models import Project, TODO
from usersapp.models import User


class TODOType(DjangoObjectType):
    class Meta:
        model = TODO
        fields = "__all__"


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = "__all__"


class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = "__all__"


class Query(graphene.ObjectType):
    all_TODOs = graphene.List(TODOType)
    all_Projects = graphene.List(ProjectType)
    all_Users = graphene.List(UserType)
    TODOs_by_project_uuid = graphene.List(
        TODOType, project_uuid=graphene.UUID(required=True)
    )
    TODOs_by_project_name = graphene.List(
        TODOType, project_name=graphene.String(required=False)
    )
    active_TODOs = graphene.List(TODOType)

    def resolve_all_TODOs(self, info):
        return TODO.objects.all()

    def resolve_all_Projects(self, info):
        return Project.objects.all()

    def resolve_all_Users(self, info):
        return User.objects.all()

    def resolve_TODOs_by_project_uuid(self, info, project_uuid):
        try:
            return TODO.objects.filter(project=project_uuid)
        except TODO.DoesNotExist:
            return None

    def resolve_TODOs_by_project_name(self, info, project_name):
        if project_name:
            try:
                return TODO.objects.filter(project__name=project_name)
            except TODO.DoesNotExist:
                return None
        return TODO.objects.all()

    def resolve_active_TODOs(self, info):
        try:
            return TODO.objects.filter(is_active=True)
        except TODO.DoesNotExist:
            return None


schema = graphene.Schema(query=Query)