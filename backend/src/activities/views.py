from rest_framework import viewsets, mixins
from rest_framework import permissions
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from rest_framework import status
from .models import *
from .serializers import *

class CopyrightCertificateViewSet(viewsets.ModelViewSet):
  queryset=CopyrightCertificate.objects.all()
  serializer_class=CopyrightCertificateSerializer

  def get_queryset(self):
      if self.request.method == 'GET':
          user = self.request.user
          return self.queryset.filter(user_id = user.id)
      else:
          return self.queryset.filter(id=self.kwargs['pk'])

  def perform_create(self, serializer):
      serializer.save(user=self.request.user)
      