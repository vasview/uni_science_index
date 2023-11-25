from django.urls import path, include
from rest_framework.routers import DefaultRouter
from accounts.views import *

router = DefaultRouter()

router.register(r'users', UserViewSet)
router.register(r'profiles', ProfileViewSet)
router.register(r'scientific_profile',ScientificProfileViewSet)

urlpatterns = router.urls

# urlpatterns = [
#     path('users/', UserAPIView.as_view(), name='all_users'),
#     path('profiles/', ProfileAPIView.as_view(), name='all_profiles'),
# ]