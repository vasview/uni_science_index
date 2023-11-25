from rest_framework import viewsets, mixins
from rest_framework import permissions
from .models import *
from .serializers import *

class UnitTypeViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = UnitType.objects.all()
    serializer_class = UnitTypeSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class UniversityUnitViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = UniversityUnit.objects.all()
    serializer_class = UniversityUnitSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class DepartmentViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
