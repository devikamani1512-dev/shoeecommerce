from django.urls import path
from .views import (
    AboutPageListCreate,
    AboutPageDetail,
    AboutValueListCreate,
    AboutValueDetail,
)

urlpatterns = [
    path("", AboutPageListCreate.as_view(), name="about-list"),
    path("<int:pk>/", AboutPageDetail.as_view(), name="about-detail"),
    path("values/", AboutValueListCreate.as_view(), name="about-values"),
    path("values/<int:pk>/", AboutValueDetail.as_view(), name="about-value-detail"),
]