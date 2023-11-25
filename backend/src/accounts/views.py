from rest_framework import viewsets, mixins
from rest_framework import permissions
from .models import *
from .serializers import *

class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = MyUserSerializer
    # permission_classes = [permissions.IsAuthenticated]

class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class ScientificProfileViewSet(viewsets.ModelViewSet):
    queryset = ScientificProfile.objects.all()
    serializer_class = ScientificProfileSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
