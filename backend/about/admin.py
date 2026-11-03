from django.contrib import admin
from .models import AboutPage, AboutValue


@admin.register(AboutPage)
class AboutPageAdmin(admin.ModelAdmin):
    list_display = ("intro_title", "mission_title")

    def has_add_permission(self, request):
        # Oru entry mattum irukkanum
        if AboutPage.objects.exists():
            return False
        return super().has_add_permission(request)


@admin.register(AboutValue)
class AboutValueAdmin(admin.ModelAdmin):
    list_display = ("title", "order")
    list_editable = ("order",)