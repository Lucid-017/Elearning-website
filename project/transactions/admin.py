from django.contrib import admin
from .models import Payment, Subscription

# Register your models here.
class PaymentAdmin(admin.ModelAdmin):
    list_display = ['user', 'amount', 'reference_number', 'status', 'date']
    search_fields = ['user__username', 'reference_number']
    list_filter = ['status', 'date']

class SubscriptionAdmin(admin.ModelAdmin):
    list_display = ['user', 'plan', 'active', 'start_date', 'end_date']
    search_fields = ['user__username']
    list_filter = ['plan', 'active', 'start_date', 'end_date']

admin.site.register(Payment, PaymentAdmin)
admin.site.register(Subscription, SubscriptionAdmin)