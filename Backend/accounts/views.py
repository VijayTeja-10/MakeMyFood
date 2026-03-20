from django.shortcuts import render
from rest_framework import generics
from .models import Restaurant
from .serializers import RestaurantSerializer,RegisterSerializer

# Create your views here.

class RegisterView(generics.CreateAPIView):
    queryset=Restaurant.objects.all()
    serializer_class=RegisterSerializer

class RestaurantsView(generics.ListAPIView):
    queryset=Restaurant.objects.all()
    serializer_class=RestaurantSerializer