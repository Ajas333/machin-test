from django.urls import path
from .import views
from .views import *
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path("allProducts/",views.getAllProducts.as_view(),name="all_products"),
    path("product/",views.getProduct.as_view(),name="product"),
    path("add_cart/",views.AddCart.as_view(),name="add_cart"),
    path('getCart/',views.GetCartItem.as_view(),name="getCart"),
    path('updateCart/',views.UpdateCart.as_view(),name="updateCart"),
    path('order_product/',views.OrderProduct.as_view(),name="order_product"),
    path('deleteCartItem/',views.DeleteCartItem.as_view(),name="deleteCartItem/"),
    path('getOrder/',views.GetOrder.as_view(),name="getOrder"),
    path('orderPdf/<int:order_id>/', GenerateOrderPDF.as_view(), name = 'orderPDF'),
]

