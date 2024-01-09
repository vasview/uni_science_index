from rest_framework import serializers
from .models import *

class AcademicDegreeSerializer(serializers.ModelSerializer):
    class Meta:
        model = AcademicDegree
        fields = '__all__'

class AcademicDegreeRestrictedSerializer(serializers.ModelSerializer):
    class Meta:
        model = AcademicDegree
        fields = ['id', 'name']

class AcademicTitleSerializer(serializers.ModelSerializer):
    class Meta:
        model = AcademicDegree
        fields = '__all__'

class ResearchDataBaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = ResearchDataBase
        fields = '__all__'

class ResearchDataBaseShortSerializer(serializers.ModelSerializer):
    class Meta:
        model = ResearchDataBase
        fields = ['id', 'name', 'sort']

class FundSourceSerializer(serializers.ModelSerializer):
    class Meta:
        model = FundSource
        fields = '__all__'

class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = '__all__'

class CitySerializer(serializers.ModelSerializer):
    class Meta:
        model = City
        fields = '__all__'
