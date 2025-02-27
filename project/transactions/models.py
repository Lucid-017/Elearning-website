from django.db import models
from django.utils.text import slugify
from account.models import User
from django.utils import timezone

# Create your models here.
PAYMENT_STATUS = (
    ('Pending', 'Pending'),
    ('Successful', 'Successful'),
    ('Failed', 'Failed')
)


class Payment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    amount = models.DecimalField(decimal_places=2, max_digits=10)
    reference_number = models.CharField(max_length=100, unique=True)
    status = models.CharField(max_length=20, choices=PAYMENT_STATUS, default='Pending')
    date = models.DateTimeField(auto_now_add=True)


    def __str__(self):
        return f"{self.user} - {self.reference_number} - {self.status}"


class SubscriptionPlan(models.Model):
    name = models.CharField(max_length=50)
    duration_months = models.IntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    slug = models.SlugField(unique=True)

    def __str__(self):
        return self.name
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.slug)
        super(SubscriptionPlan, self).save(*args, **kwargs)


class Subscription(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='subscription')
    plan = models.ForeignKey(SubscriptionPlan, on_delete=models.SET_NULL, null=True)
    active = models.BooleanField(default=False)
    start_date = models.DateTimeField(null=True, blank=True)
    end_date = models.DateTimeField(null=True, blank=True)


    @property
    def is_active(self):
       #Check if the subscription is still valid
       if self.end_date:
           return self.end_date >= timezone.now()
       return False

    def __str__(self):
        return f"{self.user.username} - {self.plan} (Active: {self.is_active})"

