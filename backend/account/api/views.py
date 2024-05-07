from rest_framework.views import APIView
from .serializer import UserRegisterSerializer,UserSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.exceptions import ParseError,AuthenticationFailed
from django.contrib.auth import get_user_model
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated



User=get_user_model()

class RegisterView(APIView):
    def post(self,request):
        print("data from frontend",request.data)
        serializer = UserRegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
        else:
            print("else condition works............")
            return Response(serializer.errors,status=status.HTTP_406_NOT_ACCEPTABLE)

        content={"Message":"User Registed successfully"}
        return Response(content,status=status.HTTP_201_CREATED)

class LoginView(APIView):
    def post(self,request):
        print(request.data)
        try:
            print("haiiiiiii")
            username=request.data['username']
            password=request.data['password']
            print(username)

        except KeyError:
            raise ParseError('All feilds are required')
        
        if not User.objects.filter(username=username).exists():
            raise AuthenticationFailed('email is invalid')
        
        if not User.objects.filter(username=username, is_active=True).exists():
            raise AuthenticationFailed(" you are blocked by admin contact admin")
        
        user =authenticate(username=username,password=password)
        if user is None:
            raise AuthenticationFailed("Invalid password")
        print(user.is_superuser)
        
        refresh = RefreshToken.for_user(user)
        refresh["username"] = str(user.username)

        content = {
                     'refresh': str(refresh),
                     'access': str(refresh.access_token),
                     'email':user.email,
                     'isAdmin':user.is_superuser,
                }
        return Response(content,status=status.HTTP_200_OK)
    
class UserDetails(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        user = User.objects.get(id=request.user.id)
       
        data = UserSerializer(user).data
            
        content = data
        return Response(content)
        