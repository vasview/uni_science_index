from rest_framework import viewsets, mixins
from rest_framework.mixins import ListModelMixin
from rest_framework import permissions
from rest_framework.generics import RetrieveUpdateAPIView
from .models import *
from .serializers import *

class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = MyUserSerializer
    # permission_classes = [permissions.IsAuthenticated]

class UserProfileViewSet(ListModelMixin, viewsets.GenericViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        user = self.request.user
        return self.queryset.filter(user_id = user.id)

class UpdateUserProfileViewSet(RetrieveUpdateAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    lookup_field = 'id'

class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        if self.request.method == 'GET':
            user = self.request.user
            return self.queryset.filter(user_id = user.id)
        else:
            self.queryset.get(id=self.kwargs[:id])
    
class ScientificProfileViewSet(viewsets.ModelViewSet):
    queryset = ScientificProfile.objects.all()
    serializer_class = ScientificProfileSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        if self.request.method == 'GET':
            user = self.request.user
            return self.queryset.filter(user_id = user.id)
        else:
            self.queryset.get(id=self.kwargs[:id])

