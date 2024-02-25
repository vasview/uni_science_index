from django.contrib import admin
from .models import *

class ResearchDataBaseAdmin(admin.ModelAdmin):
  list_display = ['name', 'url', 'request_param', 'sort', 'active']

admin.site.register(AcademicDegree)
admin.site.register(AcademicTitle)
admin.site.register(ResearchDataBase, ResearchDataBaseAdmin)
admin.site.register(JobPosition)
admin.site.register(AcademicYear)
admin.site.register(FundSource)
