from rest_framework import serializers

from .models import *

class GScholarPublicationSerializer(serializers.ModelSerializer):
  class Meta: 
    model = GoogleScholarPublication
    fields = [
      'title', 'link', 'authors', 'publication', 'year', 'citation_number'
    ]


class MonographPublicationSerializer(serializers.ModelSerializer):
  class Meta:
    model = MonographPublication
    fields = '__all__'
    read_only_fields = ('user',)
