from rest_framework import serializers
from .models import *

class CopyrightCertificateSerializer(serializers.ModelSerializer):
  class Meta:
    model = CopyrightCertificate
    fields = '__all__'
    read_only_fields = ('user',) 


class InventionApplicationSerializer(serializers.ModelSerializer):
  class Meta:
    model = InventionApplication
    fields = '__all__'
    read_only_fields = ('user',)


class InventionPatentSerializer(serializers.ModelSerializer):
  class Meta:
    model = InventionPatent
    fields = '__all__'
    read_only_fields = ('user',)


class ConferenceSerializer(serializers.ModelSerializer):
  class Meta:
    model = Conference
    fields = '__all__'
    read_only_fields = ('user',)


class StaffMobilitySerializer(serializers.ModelSerializer):
  class Meta:
    model = StaffMobility
    fields = '__all__'
    read_only_fields = ('user',)


class ThesisDefenceSerializer(serializers.ModelSerializer):
  class Meta:
    model = ThesisDefence
    fields = '__all__'
    read_only_fields = ('user',)
