import json

from django.http import JsonResponse
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate

from rest_framework.decorators import api_view
from rest_framework_simplejwt.tokens import RefreshToken
from drf_spectacular.utils import extend_schema


@extend_schema(
    request={
        "application/json": {
            "type": "object",
            "properties": {
                "username": {"type": "string"},
                "email": {"type": "string"},
                "password": {"type": "string"},
            },
            "required": ["username", "email", "password"],
        }
    },
    responses={201: dict},
)
@api_view(["POST"])
@csrf_exempt
def register_user(request):
    try:
        data = request.data
        username = data.get("username", "").strip()
        email = data.get("email", "").strip()
        password = data.get("password", "")

        if not username or not email or not password:
            return JsonResponse(
                {"error": "Username, email and password are required"},
                status=400,
            )

        if User.objects.filter(username=username).exists():
            return JsonResponse(
                {"error": "Username already exists"},
                status=400,
            )

        user = User.objects.create_user(
            username=username,
            email=email,
            password=password,
        )

        return JsonResponse(
            {"message": "Registration successful", "user_id": user.id},
            status=201,
        )

    except json.JSONDecodeError:
        return JsonResponse({"error": "Invalid JSON"}, status=400)


@extend_schema(
    request={
        "application/json": {
            "type": "object",
            "properties": {
                "email": {"type": "string"},
                "password": {"type": "string"},
            },
            "required": ["email", "password"],
        }
    },
    responses={200: dict},
)
@api_view(["POST"])
@csrf_exempt
def login_user(request):
    try:
        data = request.data
        email = data.get("email", "").strip()
        password = data.get("password", "")

        account = User.objects.filter(email__iexact=email).first()

        if account is None:
            return JsonResponse(
                {"error": "Invalid email or password"},
                status=401,
            )

        user = authenticate(
            request,
            username=account.username,
            password=password,
        )

        if user is None:
            return JsonResponse(
                {"error": "Invalid email or password"},
                status=401,
            )

        refresh = RefreshToken.for_user(user)

        return JsonResponse({
            "message": "Login successful",
            "user": {
                "id": user.id,
                "username": user.username,
                "email": user.email,
            },
            "access": str(refresh.access_token),
            "refresh": str(refresh),
        })

    except json.JSONDecodeError:
        return JsonResponse({"error": "Invalid JSON"}, status=400)