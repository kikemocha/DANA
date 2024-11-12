from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from rest_framework import generics
from .serializers import UserSerializer
from django.contrib.auth import get_user_model
from rest_framework.permissions import AllowAny

from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import CustomTokenObtainPairSerializer

# Importar el modelo de usuario personalizado
User = get_user_model()

# Crear la vista de registro
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()       # Indica que estamos utilizando el modelo User -> get_user_model()
    serializer_class = UserSerializer   # Serializa los datos, es decir los convierte los datos a json
    permission_classes = [AllowAny]     # Permite a todos los usuario acceder aunque no estén autenticados


# Crear la vista para devolver los datos del usuario
class UserDetailView(APIView):
    permission_classes = [IsAuthenticated]  # Solo permitiremos los datos a los usuarios autenticados
    def get(self, request):
        user = request.user                 # Django valida el token y guarda el usuario en request.user
        serializer = UserSerializer(user)   # Convertimos los datos a json
        return Response(serializer.data)    # Devolvemos los datos serializados
    

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer