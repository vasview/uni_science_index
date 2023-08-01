from django.db import models

from accounts.models import User
from registers.models import FundSource, City


class ProjectRole(models.IntegerChoices):
    EXECUTOR = 1, 'испольнитель' 
    MANAGER = 5, 'руководитель'

class ThesisDefenceStatus(models.IntegerChoices):
    NEW = 1, 'приступил'
    INPROGRESS = 2,  'в процессе'
    DONE = 3, 'готово'
    FINISHED = 4, 'защитил'

class ConferenceParticipationType(models.IntegerChoices):
    REPORT = 1, 'доклад'
    EXIBIT = 2, 'экспонат'

class MobilityActivityType(models.IntegerChoices):
    LECTURE = 1, 'гостевая лекция'
    EXTERN = 2, 'стажировка'

class ThesisDefence(models.Model):
    user                = models.ForeignKey(User, on_delete=models.CASCADE)
    title               = models.CharField(max_length=255, null=False)
    expected_end_date   = models.DateField(null=False)
    real_end_date       = models.DateField(blank=True, null=True)
    status              = models.IntegerField(choices=ThesisDefenceStatus.choices, 
                                              default=ThesisDefenceStatus.NEW)

    class Meta:
        verbose_name = 'Защита диссертации'
        verbose_name_plural = '1. Защита диссертаций'
        ordering = ['title', 'expected_end_date']

    def __str__(self):
        return self.title
    
class DoctoralResearchSupervision(models.Model):
    user                = models.ForeignKey(User, on_delete=models.CASCADE)
    topic               = models.CharField(max_length=255, null=False, blank=False)
    std_first_name      = models.CharField(max_length=50, null=False)
    std_middle_name     = models.CharField(max_length=50, null=True, blank=True)
    std_last_name       = models.CharField(max_length=100, null=False)
    std_fullname        = models.CharField(max_length=255, null=False)
    admition_date       = models.DateField(null=False)
    expected_end_year   = models.SmallIntegerField()
    expected_end_month  = models.SmallIntegerField()
    real_end_date       = models.DateField(blank=True, null=True)

    class Meta:
        verbose_name = 'Руководство докторантами и аспирантами'
        verbose_name_plural = '2. Руководство докторантами и аспирантами'
        ordering = ['topic', 'admition_date']

    def __str__(self):
        return self.topic
    
class StudentResearchSupervision(models.Model):
    user                = models.ForeignKey(User, on_delete=models.CASCADE)
    topic               = models.CharField(max_length=255, null=False, blank=False)
    std_first_name      = models.CharField(max_length=50, null=False)
    std_middle_name     = models.CharField(max_length=50, null=True, blank=True)
    std_last_name       = models.CharField(max_length=100, null=False)
    std_fullname        = models.CharField(max_length=255, null=False)
    group_number        = models.CharField(max_length=100, null=True, blank=True)
    year                = models.SmallIntegerField()

    class Meta:
        verbose_name = 'Руководство НИРС'
        verbose_name_plural = '3. Руководство НИРС'
        ordering = ['topic', 'year']

    def __str__(self):
        return self.topic

class StudentResearchPublication(models.Model):
    student_research    = models.ForeignKey(StudentResearchSupervision, on_delete=models.CASCADE)
    name                = models.CharField(max_length=255, null=False)
    place               = models.CharField(max_length=255, null=True, blank=True)
    publication_date    = models.DateField(blank=False)
    is_local            = models.BinaryField(default=True)

    class Meta:
        verbose_name = 'Публикация по итогам НИРС'
        verbose_name_plural = '4. Публикации по итогам НИРС'
        ordering = ['publication_date', 'name']

    def __str__(self):
        return self.name

class MonographPublication(models.Model):
    user                = models.ForeignKey(User, on_delete=models.CASCADE)
    name                = models.CharField(max_length=255, null=False)
    place               = models.CharField(max_length=255, null=True, blank=True)
    publication_date    = models.DateField(blank=False)
    is_local            = models.BinaryField(default=True)

    class Meta:
        verbose_name = 'Публикация монографии'
        verbose_name_plural = '5. Публикации монографий'
        ordering = ['name', 'publication_date']

    def __str__(self):
        return self.name
    
class CopyrightCertificate(models.Model):
    user                = models.ForeignKey(User, on_delete=models.CASCADE)
    registration_number = models.CharField(max_length=100, blank=False, null=False)
    title               = models.CharField(max_length=255, blank=False, null=False)
    application_date    = models.DateField(null=False)
    issued_date         = models.DateField(blank=True, null=True)
    issued_by           = models.CharField(max_length=255, null=True, blank=True)

    class Meta:
        verbose_name = 'Получение авторских свидетельств'
        verbose_name_plural = '6. Получение авторских свидетельств'
        ordering = ['title', 'application_date']

    def __str__(self):
        return self.title
    
