from rest_framework import viewsets, mixins
from rest_framework import permissions
from .models import *
from .serializers import *

class AcademicDegreeViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = AcademicDegree.objects.all()
    serializer_class = AcademicDegreeSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class AcademicTitleViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = AcademicTitle.objects.all()
    serializer_class = AcademicTitleSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class ResearchDataBaseViewSet(viewsets.ModelViewSet):
    queryset = ResearchDataBase.objects.all()
    serializer_class = ResearchDataBaseSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class FundSourceProfileViewSet(viewsets.ModelViewSet):
    queryset = FundSource.objects.all()
    serializer_class = FundSourceSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
