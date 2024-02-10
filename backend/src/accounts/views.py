from rest_framework import viewsets, mixins
from django.http import Http404
from django.http import JsonResponse
from rest_framework import status
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
            return self.queryset.filter(id=self.kwargs['pk'])

    def perform_update(self, serializer):
        user = self.request.user
        serializer.save(user=self.request.user)
    
class ScientificProfileViewSet(viewsets.ModelViewSet):
    queryset = ScientificProfile.objects.all()
    serializer_class = ScientificProfileSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        if self.request.method == 'GET':
            user = self.request.user
            return self.queryset.filter(user_id = user.id)
        else:
            return self.queryset.filter(id=self.kwargs['pk'])

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def destroy(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            self.perform_destroy(instance)
        except Http404:
            pass
        return JsonResponse({'status': status.HTTP_204_NO_CONTENT})
    
    def perform_destroy(self, instance):
        instance.delete()
