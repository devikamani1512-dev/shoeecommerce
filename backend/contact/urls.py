from django.urls import path
from .views import csrf_token, contact_view

urlpatterns = [
    path("csrf/", csrf_token, name="csrf_token"),
    path("", contact_view, name="contact"),
]