from django.contrib.auth import get_user_model
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import authenticate
from rest_framework import serializers

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'first_name', 'last_name', 'NIF', 'phone_number', 'img','data_exist', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User(
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            NIF=validated_data['NIF'],
            phone_number=validated_data.get('phone_number', ''),
            img=validated_data.get('img', None),
            data_exist=False
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    NIF = serializers.CharField(required=True)

    def validate(self, attrs):
        NIF = attrs.get("NIF")
        password = attrs.get("password")

        user = authenticate(NIF=NIF, password=password)
        if user:
            # No necesitamos establecer `username`, ya que `NIF` actúa como `USERNAME_FIELD`
            data = super().validate(attrs)
            return data
        else:
            raise serializers.ValidationError("Invalid NIF or password")
