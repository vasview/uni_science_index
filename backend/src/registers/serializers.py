from rest_framework import serializers
from .models import *

class AcademicDegreeRestrictedSerializer(serializers.ModelSerializer):
    value = serializers.SerializerMethodField('_get_degree_value')
    label = serializers.SerializerMethodField('_get_degree_label')

    def _get_degree_value(self, obj):
        return obj.id
    
    def _get_degree_label(self, obj):
        return obj.name
    
    class Meta:
        model = AcademicDegree
        fields = ['value', 'label']

class AcademicTitleSRestrictederializer(serializers.ModelSerializer):
    value = serializers.SerializerMethodField('_get_title_value')
    label = serializers.SerializerMethodField('_get_title_label')

    def _get_title_value(self, obj):
        return obj.id
    
    def _get_title_label(self, obj):
        return obj.name

    class Meta:
        model = AcademicTitle
        fields = ['value', 'label']
        

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
