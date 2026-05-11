from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import generics,viewsets,status
from .models import Restaurant,GlobalUser
from .serializers import RestaurantSerializer,RegisterSerializer,UserSerializer

# Create your views here.

class RegisterView(generics.CreateAPIView):
    queryset=Restaurant.objects.all()
    serializer_class=RegisterSerializer

class RestaurantsView(generics.ListAPIView):
    queryset=Restaurant.objects.all()
    serializer_class=RestaurantSerializer

class UserData(viewsets.ViewSet):
        @action(detail=False,methods=['get'])
        def users(self,request):
            queryset=GlobalUser.objects.all()
            serializer=UserSerializer(queryset,many=True)
            return Response(serializer.data)
        
        def create(self,request):
            serializer=UserSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(status=status.HTTP_201_CREATED)
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

        @action(detail=False,methods=['get'])
        def profile(self,request):
                print(request.user)
                userdata=GlobalUser.objects.get(username=request.user.username)
                return Response({'username':userdata.username,'email':userdata.email,'phone':userdata.phone})