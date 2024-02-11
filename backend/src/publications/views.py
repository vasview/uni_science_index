from rest_framework import viewsets, mixins
from rest_framework.generics import ListAPIView
from rest_framework.views import APIView
from rest_framework import permissions
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from rest_framework import status
from .models import *
from .serializers import *
from .gscholar_service import *
from accounts.models import ScientificProfile
from registers.models import ResearchDataBase
from .serializers import GScholarPublicationSerializer

class AuthorPublications(APIView):
  permission_classes = [permissions.IsAuthenticatedOrReadOnly]

  def get(self, request, sci_profile_id, format=None):
    user = request.user
    sci_account = get_object_or_404(ScientificProfile, id=sci_profile_id)
  
    scholar_RDB = ResearchDataBase.objects.filter(name='Google Scholar')

    if user and scholar_RDB[0].name == sci_account.research_db.name:
      account = sci_account.account
      self.process_gscholar_response(user, account)
      # return JsonResponse(result)
      return JsonResponse({'status': status.HTTP_200_OK})
    else:
      return JsonResponse({'status': status.HTTP_405_METHOD_NOT_ALLOWED})

  def process_gscholar_response(self, user, account):
    result = get_publications_by_author(account)
    pubs = result['articles']
    if len(pubs) > 0:
      for item in pubs:
        if item['cited_by']['value']:
          citation_number  = item['cited_by']['value']
        else:
          citation_number  = item['cited_by']['value']
        
        GoogleScholarPublication.objects.create(
          user_id         = user.id,
          title           = item['title'],
          link            = item['link'],
          citation_id     = item['citation_id'],
          authors         = item['authors'],
          publication     = item['publication'],
          year            = item['year'],
          citation_number = citation_number,
          cited_by        = item['cited_by']
        )
    return
  
class GScholarPublicationList(ListAPIView):
  model = GoogleScholarPublication
  serializer_class = GScholarPublicationSerializer
  queryset = GoogleScholarPublication.objects.all()
  permission_classes = [permissions.IsAuthenticatedOrReadOnly]

  def get_queryset(self):
    user = self.request.user
    return self.queryset.filter(user_id = user.id)
  

class MonographPublicationViewSet(viewsets.ModelViewSet):
  queryset          = MonographPublication.objects.all()
  serializer_class  = MonographPublicationSerializer

  def get_queryset(self):
    if self.request.method == 'GET':
      user = self.request.user
      return self.queryset.filter(user_id = user.id)
    else:
      return self.queryset.filter(id=self.kwargs['pk'])

  def perform_create(self, serializer):
    serializer.save(user=self.request.user)


class StudentResearchPubViewSet(viewsets.ModelViewSet):
  queryset          = StudentResearchPublication.objects.all()
  serializer_class  = StudentResearchPubSerializer

  def get_queryset(self):
    if self.request.method == 'GET':
      user = self.request.user
      return self.queryset.filter(user_id = user.id)
    else:
      return self.queryset.filter(id=self.kwargs['pk'])

  def perform_create(self, serializer):
    serializer.save(user=self.request.user)
