from django.db import models
from account.models import User
from datetime import timedelta, date

# Create your models here.
PAYMENT_STATUS = (
    ('Pending', 'Pending'),
    ('Successful', 'Successful'),
    ('Failed', 'Failed')
)


class Payment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    amount = models.DecimalField(decimal_places=2, max_digits=2)
    reference_number = models.CharField(max_length=100, unique=True)
    status = models.CharField(max_length=20, choices=PAYMENT_STATUS, default='Pending')
    date = models.DateTimeField(auto_now_add=True)


    def __str__(self):
        return f"{self.user} - {self.reference} - {self.status}"


class SubscriptionPlan(models.Model):
    name = models.CharField(max_length=50)
    duration_months = models.IntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.name

class Subscription(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='subscription')
    plan = models.ForeignKey(SubscriptionPlan, on_delete=models.SET_NULL, null=True)
    active = models.BooleanField(default=False)
    start_date = models.DateField(auto_now_add=True)
    end_date = models.DateField()

    def save(self, *args, **kwargs):
       #Automatically set the expiration date based on the plan
        if not self.end_date:
            if self.plan == 'monthly':
                self.end_date = self.start_date + timedelta(days=30)
            elif self.plan == 'six_months':
                self.end_date = self.start_date + timedelta(days=180)
            elif self.plan == 'yearly':
                self.end_date = self.start_date + timedelta(days=365)
        super().save(*args, **kwargs)

    @property
    def is_active(self):
       #Check if the subscription is still valid
        return self.end_date >= date.today()

    def __str__(self):
        return f"{self.user.username} - {self.plan} (Active: {self.is_active})"

