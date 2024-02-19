from rest_framework import viewsets, mixins
from rest_framework import permissions
from .models import *
from .serializers import *

class AcademicDegreeViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = AcademicDegree.objects.all()
    serializer_class = AcademicDegreeRestrictedSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class AcademicTitleViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = AcademicTitle.objects.all()
    serializer_class = AcademicTitleSRestrictederializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class ResearchDataBaseViewSet(viewsets.ModelViewSet):
    queryset = ResearchDataBase.objects.filter(active=True)
    serializer_class = ResearchDataBaseSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class FundSourceProfileViewSet(viewsets.ModelViewSet):
    queryset = FundSource.objects.all()
    serializer_class = FundSourceSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class CountryViewSet(viewsets.ModelViewSet):
    queryset = Country.objects.all()
    serializer_class = CountrySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class CityViewSet(viewsets.ModelViewSet):
    queryset = City.objects.all()
    serializer_class = CitySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
