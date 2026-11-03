import json
from django.http import JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.decorators.http import require_POST
from .models import ContactMessage


@ensure_csrf_cookie
def csrf_token(request):
    return JsonResponse({"detail": "CSRF cookie set"})


@require_POST
def contact_view(request):
    try:
        data = json.loads(request.body)
    except json.JSONDecodeError:
        return JsonResponse({"error": "Invalid JSON"}, status=400)

    name = data.get("name", "").strip()
    email = data.get("email", "").strip()
    phone = data.get("phone", "").strip()
    message = data.get("message", "").strip()

    if not (name and email and phone and message):
        return JsonResponse({"error": "All fields are required"}, status=400)

    ContactMessage.objects.create(
        name=name, email=email, phone=phone, message=message
    )

    return JsonResponse({"success": True}, status=201)