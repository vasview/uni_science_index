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
    