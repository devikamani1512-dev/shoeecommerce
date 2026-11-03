from rest_framework import serializers
from .models import HomePage, HomeCategory


class HomeCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = HomeCategory
        fields = ["id", "name", "link", "image", "order"]


class HomePageSerializer(serializers.ModelSerializer):
    class Meta:
        model = HomePage
        fields = [
            "id",
            "overview_title",
            "overview_text",
            "categories_title",
            "trending_title",
            "offer_text_1",
            "offer_text_2",
        ]