from django.urls import path
from .import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path("register/",views.RegisterView.as_view() ,name="user_register"),
    path("login/",views.LoginView.as_view(),name="user_login"),
]
