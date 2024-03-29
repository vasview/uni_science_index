from django.urls import path 
from rest_framework.routers import DefaultRouter
from publications.views import *

router = DefaultRouter()

router.register(r'monographs', MonographPublicationViewSet)
router.register(r'student_research_works', StudentResearchPubViewSet)

urlpatterns = router.urls
  
urlpatterns += [ 
    path('by_author_account/<int:sci_profile_id>', 
         AuthorPublications.as_view(), 
         name = 'author_publications'), 
    path('gscholar_pubs/', GScholarPublicationList.as_view())
] 
