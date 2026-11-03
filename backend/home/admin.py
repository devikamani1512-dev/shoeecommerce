from django.contrib import admin
from .models import HomePage, HomeCategory


@admin.register(HomePage)
class HomePageAdmin(admin.ModelAdmin):
    list_display = ("overview_title", "trending_title")

    def has_add_permission(self, request):
        # Oru entry mattum irukkanum
        if HomePage.objects.exists():
            return False
        return super().has_add_permission(request)


@admin.register(HomeCategory)
class HomeCategoryAdmin(admin.ModelAdmin):
    list_display = ("name", "link", "order")
    list_editable = ("order",)