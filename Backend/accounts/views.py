from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import generics,viewsets,status
from .models import Restaurant,GlobalUser,Menu,Table,Seat
from .serializers import RestaurantSerializer,RegisterSerializer,UserSerializer,DishSerializer,TableSerializer,SeatSerializer

# Create your views here.

class RestaurantRegisterView(viewsets.ModelViewSet):
    queryset=Restaurant.objects.all()
    serializer_class=RegisterSerializer

class RestaurantsView(viewsets.ModelViewSet):
    queryset=Restaurant.objects.all()
    serializer_class=RestaurantSerializer

class MenuView(viewsets.ModelViewSet):
    queryset=Menu.objects.all()
    serializer_class=DishSerializer

class TableView(viewsets.ModelViewSet):
    queryset=Table.objects.all()
    serializer_class=TableSerializer
    @action(detail=False,methods=['get'])
    def PullData(self,request,pk=None):
         tables=Restaurant.objects.get(id=pk)
        #  serailizer=in

class SeatPolling(viewsets.ModelViewSet):
    queryset=Seat.objects.all()
    serializer_class=SeatSerializer

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
        