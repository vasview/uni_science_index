from django.db import models

from accounts.models import User
from activities.models import StudentResearchSupervision

class GoogleScholarPublication(models.Model):
    user             = models.ForeignKey(User, on_delete=models.CASCADE)
    title            = models.CharField(max_length=255, null=False)
    link             = models.CharField(max_length=255, null=True, blank=True)
    citation_id      = models.CharField(max_length=100, null=True, blank=True)
    authors          = models.CharField(max_length=255, null=True, blank=True)
    publication      = models.CharField(max_length=255, null=True, blank=True)
    year             = models.CharField(max_length=10, null=True, blank=True)
    citation_number  = models.SmallIntegerField(blank=True, null=True)
    cited_by         = models.JSONField(blank=True, null=True)
    is_local         = models.BooleanField(default=True)
    created_at       = models.DateTimeField(auto_now_add=True)
    updated_at       = models.DateField(auto_now=True)

    class Meta:
        verbose_name = 'Статьи Google Scholar'
        verbose_name_plural = 'Публикации на сайте Google Scholar'
        ordering = ['year', 'title']

    def __str__(self):
        return self.title
    
class StudentResearchPublication(models.Model):
    user                = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    student_research    = models.ForeignKey(StudentResearchSupervision, on_delete=models.CASCADE)
    name                = models.CharField(max_length=255, null=False)
    place               = models.CharField(max_length=255, null=True, blank=True)
    publication_date    = models.DateField(blank=False)
    is_local            = models.BooleanField(default=True)

    class Meta:
        verbose_name = 'Публикация по итогам НИРС'
        verbose_name_plural = 'Публикации по итогам НИРС'
        ordering = ['publication_date', 'name']

    def __str__(self):
        return self.name
    
class MonographPublication(models.Model):
    user                = models.ForeignKey(User, on_delete=models.CASCADE)
    name                = models.CharField(max_length=255, null=False)
    place               = models.CharField(max_length=255, null=True, blank=True)
    publication_date    = models.DateField(blank=False)
    is_local            = models.BooleanField(default=True)

    class Meta:
        verbose_name = 'Публикация монографии'
        verbose_name_plural = 'Публикации монографий'
        ordering = ['name', 'publication_date']

    def __str__(self):
        return self.name
