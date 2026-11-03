from rest_framework import generics
from rest_framework.permissions import IsAdminUser, SAFE_METHODS, BasePermission
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser

from .models import AboutPage, AboutValue
from .serializers import AboutPageSerializer, AboutValueSerializer


class IsAdminOrReadOnly(BasePermission):
    """GET ellarukkum open. POST/PUT/DELETE admin user mattum."""

    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True
        return bool(request.user and request.user.is_staff)


class AboutPageListCreate(generics.ListCreateAPIView):
    queryset = AboutPage.objects.all()
    serializer_class = AboutPageSerializer
    permission_classes = [IsAdminOrReadOnly]
    parser_classes = [MultiPartParser, FormParser, JSONParser]


class AboutPageDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = AboutPage.objects.all()
    serializer_class = AboutPageSerializer
    permission_classes = [IsAdminOrReadOnly]
    parser_classes = [MultiPartParser, FormParser, JSONParser]


class AboutValueListCreate(generics.ListCreateAPIView):
    queryset = AboutValue.objects.all()
    serializer_class = AboutValueSerializer
    permission_classes = [IsAdminOrReadOnly]


class AboutValueDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = AboutValue.objects.all()
    serializer_class = AboutValueSerializer
    permission_classes = [IsAdminOrReadOnly]