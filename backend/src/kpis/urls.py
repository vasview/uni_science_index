from django.urls import path 
from rest_framework.routers import DefaultRouter
from .views import *

# router = DefaultRouter()
# urlpatterns = router.urls

urlpatterns = [
    path('my_dashboards/', UserDashboards.as_view()),
]