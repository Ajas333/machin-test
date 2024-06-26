from rest_framework import serializers
from django.contrib.auth import get_user_model
from rest_framework.exceptions import ParseError

User=get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username','email','is_superuser']
        

class UserRegisterSerializer(serializers.ModelSerializer):
    print("inside serializer function...........")
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']
        extra_kwrgd = {
            'password': {'write_only':True}
        }
    def create(self, validated_data):
        print("inside create function .............")
        password = validated_data.pop('password',None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
            instance.save()
            return instance
        else:
            return serializers.ValidationError({"password":"password is not valid"})



