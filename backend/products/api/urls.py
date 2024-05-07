from django.urls import path
from .import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path("allProducts/",views.getAllProducts.as_view(),name="all_products",)
]
