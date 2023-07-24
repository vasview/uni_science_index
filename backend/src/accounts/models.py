from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from phonenumber_field.modelfields import PhoneNumberField

from .managers import UserManager
from registers.models import AcademicDegree, AcademicTitle, ResearchDataBase

class Gender(models.TextChoices):
    NONE = 'NA', 'Не задано'
    MALE = 'M', 'Мужчина'
    FEMALE = 'F', 'Женщина'

class User(AbstractBaseUser, PermissionsMixin):
    email           = models.EmailField(_("email_address"), max_length=255, unique=True)
    user_name       = models.CharField(_('user_name'),max_length=150, unique=True)
    is_active       = models.BooleanField(default=False)    # can login
    is_staff        = models.BooleanField(default=False)    # staff user not admin
    is_superuser    = models.BooleanField(default=False)    # superuser
    created_at      = models.DateTimeField(auto_now_add=True)

    USERNAME_FIELD  = 'email'
    REQUIRED_FIELDS = []

    objects = UserManager()

    class Meta:
        verbose_name = 'Пользователь'
        verbose_name_plural = 'Пользователи'
        ordering = ['email', 'user_name']

    def __str__(self):
        return self.email
    
    def get_full_name(self):
        return self.email
    
class Profile(models.Model):
    user        = models.OneToOneField(User, on_delete=models.CASCADE)
    first_name  = models.CharField(_('first_name'), max_length=100, blank=True, null=True)
    middle_name = models.CharField(_('middle_name'), max_length=55, blank=True, null=True)
    last_name   = models.CharField(_('last_name'), max_length=100, blank=True, null=True)
    full_name   = models.CharField(_('full_name'), max_length=255, blank=True, null=True)
    mobile      = PhoneNumberField(_('mobile'),blank=True, null=True)
    gender      = models.CharField(
        max_length=2,
        choices=Gender.choices,
        default=Gender.NONE,
    )
    academic_degree = models.ForeignKey(AcademicDegree, on_delete=models.SET_NULL, blank=True, null=True)
    academic_title  = models.ForeignKey(AcademicTitle, on_delete=models.SET_NULL, blank=True, null=True)
    created_at      = models.DateTimeField(auto_now_add=True)
    updated_ate     = models.DateField(auto_now=True)

    class Meta:
        verbose_name = 'Профиль пользователя'
        verbose_name_plural = 'Профили пользователя'
        ordering = ['last_name', 'first_name']

    def __str__(self):
        return self.full_name

class ScientificProfile(models.Model):
    user        = models.OneToOneField(User, on_delete=models.CASCADE)
    research_db = models.ForeignKey(ResearchDataBase, on_delete=models.SET_NULL, blank=True, null=True)
    account     = models.CharField(max_length=200, blank=True, null=True)

    class Meta:
        verbose_name = 'Профиль пользователя в индексируемых базах'
        verbose_name_plural = 'Профили пользователя в индексируемых базах'
        ordering = ['id']

    def __str__(self):
        return self.research_db.name
    