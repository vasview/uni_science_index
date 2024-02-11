from django.urls import path 
from rest_framework.routers import DefaultRouter
from activities.views import *

router = DefaultRouter()

router.register(r'copyright_certificates', CopyrightCertificateViewSet)
router.register(r'invention_applications', InventionApplicationViewSet)
router.register(r'invention_patents', InventionPatentViewSet)
router.register(r'conferences', ConferenceViewSet)
router.register(r'guest_lectures', StaffMobilityViewSet)
router.register(r'thesis_defences', ThesisDefenceViewSet)
router.register(r'doctoral_supervisions', DoctoralResearchSupervisionViewSet)
router.register(r'student_supervisions', StudentResearchSupervisionViewSet)
router.register(r'research_projects', ResearchProjectViewSet)
  
urlpatterns = router.urls

urlpatterns += [ 
    path('student_research_list/', StudentResearchSupervisionList.as_view({'get': 'list'}))
] 
