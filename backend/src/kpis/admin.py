from django.contrib import admin
from .models import *

class IndicatorRegAdmin(admin.ModelAdmin):
  list_display = ['title', 'front_link', 'active']

admin.site.register(IndicatorRegister, IndicatorRegAdmin)
