from django.db import models

class IndicatorRegister(models.Model):
  title       = models.CharField(max_length=150, blank=False, null=False)
  front_link  = models.CharField(max_length=100, blank=False, null=False)
  src_model   = models.CharField(max_length=50, blank=True, null=True)
  src_field   = models.CharField(max_length=50, blank=True, null=True)
  active      = models.BooleanField(default=True)

  class Meta:
    verbose_name = 'Справочник показателей KPI'
    verbose_name_plural = 'Справочник показателей KPI'
    ordering = ['id']

  def __str__(self):
    return self.title