from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import ensure_csrf_cookie
from allauth.headless.contrib.rest_framework.authentication import (
    XSessionTokenAuthentication,
)
from rest_framework import permissions
from rest_framework.views import APIView

@ensure_csrf_cookie
def get_csrf_token(request):
    return JsonResponse({'detail': 'CSRF cookie set'})

class YourOwnAPIView(APIView):

    authentication_classes = [
        XSessionTokenAuthentication,
    ]
    permission_classes = [permissions.IsAuthenticated]