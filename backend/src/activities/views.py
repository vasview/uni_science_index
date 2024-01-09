from rest_framework import viewsets, mixins
from rest_framework import permissions
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from rest_framework import status
from .models import *
from .serializers import *

class CopyrightCertificateViewSet(viewsets.ModelViewSet):
  queryset          = CopyrightCertificate.objects.all()
  serializer_class  = CopyrightCertificateSerializer

  def get_queryset(self):
    if self.request.method == 'GET':
      user = self.request.user
      return self.queryset.filter(user_id = user.id)
    else:
      return self.queryset.filter(id=self.kwargs['pk'])

  def perform_create(self, serializer):
    serializer.save(user=self.request.user)


class InventionApplicationViewSet(viewsets.ModelViewSet):
  queryset          = InventionApplication.objects.all()
  serializer_class  = InventionApplicationSerializer

  def get_queryset(self):
    if self.request.method == 'GET':
      user = self.request.user
      return self.queryset.filter(user_id = user.id)
    else:
      return self.queryset.filter(id=self.kwargs['pk'])

  def perform_create(self, serializer):
    serializer.save(user=self.request.user)


class InventionPatentViewSet(viewsets.ModelViewSet):
  queryset          = InventionPatent.objects.all()
  serializer_class  = InventionPatentSerializer

  def get_queryset(self):
    if self.request.method == 'GET':
      user = self.request.user
      return self.queryset.filter(user_id = user.id)
    else:
      return self.queryset.filter(id=self.kwargs['pk'])

  def perform_create(self, serializer):
    serializer.save(user=self.request.user)


class ConferenceViewSet(viewsets.ModelViewSet):
  queryset          = Conference.objects.all()
  serializer_class  = ConferenceSerializer

  def get_queryset(self):
    if self.request.method == 'GET':
      user = self.request.user
      return self.queryset.filter(user_id = user.id)
    else:
      return self.queryset.filter(id=self.kwargs['pk'])

  def perform_create(self, serializer):
    serializer.save(user=self.request.user)


class StaffMobilityViewSet(viewsets.ModelViewSet):
  queryset          = StaffMobility.objects.all()
  serializer_class  = StaffMobilitySerializer

  def get_queryset(self):
    if self.request.method == 'GET':
      user = self.request.user
      return self.queryset.filter(user_id = user.id)
    else:
      return self.queryset.filter(id=self.kwargs['pk'])

  def perform_create(self, serializer):
    serializer.save(user=self.request.user)