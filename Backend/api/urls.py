from django.urls import path,include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from accounts.views import RegisterView,RestaurantsView,UserData
from rest_framework.routers import DefaultRouter

router=DefaultRouter()
router.register('users',UserData,basename='users')
urlpatterns = [
    path('register/',RegisterView.as_view()),
    path('restaurants/',RestaurantsView.as_view()),
    path('',include(router.urls)),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]