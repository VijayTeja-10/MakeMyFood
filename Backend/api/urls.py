from django.urls import path,include
from accounts.views import RegisterView,RestaurantsView
urlpatterns = [
    path('register/',RegisterView.as_view()),
    path('restaurants/',RestaurantsView.as_view()),
]