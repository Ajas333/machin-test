from django.db import models
from django.contrib.auth.models import User


# Create your models here.
class Category(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField(max_length=500)


class Product(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField(max_length=500)
    price = models.DecimalField(max_digits=8, decimal_places=2)
    quantity_available = models.IntegerField()
    image = models.ImageField(upload_to='assets/product_image')
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)


class Cart(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    total_price = models.DecimalField(max_digits=8, decimal_places=2, default=0.0)
    created_at = models.DateField(auto_now_add=True)


class CartItems(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)
    sub_total = models.DecimalField(max_digits=8, decimal_places=2, default=0.0)


class Order(models.Model):
    STATUS = (
        ('Conformed', 'Conformed'),
        ('Shipped', 'Shipped'),
        ('Delivered', 'Delevered'),
        ('Cancelled', 'Cancelled'),
        ('Return', 'Return')

    )
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    total_price = models.DecimalField(max_digits=8, decimal_places=2, default=0.0)
    status = models.CharField(max_length=10, choices=STATUS, default='Conformed')
    created_at = models.DateField(auto_now_add=True)
    invoice_number = models.CharField(max_length=30)
    invoice_date = models.DateField(auto_now_add=True)

class OrderItem(models.Model):
    order=models.ForeignKey(Order,on_delete=models.CASCADE)
    product=models.ForeignKey(Product,on_delete=models.CASCADE)
    quantity=models.IntegerField()
    price_at_purchase=models.DecimalField(max_digits=8, decimal_places=2, default=0.0)

