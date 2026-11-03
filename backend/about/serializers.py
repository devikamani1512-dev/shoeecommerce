from rest_framework import serializers
from .models import AboutPage, AboutValue


class AboutValueSerializer(serializers.ModelSerializer):
    class Meta:
        model = AboutValue
        fields = ["id", "title", "text", "order"]


class AboutPageSerializer(serializers.ModelSerializer):
    class Meta:
        model = AboutPage
        fields = [
            "id",
            "intro_title",
            "intro_text",
            "mission_title",
            "mission_text",
            "main_image",
            "shoes_image",
        ]