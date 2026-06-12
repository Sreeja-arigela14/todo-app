from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .serializers import SignupSerializer,ProfileSerializer,ChangePasswordSerializer,LoginSerializer


class SignupView(APIView):

    def post(self, request):

        serializer = SignupSerializer(
            data=request.data
        )

        if serializer.is_valid():

            serializer.save()

            return Response(
                {
                    "message": "User Created"
                },
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )

class ProfileView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        total = request.user.todo_set.count()

        completed = request.user.todo_set.filter(
            completed=True
        ).count()

        pending = total - completed

        return Response({

            "username":
                request.user.username,

            "email":
                request.user.email,
            
            "profile_picture":
                request.user.profile_picture.url
                if request.user.profile_picture
                else None,

            "total_tasks":
                total,

            "completed_tasks":
                completed,

            "pending_tasks":
                pending
        })

    def put(self, request):

        serializer = ProfileSerializer(
            request.user,
            data=request.data,
            partial=True
        )

        if serializer.is_valid():

            serializer.save()

            return Response(
                serializer.data
            )

        return Response(
            serializer.errors,
            status=400
        )
    
from .models import User
from rest_framework import status
from django.core.mail import send_mail
from django.conf import settings
from django.contrib.auth.tokens import (
    PasswordResetTokenGenerator
)

from django.utils.http import (
    urlsafe_base64_encode,
    urlsafe_base64_decode
)

from django.utils.encoding import (
    force_bytes,
    force_str
)
class ForgotPasswordView(APIView):

    def post(self, request):

        email = request.data.get("email")

        user = User.objects.filter(
            email=email
        ).first()

        if not user:

            return Response(
                {
                    "message":
                    "❌ Email is not registered"
                },
                status=status.HTTP_404_NOT_FOUND
            )
        # send reset email here
        uid = urlsafe_base64_encode(
    force_bytes(user.pk)
)

        token = (
    PasswordResetTokenGenerator()
    .make_token(user)
)

        reset_link = (
    f"http://localhost:5173/"
    f"reset-password/{uid}/{token}/"
)
        send_mail(

    "Reset Password",

    f"""
Hello {user.username},

Click below link to reset your password :

{reset_link}

This link expires automatically.

""",

    settings.EMAIL_HOST_USER,

    [email],

    fail_silently=False

)
        return Response(
            {
                "message":
                "📧 Password reset email sent successfully"
            }
        )
class ChangePasswordView(APIView):

    permission_classes = [
        IsAuthenticated
    ]

    def put(self, request):

        serializer = ChangePasswordSerializer(
            data=request.data
        )

        if serializer.is_valid():

            old_password = serializer.validated_data[
                "old_password"
            ]

            new_password = serializer.validated_data[
                "new_password"
            ]

            user = request.user

            if not user.check_password(
                old_password
            ):

                return Response(
                    {
                        "message":
                        "❌ Old password is incorrect"
                    },
                    status=400
                )

            user.set_password(
                new_password
            )

            user.save()

            return Response(
                {
                    "message":
                    "✅ Password Changed Successfully"
                }
            )

        return Response(
            serializer.errors,
            status=400
        )
class LoginView(APIView):

    def post(self, request):

        serializer = LoginSerializer(
            data=request.data
        )

        serializer.is_valid(
            raise_exception=True
        )

        return Response(
            serializer.validated_data
        )
from django.contrib.auth.hashers import make_password

class ResetPasswordView(APIView):

    def post(
        self,
        request,
        uidb64,
        token
    ):

        try:

            uid = force_str(

                urlsafe_base64_decode(
                    uidb64
                )

            )

            user = User.objects.get(
                pk=uid
            )

        except Exception:

            return Response(
                {
                    "message":
                    "Invalid Link"
                },
                status=400
            )

        if not (
            PasswordResetTokenGenerator()
            .check_token(
                user,
                token
            )
        ):

            return Response(
                {
                    "message":
                    "Link Expired"
                },
                status=400
            )

        new_password = request.data.get(
                "new_password"
            )

        user.set_password(
            new_password
        )

        user.save()

        return Response(
            {
                "message":
                "Password Updated Successfully"
            }
        )