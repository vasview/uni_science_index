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
    academic_degree = serializers.PrimaryKeyRelatedField(
        source='academic_degree.id',
        read_only=True
    )

    user = MyUserSerializer(
        many=False,
        read_only=True
    )
    
    class Meta:
        model = Profile
        fields = ['id', 'first_name', 'middle_name', 'last_name',
                  'mobile', 'gender', 'academic_degree', 'academic_title',
                  'user']

class ScientificProfileSerializer(serializers.ModelSerializer):
    research_db_name = serializers.ReadOnlyField(source='research_db.name')

    class Meta:
        model = ScientificProfile
        fields = '__all__'
        read_only_fields = ('user',) 
