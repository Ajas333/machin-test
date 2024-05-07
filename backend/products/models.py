from django.db import models

# Create your models here.
class Category(models.Model):
    title=models.CharField(max_length=100)
    description=models.TextField(max_length=500)


class Product(models.Model):
    title=models.CharField(max_length=100)
    description=models.TextField(max_length=500)
    price=models.DecimalField(max_digits=8, decimal_places=2)
    quantity_available=models.IntegerField()
    image=models.ImageField(upload_to='assets/product_image')
    category=models.ForeignKey(Category, on_delete=models.CASCADE)
    created_at=models.DateTimeField(auto_now_add=True)
    updated_at=models.DateTimeField(auto_now_add=True)