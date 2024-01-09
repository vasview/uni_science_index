from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()

router.register(r'academic_degree', AcademicDegreeViewSet)
router.register(r'academic_title', AcademicTitleViewSet)
router.register(r'fund_sources', FundSourceProfileViewSet)
router.register(r'research_databases',ResearchDataBaseViewSet)
router.register(r'countries', CountryViewSet)
router.register(r'cities', CityViewSet)

urlpatterns = router.urls
