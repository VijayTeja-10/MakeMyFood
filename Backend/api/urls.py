from django.urls import path,include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from accounts.views import RestaurantRegisterView,RestaurantsView,UserData,MenuView,TableView,SeatPolling
from rest_framework.routers import DefaultRouter

router=DefaultRouter()
router.register('users',UserData,basename='users')
router.register('registration',RestaurantRegisterView,basename='registration')
router.register('menu',MenuView,basename='menu')
router.register('table',TableView,basename='table')
router.register('restaurants',RestaurantsView,basename='restaurants')
router.register('seatpoll',SeatPolling,basename='seatpoll')

urlpatterns = [
    # path('restaurants/',RestaurantsView.as_view()),
    path('',include(router.urls)),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]