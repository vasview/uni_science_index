from rest_framework import serializers
from registers.serializers import *
from .models import *
from registers.models import AcademicDegree, AcademicTitle, ResearchDataBase

from djoser.serializers import UserCreateSerializer as BaseUserRegistrationSerializer

from django.contrib.auth import get_user_model
User = get_user_model()

class UserRegistrationSerializer(BaseUserRegistrationSerializer):
    class Meta(BaseUserRegistrationSerializer.Meta):
        model = User
        fields = ['id', 'email', 'user_name', 'password']


class MyUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'user_name', 'is_active']


class ProfileSerializer(serializers.ModelSerializer):
    academic_title_obj = serializers.SerializerMethodField('_get_title_obj')
    academic_degree_obj = serializers.SerializerMethodField('_get_degree_obj')
    
    def _get_title_obj(self, obj):
        if obj.academic_title_id:
            academic_title = AcademicTitle.objects.get(id = obj.academic_title_id)
            return AcademicTitleSRestrictederializer(academic_title, 
                                                    many=False,
                                                    read_only=True).data
        else:
            return {"value": None, "label": None}

    def _get_degree_obj(self, obj):
        if obj.academic_degree_id:
            academic_degree = AcademicDegree.objects.get(id = obj.academic_degree_id)
            return AcademicDegreeRestrictedSerializer(academic_degree, 
                                                      many=False,
                                                      read_only=True).data
        else:
            return {"value": None, "label": None}

    user = MyUserSerializer(
        many=False,
        read_only=True
    )
    
    class Meta:
        model = Profile
        fields = ['id', 'first_name', 'middle_name', 'last_name',
                  'mobile', 'gender', 'academic_degree', 'academic_title',
                   'academic_title_obj', 'academic_degree_obj', 'user']


class ScientificProfileSerializer(serializers.ModelSerializer):
    research_db_name = serializers.ReadOnlyField(source='research_db.name')

    class Meta:
        model = ScientificProfile
        fields = '__all__'
        read_only_fields = ('user',) 
