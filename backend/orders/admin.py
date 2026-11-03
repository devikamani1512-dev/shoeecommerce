from django.contrib import admin
from django.utils import timezone
from .models import Order


@admin.action(description="Mark selected orders as Paid")
def mark_paid(modeladmin, request, queryset):
    queryset.update(payment_status="Paid", paid_at=timezone.now())


@admin.action(description="Mark selected orders as Failed")
def mark_failed(modeladmin, request, queryset):
    queryset.update(payment_status="Failed")


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "customer_name",
        "email",
        "total_amount",
        "payment_method",
        "payment_status",
        "status",
        "created_at",
    )
    list_editable = ("payment_status", "status")
    list_filter = ("payment_status", "payment_method", "status", "created_at")
    search_fields = ("customer_name", "email", "transaction_id")
    readonly_fields = ("created_at",)
    actions = [mark_paid, mark_failed]

    fieldsets = (
        ("Customer", {
            "fields": ("customer", "customer_name", "email", "phone", "address"),
        }),
        ("Order", {
            "fields": ("items", "total_amount", "status", "created_at"),
        }),
        ("Payment", {
            "fields": ("payment_method", "payment_status", "transaction_id", "paid_at"),
        }),
    )