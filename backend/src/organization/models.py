from email.policy import default
from django.db import models

class UnitType(models.Model):
    name = models.CharField(max_length=255, null=False)

    class Meta:
        verbose_name = 'Тип организационной структуры'
        verbose_name_plural = 'Типы организационной структуры'
        ordering = ['name']

    def __str__(self):
        return self.name

class UniversityUnit(models.Model):
    unit_type   = models.ForeignKey(UnitType, on_delete=models.SET_NULL, null=True, blank=True)
    code        = models.CharField(max_length=50, blank=True, null=True)
    name        = models.CharField(max_length=255, null=False)

    class Meta:
        verbose_name = 'Институт (организационная структура)'
        verbose_name_plural = 'Список институтов (организационных структур)'
        ordering = ['name']

    def __str__(self):
        return self.name

class Department(models.Model):
    university_unit = models.ForeignKey(UniversityUnit, on_delete=models.CASCADE)
    code            = models.CharField(max_length=50, blank=True, null=True)
    name            = models.CharField(max_length=200, null=False)
    active          = models.BooleanField(default=True)

    class Meta:
        verbose_name = 'Кафедра'
        verbose_name_plural = 'Список кафедр'
        ordering = ['name']

    def __str__(self):
        return self.name
