from rest_framework import serializers
from registers.serializers import *
from .models import *
from registers.models import AcademicDegree, AcademicTitle

from djoser.serializers import UserCreateSerializer as BaseUserRegistrationSerializer

from django.contrib.auth import get_user_model
User = get_user_model()

class UserRegistrationSerializer(BaseUserRegistrationSerializer):
    class Meta(BaseUserRegistrationSerializer.Meta):
        model = User
        fields = ['id', 'email', 'user_name', 'password']

class ProfileSerializer(serializers.ModelSerializer):
    # academic_degree = serializers.RelatedField(source='registers.academic_degree', 
    #                                            read_only=True)
    academic_degree = serializers.PrimaryKeyRelatedField(
        source='academic_degree.id',
        read_only=True
    )
    # academic_degree = serializers.PrimaryKeyRelatedField(
    #     read_only=False,
    #     queryset = AcademicDegree.objects.all()
    # )
    # academic_degree = AcademicDegreeRestrictedSerializer(read_only=False)

    class Meta:
        model = Profile
        fields = ['id', 'user', 'first_name', 'middle_name', 'last_name',
                  'mobile', 'gender','academic_degree', 'academic_title']
        # extra_fields = ['academic_degree']

class MyUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'user_name', 'is_active']

class ScientificProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = ScientificProfile
        fields = '__all__'
