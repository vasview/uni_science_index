from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import permissions
from rest_framework.response import Response
import datetime
from activities.models import ResearchResultInfo
from .models import *
from .serializers import *

class UserDashboards(APIView):
  permission_classes = [permissions.IsAuthenticated]

  def get_research_result_info(self, user):
    today = datetime.date.today()
    crnt_year = today.year
    info = ResearchResultInfo.objects.filter(user = user, year=crnt_year).values()
    return info
  
  def count_activities(self, research_result, item):
    if research_result and research_result.first()[item['src_field']]:
      val = research_result.first()[item['src_field']]
    else: 
      val = 0
    return val
  
  def prepare_dashboard_data(self, user, indicators):
    research_result = self.get_research_result_info(user)

    result = []
    for item in indicators:
      result.append(item)
      index = len(result) - 1
      result[index]['quantity'] = self.count_activities(research_result, item)
    return result

  def get(self, request):
    indicators = IndicatorRegister.objects.filter(active=True).values()
    result = self.prepare_dashboard_data(request.user, indicators)

    serializer_class = UserDashboardSerializer(result, many=True)
    return Response(serializer_class.data)
