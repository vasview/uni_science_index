from django.contrib import admin
from .models import AcademicDegree, AcademicTitle, ResearchDataBase

admin.site.register(AcademicDegree)
admin.site.register(AcademicTitle)
admin.site.register(ResearchDataBase)
