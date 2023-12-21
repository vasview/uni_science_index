from rest_framework import serializers
from .models import *

class CopyrightCertificateSerializer(serializers.ModelSerializer):
  class Meta:
    model = CopyrightCertificate
    fields = '__all__'
    read_only_fields = ('user',) 
