from rest_framework import serializers

from .models import *
from activities.serializers import StudentResearchSupervisionShortSerializer

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


class StudentResearchPubSerializer(serializers.ModelSerializer):
  student_work_title = serializers.ReadOnlyField(source='student_research.topic')

  class Meta:
    model = StudentResearchPublication
    fields = '__all__'
    read_only_fields = ('user', 'student_work_title',)
