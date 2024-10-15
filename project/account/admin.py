from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User

class UserAdmin(UserAdmin):
    # Fields to be used in displaying the User model
    list_display = ('username', 'email', 'phone_number', 'country', 'account_type', 'is_staff',)
    
    # Fields to filter the User model in the admin interface
    list_filter = ('is_staff', 'is_active', 'country')
    
    # Fieldsets define the layout for the admin interface when adding or editing a user
    fieldsets = (
        (None, {'fields': ('username', 'email', 'password')}),
        ('Personal info', {'fields': ('account_type', 'first_name', 'last_name', 'phone_number', 'country', 'address', 'date_of_birth')}),
        ('Permissions', {'fields': ('is_staff', 'is_active', 'is_superuser', 'groups', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    )
    
    # Fields used when creating a user in the admin panel
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('account_type', 'username', 'first_name', 'last_name', 'email', 'phone_number', 'country', 'password1', 'password2', 'is_active', 'is_staff'),
        }),
    )

    
    search_fields = ('username', 'email', 'phone_number', 'country')
    ordering = ('username',)

# Registering the User model with the custom admin
admin.site.register(User, UserAdmin)


