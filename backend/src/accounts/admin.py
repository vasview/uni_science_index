from django.contrib import admin
from .models import User, Profile, ScientificProfile
from django.contrib.auth.admin import UserAdmin

class UserAdminConfig(UserAdmin):
    search_fields = ('email', 'user_name',)
    list_filter = ('email', 'user_name', 'is_active', 'is_staff','is_superuser',)
    ordering = ('-created_at',)
    list_display = ('email', 'user_name', 'is_active', 'is_staff', 'is_superuser')

    fieldsets = (
        (None, {'fields': ('email', 'user_name', )}),
        ('Permissions', {'fields': ('is_staff', 'is_active', 'is_superuser',)})
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'user_name','password1', 'password2', 'is_active', 'is_staff')
        }),
    )

admin.site.register(User, UserAdminConfig)

admin.site.register(ScientificProfile)
admin.site.register(Profile)
