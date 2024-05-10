from rest_framework.views import APIView
from rest_framework.response import Response
from celery.result import AsyncResult
from rest_framework import status
# from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.permissions import IsAuthenticated
from .serializer import ProductSerializer,CartItemSerializer,OrderItemSerializer,OrderSerializer
from products.models import Product,Cart,CartItems,Order,OrderItem
from django.db.models import Sum
from django.views import View
from datetime import datetime
import random
import string
import os
from django.conf import settings
from io import BytesIO
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from django.http import HttpResponse
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle
from .tasks import generate_order_report

def generate_invoice_number(prefix='INV'):
    current_date = datetime.now()
    date_string = current_date.strftime('%Y%m%d')
    random_string = ''.join(random.choices(string.ascii_uppercase + string.digits, k=6))
    invoice_number = f'{prefix}-{date_string}-{random_string}'
    return invoice_number

class getAllProducts(APIView):
    def get(self,request):
        products=Product.objects.all()
        if products:
            serializer=ProductSerializer(products, many=True)
            return Response({"message": "Products retrieved successfully", "products": serializer.data},status=status.HTTP_200_OK)
        else:
            return Response({"message": "No products available"}, status=status.HTTP_204_NO_CONTENT)
        
class getProduct(APIView):

    def get(self, request):
        product_id = request.query_params.get('product_id')
        try:
            product = Product.objects.get(id=product_id)
            category = product.category.title
            serializer = ProductSerializer(product)
            return Response({
                "message": "Product retrieved successfully",
                "product": serializer.data,
                "category": category
            }, status=status.HTTP_200_OK)
        except Product.DoesNotExist:
            return Response({"message": "No product available"}, status=status.HTTP_204_NO_CONTENT)



class AddCart(APIView):

    permission_classes = [IsAuthenticated]
    def post(self, request):
        print("hellooooooooooooooooooooooooo",request.data)
        user = request.user
        product_id=request.data.get('product_id')
        print(".....................",user)
        token = request.headers.get('Authorization', '').split()[1]
        
        if not user or not user.is_active or not token:
            raise AuthenticationFailed('Invalid authentication credentials.')
        
        cart, created = Cart.objects.get_or_create(user=user)
        cart.save() 
        product=Product.objects.get(id=product_id)
        
        cart_item, item_created = CartItems.objects.get_or_create(cart=cart, product_id=product_id)
        
        if not item_created:
            cart_item.quantity += 1
            cart_item.sub_total += product.price
            cart_item.save()
        else:
            cart_item.sub_total=product.price
            cart_item.save()
        cart=Cart.objects.get(user=user)
        total_price = CartItems.objects.filter(cart=cart).aggregate(total=Sum('sub_total')).get('total', 0) or 0
        cart.total_price = total_price
        cart.save()
        
        serializer = CartItemSerializer(cart_item)
        
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class GetCartItem(APIView):
    permission_classes = [IsAuthenticated]
    def get(self,request):

        user=request.user
        token = request.headers.get('Authorization', '').split()[1]
        if not user or not user.is_active or not token:
            raise AuthenticationFailed('Invalid authentication credentials.')
        else:
            cart=Cart.objects.get(user=user)
            if cart is None:
                return Response({"message": "No cart available"}, status=status.HTTP_204_NO_CONTENT)
            else:
                cartitems=CartItems.objects.filter(cart=cart)
                total=cart.total_price
                print(cartitems.values_list())
                serializer=CartItemSerializer(cartitems, many=True)
                
                
                return Response({"message": "No product available","cart_items":serializer.data,"total":total}, status=status.HTTP_200_OK)

class UpdateCart(APIView):
    permission_classes = [IsAuthenticated]
    def put(self,request):
        print("helloooooooooooooooooooooooooooooooooooooooooooo")
        user=request.user
        token = request.headers.get('Authorization', '').split()[1]
        if not user or not user.is_active or not token:
            raise AuthenticationFailed('Invalid authentication credentials.')
        else:
            print(request.data)
            cart_item=request.data.get('cartItem_id')
            print(cart_item)
            try:
                print("hiiiiiiiiiiiiiiii")
                cartitme=CartItems.objects.get(id=cart_item)
                product=Product.objects.get(id=cartitme.product.id)
                cart=Cart.objects.get(id=cartitme.cart_id)
                new_quantity=request.data.get('newQuantity')
                print(new_quantity)
                if new_quantity == 0:
                    cartitme.delete()
                else:
                    cartitme.quantity=new_quantity
                    cartitme.sub_total=new_quantity*product.price
                    print(cartitme.sub_total)
                    cartitme.save()
                    total_price = CartItems.objects.filter(cart=cart).aggregate(total=Sum('sub_total')).get('total', 0) or 0
                    cart.total_price = total_price
                    cart.save()
                    serializer=CartItemSerializer(cartitme)
                    return Response({"message": "Cart updated successfully"}, status=status.HTTP_200_OK)
            except CartItems.DoesNotExist:
                print("error")

            return Response({"message": "Cart item not found"}, status=status.HTTP_404_NOT_FOUND)


