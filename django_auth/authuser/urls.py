from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import RegisterView, UserDetailView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),  # API para registrar usuarios
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),  # API para obtener el token JWT
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),  # API para refrescar el token JWT
    path('getUserData/', UserDetailView.as_view(), name='get_user_data'),
]
