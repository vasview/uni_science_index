from django.urls import path 
from rest_framework.routers import DefaultRouter
from publications.views import *

router = DefaultRouter()


  
urlpatterns = [ 
    path('by_author_account/<int:sci_profile_id>', 
         AuthorPublications.as_view(), 
         name = 'author_publications'), 
    path('gscholar_pubs/', GScholarPublicationList.as_view())
] 

