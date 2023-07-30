from django.db import models

class AcademicDegree(models.Model):
    code = models.CharField(max_length=50, blank=True, null=True)
    name = models.CharField(max_length=200, null=False)

    class Meta:
        verbose_name = 'Ученая степень'
        verbose_name_plural = 'Справочник ученых степеней'
        ordering = ['name']

    def __str__(self):
        return self.name

class AcademicTitle(models.Model):
    code = models.CharField(max_length=50, blank=True, null=True)
    name = models.CharField(max_length=200, null=False)

    class Meta:
        verbose_name = 'Звание преподавателя'
        verbose_name_plural = 'Справочник званий преподавателей'
        ordering = ['name']

    def __str__(self):
        return self.name
    
class ResearchDataBase(models.Model):
    name            = models.CharField(max_length=200, null=False)
    url             = models.CharField(max_length=255, null=False)
    request_param   = models.CharField(max_length=200, null=True, blank=True)
    description     = models.CharField(max_length=200, null=True, blank=True)
    sort            = models.SmallIntegerField()
    active          = models.BooleanField(default=True)

    class Meta:
        verbose_name = 'Справочник наукоемких баз данных'
        verbose_name_plural = 'Справочник наукоемких баз данных'
        ordering = ['name']

    def __str__(self):
        return self.name
    
class FundSource(models.Model):
    code = models.CharField(max_length=100, null=True, blank=True)
    name = models.CharField(max_length=255, null=False)

    class Meta:
        verbose_name = 'Справочник фондов'
        verbose_name_plural = 'Справочник фондов'
        ordering = ['name']

    def __str__(self):
        return self.name
    
class JobPosition(models.Model):
    code = models.CharField(max_length=100, null=True, blank=True)
    name = models.CharField(max_length=255, null=False)

    class Meta:
        verbose_name = 'Справочник должности'
        verbose_name_plural = 'Список должностей'
        ordering = ['name']

    def __str__(self):
        return self.name    
    
class AcademicYear(models.Model):
    name                    = models.CharField(max_length=255, blank=True, null=True)
    first_semester_start    = models.DateField()
    first_semester_end      = models.DateField()
    second_semester_start   = models.DateField()
    second_semester_end     = models.DateField()
    active                  = models.BooleanField(default=True)

    class Meta:
        verbose_name = 'Учебный год'
        verbose_name_plural = 'Справочник учебных годов'
        ordering = ['id']

    def __str__(self):
        return self.name    
    