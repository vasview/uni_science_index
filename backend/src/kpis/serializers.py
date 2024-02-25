from rest_framework import serializers
from .models import *

class UserDashboardSerializer(serializers.Serializer):
  id          = serializers.IntegerField(read_only=True)
  title       = serializers.CharField(required=True, max_length=150)
  front_link  = serializers.CharField(required=True, max_length=100)
  quantity    = serializers.IntegerField()