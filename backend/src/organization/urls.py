from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()

router.register(r'unit_types', UnitTypeViewSet)
router.register(r'university_units', UniversityUnitViewSet)
router.register(r'departments', DepartmentViewSet)

urlpatterns = router.urls
