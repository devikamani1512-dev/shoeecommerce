from django.urls import path
from .views import (
    HomePageListCreate,
    HomePageDetail,
    HomeCategoryListCreate,
    HomeCategoryDetail,
)

urlpatterns = [
    path("", HomePageListCreate.as_view(), name="home-list"),
    path("<int:pk>/", HomePageDetail.as_view(), name="home-detail"),
    path("categories/", HomeCategoryListCreate.as_view(), name="home-categories"),
    path("categories/<int:pk>/", HomeCategoryDetail.as_view(), name="home-category-detail"),
]