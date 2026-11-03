from rest_framework import generics
from rest_framework.permissions import SAFE_METHODS, BasePermission
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser

from .models import HomePage, HomeCategory
from .serializers import HomePageSerializer, HomeCategorySerializer


class IsAdminOrReadOnly(BasePermission):
    """GET ellarukkum open. POST/PUT/DELETE admin user mattum."""

    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True
        return bool(request.user and request.user.is_staff)


class HomePageListCreate(generics.ListCreateAPIView):
    queryset = HomePage.objects.all()
    serializer_class = HomePageSerializer
    permission_classes = [IsAdminOrReadOnly]


class HomePageDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = HomePage.objects.all()
    serializer_class = HomePageSerializer
    permission_classes = [IsAdminOrReadOnly]


class HomeCategoryListCreate(generics.ListCreateAPIView):
    queryset = HomeCategory.objects.all()
    serializer_class = HomeCategorySerializer
    permission_classes = [IsAdminOrReadOnly]
    parser_classes = [MultiPartParser, FormParser, JSONParser]


class HomeCategoryDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = HomeCategory.objects.all()
    serializer_class = HomeCategorySerializer
    permission_classes = [IsAdminOrReadOnly]
    parser_classes = [MultiPartParser, FormParser, JSONParser]