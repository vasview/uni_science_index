from django.contrib import admin
from .models import *

class GoogleScholarPublicationAdmin(admin.ModelAdmin):
  list_display = ('user', 'title', 'year')

admin.site.register(MonographPublication)
admin.site.register(StudentResearchPublication)
admin.site.register(GoogleScholarPublication, GoogleScholarPublicationAdmin)
