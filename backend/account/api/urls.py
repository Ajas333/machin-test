from django.urls import path
from .import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path("register/",views.RegisterView.as_view() ,name="user_register"),
    path("login/",views.LoginView.as_view(),name="user_login"),

    path("user/details/", views.UserDetails.as_view(), name="user-details"),


    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

]
