from django.urls import path, include
from rest_framework.routers import DefaultRouter
from accounts.views import *

router = DefaultRouter()

router.register(r'users', UserViewSet)
router.register(r'user/profile', ProfileViewSet)
router.register(r'user/scientific_profiles', ScientificProfileViewSet)

urlpatterns = router.urls
