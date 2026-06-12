from django.urls import path
from .views import SignupView, ProfileView, LoginView
from .views import ForgotPasswordView,ChangePasswordView
from .views import ResetPasswordView
urlpatterns = [
    path('signup/', SignupView.as_view()),
    path('login/', LoginView.as_view()),
    path('profile/', ProfileView.as_view()),
     path(
        "forgot-password/",
        ForgotPasswordView.as_view()
    ),
    path(
    "change-password/",
    ChangePasswordView.as_view()
    ),path(
    "reset-password/<int:user_id>/",
    ResetPasswordView.as_view()
    ),
    path(
    "reset-password/"
    "<str:uidb64>/"
    "<str:token>/",

    ResetPasswordView.as_view()
),
]