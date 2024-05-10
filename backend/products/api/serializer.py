from rest_framework import serializers
from products.models import Product,CartItems,Order,OrderItem

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model=Product
        fields = '__all__'

class CartItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartItems
        fields = ['id', 'product', 'quantity', 'sub_total', 'cart']
        depth = 1  

class OrderItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer()  # Nested serializer for product details
    class Meta:
        model = OrderItem
        fields = '__all__'

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'




    
