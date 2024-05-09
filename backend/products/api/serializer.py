from rest_framework import serializers
from products.models import Product,CartItems

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model=Product
        fields = '__all__'

class CartItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartItems
        fields = ['id', 'product', 'quantity', 'sub_total', 'cart']
        depth = 1  
    
    