class OrderProduct(APIView):
    permission_classes = [IsAuthenticated]
    def post(self,request):
        user=request.user
        tax=8
        try:
            if user:
                cart=Cart.objects.get(user=user)
                print(cart)
                cartitems=CartItems.objects.filter(cart=cart)
                print(cartitems)
                order=Order.objects.create(
                    user=user,
                    total_price=cart.total_price+tax,
                    invoice_number = generate_invoice_number()
                )
                order.save()
                for cartitem in cartitems:
                    orderitem = OrderItem.objects.create(
                        order=order,
                        product=cartitem.product,
                        quantity=cartitem.quantity,
                        price_at_purchase=cartitem.sub_total
                    )
                    orderitem.save()
                cartitem.delete()
                cart.delete()
            serializer=OrderItemSerializer(orderitem, many=True)
            if serializer.is_valid():
                serializer.save()
                
            else:
                return Response(serializer.errors,status=status.HTTP_406_NOT_ACCEPTABLE)
        except:
            pass
        
        return Response({"message": "Order created successfully"}, status=status.HTTP_201_CREATED)
    
class DeleteCartItem(APIView):
    def delete(self,request):
        cart_item_id=request.data.get('cartItem_id')
        try:
            cart_item = CartItems.objects.get(pk=cart_item_id)
            
            cart_item.delete()
            return Response({"message": "Cart item deleted successfully"}, status=status.HTTP_200_OK)
        except CartItems.DoesNotExist:
            return Response({"message": "Cart item not found"}, status=status.HTTP_404_NOT_FOUND)
        
class GetOrder(APIView):
    permission_classes = [IsAuthenticated]
    def get(self,request):
        try:
            orders=Order.objects.all()
            if orders:
                serializer=OrderSerializer(orders, many=True)
                return Response({"message": "orders retreived successfully","orders":serializer.data }, status=status.HTTP_200_OK)
            else:
                 return Response({"message": "no orders listed"}, status=status.HTTP_404_NOT_FOUND)
        except Order.DoesNotExist:
            return Response({"message": "no orders listed"}, status=status.HTTP_404_NOT_FOUND)
        

class GenerateOrderPDF(View):
    def get(self, request, order_id):
        print("hellllllllllloooooooooooooo")
        order = Order.objects.get(pk=order_id)

        # Create response object
        response = HttpResponse(content_type='application/pdf')
        response['Content-Disposition'] = f'attachment; filename="order_{order.invoice_number}.pdf"'

        # Create PDF document
        doc = SimpleDocTemplate(response, pagesize=letter)
        elements = []

        # Order details table
        data = [
            ['Invoice Number:', order.invoice_number],
            ['Total Price:', f'${order.total_price}'],
            ['Status:', order.status],
            ['Created At:', order.created_at.strftime('%Y-%m-%d %H:%M:%S')],
            ['Invoice Date:', order.invoice_date.strftime('%Y-%m-%d')],
        ]

        table = Table(data, colWidths=[150, 200])
        table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), colors.lightgreen),
            ('TEXTCOLOR', (0, 0), (-1, 0), colors.red),
            ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
            ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
            ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
            ('BACKGROUND', (0, 1), (-1, -1), colors.bisque),
        ]))
        elements.append(table)
        # Build PDF document
        doc.build(elements)
        return response
    
# class GenerateOrderCsv(View):
#     def get(self, request, *args, **kwargs):
#         print("spet1....................................")
#         file_name = generate_order_report.delay()
#         print("step 3......................",file_name)
#         file_path = os.path.join(settings.MEDIA_ROOT,file_name)
#         print("file path ",file_path)
#         with open(file_path, 'rb') as f:
#             response = HttpResponse(f, content_type='text/csv')
#             # response['Content-Disposition'] = f'attachment; filename="{file_name}"'
#             return response

class GenerateOrderCsv(View):
    def get(self, request, *args, **kwargs):
        print("Step 1....................................")
        # Send the task to the queue
        task = generate_order_report.delay()
        print("Step 2......................", task.id)  # You can use task.id to track the task in the queue

        # Wait for the task to complete and get the result
        result = task.get(timeout=30)  # Adjust the timeout as needed
        print("Task completed with result:", result)

        file_name = result  # The result of the task is the file name
        print("File name ", file_name)
        file_path = os.path.join(settings.MEDIA_ROOT, file_name)
        print("File path ", file_path)

        with open(file_path, 'rb') as f:
            response = HttpResponse(f.read(), content_type='text/csv')
            # response['Content-Disposition'] = f'attachment; filename="{file_name}"'
            return response

        
            

    


       
        
