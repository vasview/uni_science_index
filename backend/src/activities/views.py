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


class ThesisDefenceViewSet(viewsets.ModelViewSet):
  queryset          = ThesisDefence.objects.all()
  serializer_class  = ThesisDefenceSerializer

  def get_queryset(self):
    if self.request.method == 'GET':
      user = self.request.user
      return self.queryset.filter(user_id = user.id)
    else:
      return self.queryset.filter(id=self.kwargs['pk'])

  def perform_create(self, serializer):
    serializer.save(user=self.request.user)


class DoctoralResearchSupervisionViewSet(viewsets.ModelViewSet):
  queryset          = DoctoralResearchSupervision.objects.all()
  serializer_class  = DoctoralResearchSupervisionSerializer

  def get_queryset(self):
    if self.request.method == 'GET':
      user = self.request.user
      return self.queryset.filter(user_id = user.id)
    else:
      return self.queryset.filter(id=self.kwargs['pk'])
    
  def get_value_if_not_none(self, value):
    if value is not None:
      return ' ' + value
    else:
      return ''
    
  def make_std_full_name(self, request):
    f_name = self.get_value_if_not_none(self.request.data['std_first_name'])
    mid_name = self.get_value_if_not_none(self.request.data['std_middle_name'])
    l_name = self.get_value_if_not_none(self.request.data['std_last_name'])
    full_name = f_name + mid_name + l_name
    return full_name.strip()

  def perform_create(self, serializer):
    full_name = self.make_std_full_name(self.request)
    serializer.save(user=self.request.user, std_fullname=full_name)

  def perform_update(self, serializer):
    full_name = self.make_std_full_name(self.request)
    serializer.save(user=self.request.user, std_fullname=full_name)


class StudentResearchSupervisionViewSet(viewsets.ModelViewSet):
  queryset          = StudentResearchSupervision.objects.all()
  serializer_class  = StudentResearchSupervisionSerializer

  def get_queryset(self):
    if self.request.method == 'GET':
      user = self.request.user
      return self.queryset.filter(user_id = user.id)
    else:
      return self.queryset.filter(id=self.kwargs['pk'])
    
  def get_value_if_not_none(self, value):
    if value is not None:
      return ' ' + value
    else:
      return ''
    
  def make_std_full_name(self, request):
    f_name = self.get_value_if_not_none(self.request.data['std_first_name'])
    mid_name = self.get_value_if_not_none(self.request.data['std_middle_name'])
    l_name = self.get_value_if_not_none(self.request.data['std_last_name'])
    full_name = f_name + mid_name + l_name
    return full_name.strip()

  def perform_create(self, serializer):
    full_name = self.make_std_full_name(self.request)
    serializer.save(user=self.request.user, std_fullname=full_name)

  def perform_update(self, serializer):
    full_name = self.make_std_full_name(self.request)
    serializer.save(user=self.request.user, std_fullname=full_name)
    