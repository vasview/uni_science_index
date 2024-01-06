from django.urls import path 
from rest_framework.routers import DefaultRouter
from activities.views import *

router = DefaultRouter()

router.register(r'copyright_certificates', CopyrightCertificateViewSet)
router.register(r'invention_applications', InventionApplicationViewSet)
  
urlpatterns = router.urls
