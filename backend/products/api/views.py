from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.exceptions import ParseError,AuthenticationFailed
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from .serializer import ProductSerializer,CartItemSerializer
from products.models import Product,Category,Cart,CartItems
from django.db.models import Sum


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

    


       
        
