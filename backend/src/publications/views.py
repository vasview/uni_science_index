from rest_framework import viewsets, mixins
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
        # google_pub = GoogleScholarPublication()
        # google_pub.user             = user
        # google_pub.title            = item['title']
        # google_pub.link             = item['link']
        # google_pub.citation_id      = item['citation_id']
        # google_pub.authors          = item['authors']
        # google_pub.publication      = item['publication']
        # google_pub.year             = item['year']

        if item['cited_by']['value']:
          citation_number  = item['cited_by']['value']
        else:
          citation_number  = item['cited_by']['value']

        # google_pub.cited_by           = item['cited_by']

        # google_pub.save()
        
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
  

# def author_publications(request, *args,**kwargs):
#   sci_account = get_object_or_404(ScientificProfile, id=kwargs['pk'])
  
#   scholar_RDB = ResearchDataBase.objects.filter(name='Google Scholar')
  
#   if request.method == 'GET':
#     if scholar_RDB[0].name == sci_account.research_db.name:
#       account = sci_account.account
#       process_gscholar_response(request, account)
#       # return JsonResponse(result)
#       return JsonResponse({'status': status.HTTP_200_OK})
#   else:
#     return JsonResponse({'status': status.HTTP_405_METHOD_NOT_ALLOWED})
  
#   if request.method == 'POST':
#     return JsonResponse({'status': status.HTTP_201_CREATED})
  
  

