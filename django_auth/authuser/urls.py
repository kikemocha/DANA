from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import RegisterView, UserDetailView, CustomTokenObtainPairView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),  # API de login personalizado
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('getUserData/', UserDetailView.as_view(), name='get_user_data'),
]