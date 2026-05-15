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

class UserData(viewsets.ModelViewSet):
        queryset=GlobalUser.objects.all()
        serializer_class=UserSerializer
        @action(detail=False,methods=['get'])
        def users(self,request):
            queryset=GlobalUser.objects.all()
            serializer=UserSerializer(queryset,many=True)
            return Response(serializer.data)

        @action(detail=False,methods=['get'])
        def profile(self,request):
                # print(request.user,'user id',request.user.id)
                userdata=GlobalUser.objects.get(id=request.user.id)
                return Response({'id':request.user.id,'username':userdata.username,'email':userdata.email,'phone':userdata.phone})
        