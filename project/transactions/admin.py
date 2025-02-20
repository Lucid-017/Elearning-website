from django.contrib import admin
from .models import Payment, Subscription, SubscriptionPlan

# Register your models here.
class PaymentAdmin(admin.ModelAdmin):
    list_display = ['user', 'amount', 'reference_number', 'status', 'date']
    search_fields = ['user__username', 'reference_number']
    list_filter = ['status', 'date']

class SubscriptionAdmin(admin.ModelAdmin):
    list_display = ['user', 'plan', 'active', 'start_date', 'end_date']
    search_fields = ['user__username']
    list_filter = ['plan', 'active', 'start_date', 'end_date']

class SubscriptionPlanAdmin(admin.ModelAdmin):
    list_display = ['name', 'duration_months', 'price']

admin.site.register(Payment, PaymentAdmin)
admin.site.register(Subscription, SubscriptionAdmin)
admin.site.register(SubscriptionPlan, SubscriptionPlanAdmin)