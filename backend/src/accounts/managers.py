from django.contrib.auth.base_user import BaseUserManager
from django.utils.translation import gettext_lazy as _


class  UserManager(BaseUserManager):
    """
    Custom user manager. Here email is the unique.
    and email is used for authentication instead of username
    """

    def create_user(self, email, password, **other_fields):
        """
        Create and save user  with the given email and password
        """
        if not email:
            raise ValueError(_("The Email must be provided"))
        if not password:
            raise ValueError(_('User must have password'))
        email = self.normalize_email(email)
        user = self.model(email=email, **other_fields)
        user.set_password(password)
        user.save()
        return user
    
    def create_staffuser(self, email, password, **other_fields):
        """
        Create a staff user not a superuser.
        """
        other_fields.setdefault('is_staff', True)
        other_fields.setdefault('is_active', True)

        return self.create_user(email, password, **other_fields)
    
    def create_superuser(self, email, password=None, **other_fields):
        """
        Create and save a SuperUser with the given email and password
        """
        other_fields.setdefault('is_staff', True)
        other_fields.setdefault('is_superuser', True)
        other_fields.setdefault('is_active', True)

        if other_fields.get('is_staff') is not True:
            raise ValueError (_('Superuser must be assigned is_staff=True.'))
        
        if other_fields.get('is_superuser') is not True:
            raise ValueError (_('Superuser must be assigned is_superuser=True.'))

        return self.create_user(email, password, **other_fields)
    