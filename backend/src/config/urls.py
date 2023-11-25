from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)

admin.site.site_header = 'Научная деятельность университета'

api_urlpatterns = [
    path('accounts/', include('accounts.urls')),
    # path('activities/', include('activities.urls')),
    path('organization/', include('organization.urls')),
    path('registers/', include('registers.urls')),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    # path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    # path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    # path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),
]

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/', include(api_urlpatterns)),
    # re_path(r'^auth', include('djoser.urls.jwt')),
]
