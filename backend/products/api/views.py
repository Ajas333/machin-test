from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.exceptions import ParseError,AuthenticationFailed
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from .serializer import ProductSerializer
from products.models import Product


class getAllProducts(APIView):
    def get(self,request):
        products=Product.objects.all()

        if products:
            serializer=ProductSerializer(products, many=True)
           
        
            return Response({"message": "Products retrieved successfully", "products": serializer.data},status=status.HTTP_200_OK)
        else:
            return Response({"message": "No products available"}, status=status.HTTP_204_NO_CONTENT)
        
class getProduct(APIView):

    def get(self,request):
        print("hellooooo")
        product_id = request.query_params.get('product_id')
        product=Product.objects.get(id=product_id)
        serializer=ProductSerializer(product)
        print(serializer)
        print(product_id)
        return Response({"message":"good"})