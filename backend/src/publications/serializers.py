from rest_framework import serializers

from .models import GoogleScholarPublication

class GScholarPublicationSerializer(serializers.ModelSerializer):
  class Meta: 
    model = GoogleScholarPublication
    fields = [
      'title', 'link', 'authors', 'publication', 'year', 'citation_number'
    ]

