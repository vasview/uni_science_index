from rest_framework import serializers
from .models import *

class UnitTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = UnitType
        fields = '__all__'

class UniversityUnitSerializer(serializers.ModelSerializer):
    class Meta:
        model = UniversityUnit
        fields = '__all__'

class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = '__all__'
