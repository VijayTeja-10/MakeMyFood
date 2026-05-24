from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import generics,viewsets,status
from django_filters.rest_framework import DjangoFilterBackend
from .filters import MenuFilter
from .models import Restaurant,GlobalUser,Menu,Table,Seat,Orders,Reviews
from .serializers import (RestaurantSerializer,RegisterSerializer,UserSerializer,
                          DishSerializer,TableSerializer,SeatSerializer,
                          ItemSerializer,ItemPullSerializer,OrdersSerializer,
                          ReviewSerializer,UserseatSerializer)

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
    @action(detail=False,methods=['post'])
    def PullItem(self,request):
        #custom filter
        searchItems=MenuFilter(request.data,queryset=self.queryset)
        items=searchItems.qs #filtered queryset
        serializer=ItemPullSerializer(items,many=True)
        print('processing')
        print(serializer.data)
        return Response(serializer.data)
    
    @action(detail=False,methods=['post'])
    def PullRestaurantItem(self,request):
        #menu filter only searches for item name, rest of filters are applied by obj.filter
        searchItems=MenuFilter(request.data,queryset=Menu.objects.filter(restaurant=request.data.get('restaurant',None)))
        items=searchItems.qs
        serializer=ItemSerializer(items,many=True)
        print('processing')
        print(request.data['item'], serializer.data)
        return Response(serializer.data)

class TableView(viewsets.ModelViewSet):
    queryset=Table.objects.all()
    serializer_class=TableSerializer
    # @action(detail=False,methods=['get'])
    # def PullData(self,request,pk=None):
    #      tables=Restaurant.objects.get(id=pk)
        #  serailizer=in

class SeatPolling(viewsets.ModelViewSet):
    queryset=Seat.objects.all()
    serializer_class=SeatSerializer
    @action(detail=False,methods=['get'])
    def userseats(self,request):
        queryset=Seat.objects.filter(uid=request.user.id,occupied=True)
        serializer=UserseatSerializer(queryset,many=True)
        # print(request.user)
        return Response(serializer.data)

class OrdersView(viewsets.ModelViewSet):
     queryset=Orders.objects.all()
     serializer_class=OrdersSerializer
     @action(detail=False,methods=['get'])
     def userOrders(self,request):
        queryset=Orders.objects.filter(buyer=request.user.id)
        serializer=self.get_serializer(queryset,many=True)
        # print(request.user)
        return Response(serializer.data)
     @action(detail=False,methods=['get'])
     def usercart(self,request):
        queryset=Orders.objects.filter(buyer=request.user.id,paid=False)
        serializer=self.get_serializer(queryset,many=True)
        # print(request.user)
        return Response(serializer.data)

class Review(viewsets.ModelViewSet):
     queryset=Reviews.objects.all()
     serializer_class=ReviewSerializer

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
        