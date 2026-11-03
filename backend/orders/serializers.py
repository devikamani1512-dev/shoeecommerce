from rest_framework import serializers
from .models import Order


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = [
            "id",
            "customer",
            "customer_name",
            "email",
            "phone",
            "address",
            "items",
            "total_amount",
            "status",
            "payment_method",
            "payment_status",
            "transaction_id",
            "created_at",
        ]
        read_only_fields = [
            "id",
            "customer",
            "status",
            "payment_status",
            "transaction_id",
            "created_at",
        ]