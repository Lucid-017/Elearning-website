from django.contrib.auth.models import AbstractUser
from django.db import models
from phonenumber_field.modelfields import PhoneNumberField
from django_countries.fields import CountryField

ACCOUNT_TYPE = (
    ('Student', 'Student'),
    ('Tutor', 'Tutor')
)

GENDER = (
    ('Male', 'Male'),
    ('Female', 'Female')
)

# Create your models here.
class User(AbstractUser):
    account_type = models.CharField(max_length=20, choices=ACCOUNT_TYPE, default="Student")
    email = models.EmailField(unique=True)
    phone_number = PhoneNumberField(blank=True, null=True, unique=True)
    date_of_birth = models.DateField(blank=True, null=True)
    gender = models.CharField(max_length=8, choices=GENDER, default='Male')
    address = models.TextField(blank=True, null=True)
    country = CountryField(blank=True, null=True)


    def __str__(self):
        return self.username