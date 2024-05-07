from django.contrib import admin
from .models import Product, Category

class ProductAdmin(admin.ModelAdmin):
    list_display = ('title', 'price', 'quantity_available', 'category_title')

    def category_title(self, obj):
        return obj.category.title
    
    

class CategoryAdmin(admin.ModelAdmin):
    list_display = ['title']

admin.site.register(Product, ProductAdmin)
admin.site.register(Category, CategoryAdmin)