class InventionApplication(models.Model):
    user                = models.ForeignKey(User, on_delete=models.CASCADE)
    description         = models.TextField(blank=True, null=True)
    application_date    = models.DateField(null=False)
    registration_number = models.CharField(max_length=100, blank=False, null=False)
    application_type    = models.CharField(max_length=100, blank=True, null=True)
    organization        = models.CharField(max_length=255, null=False)
    is_local            = models.BooleanField(default=True)

    class Meta:
        verbose_name = 'Заявка на изобретение'
        verbose_name_plural = '7. Заявки на изобретение'
        ordering = ['registration_number', 'application_date']

    def __str__(self):
        return self.registration_number

class InventionPatent(models.Model):
    invention_application = models.ForeignKey(InventionApplication, on_delete=models.CASCADE)
    number                = models.CharField(max_length=255, null=False, blank=False)
    issued_date           = models.DateField(null=False, blank=False)
    valid_to              = models.DateField(null=False, blank=False)    
    patent_type           = models.CharField(max_length=255, null=True, blank=True) 

    class Meta:
        verbose_name = 'Патент на изобретение'
        verbose_name_plural = '8 Патенты на изобретение'
        ordering = ['number', 'issued_date']

    def __str__(self):
        return self.number
    
class ResearchProject(models.Model):
    user                = models.ForeignKey(User, on_delete=models.CASCADE)
    name                = models.CharField(max_length=255, null=False)
    start_date          = models.DateField(blank=False)
    expected_end_date   = models.DateField(blank=False)
    real_end_date       = models.DateField(blank=True, null=True)
    role_in_project     = models.IntegerField(choices=ProjectRole.choices, 
                                              default=ProjectRole.EXECUTOR)
    fund_source         = models.ForeignKey(FundSource, on_delete=models.SET_NULL, null=True)
    fund_amount         = models.DecimalField(max_digits=18, decimal_places=2,
                                              blank=True, null=True)
    fund_duration       = models.SmallIntegerField(null=False) #duration in months
    implementation_results = models.TextField(blank=True, null=True)
    developed_results   = models.TextField(blank=True, null=True)

    class Meta:
        verbose_name = 'Научно-исследовательская работа'
        verbose_name_plural = '12. Научно-исследовательская работы'
        ordering = ['name', 'start_date']

    def __str__(self):
        return self.name     
    
class Conference(models.Model):
    user                = models.ForeignKey(User, on_delete=models.CASCADE)
    name                = models.CharField(max_length=255, null=False)
    host_name           = models.CharField(max_length=255, null=False)
    date                = models.DateField(null=False)
    participation_type  = models.IntegerField(choices=ConferenceParticipationType.choices,
                                              default=ConferenceParticipationType.REPORT)
    
    class Meta:
        verbose_name = 'Участие в семинарах и конференциях'
        verbose_name_plural = '13 Участие в семинарах и конференциях'
        ordering = ['name', 'date']

    def __str__(self):
        return self.name  

class StaffMobility(models.Model):
    user                = models.ForeignKey(User, on_delete=models.CASCADE)
    city                = models.ForeignKey(City, on_delete=models.SET_NULL, null=True)
    topic               = models.CharField(max_length=255, blank=False, null=False)
    host_name           = models.CharField(max_length=255, blank=False, null=False)
    start_date          = models.DateField(null=False, blank=False)
    end_date            = models.DateField(null=False, blank=False)
    activity_type       = models.IntegerField(choices=MobilityActivityType.choices,
                                              default=MobilityActivityType.LECTURE)
    
    class Meta:
        verbose_name = 'Мобильность - гостевые лекции и стажировки'
        verbose_name_plural = '14. Мобильность - гостевые лекции и стажировки'
        ordering = ['city', 'start_date', 'activity_type']

    def __str__(self):
        return self.topic  

class ResearchResultInfo(models.Model):
    user                    = models.ForeignKey(User, on_delete=models.CASCADE)
    year                    = models.SmallIntegerField(null=False)
    std_research_count      = models.SmallIntegerField(null=True, blank=True)
    std_research_pub_count  = models.SmallIntegerField(null=True, blank=True)
    conference_count        = models.SmallIntegerField(null=True, blank=True)
    mobility_count          = models.SmallIntegerField(null=True, blank=True)
    research_project_count  = models.SmallIntegerField(null=True, blank=True)
    doctoral_research_count = models.SmallIntegerField(null=True, blank=True)
    monograph_pub_count     = models.SmallIntegerField(null=True, blank=True)

    class Meta:
        verbose_name = 'Сводка по НИР'
        verbose_name_plural = '15. Сводка по НИР'
        ordering = ['user', 'year']

    def __str__(self):
        return self.user.get_full_name + ' ' + self.year
