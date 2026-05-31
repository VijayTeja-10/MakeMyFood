import datetime
from django.shortcuts import render
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from django.core.cache import cache
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import generics,viewsets,status
from django_filters.rest_framework import DjangoFilterBackend
from .filters import MenuFilter
from .models import Restaurant,GlobalUser,Menu,Table,Seat,Orders,Reviews
from .serializers import (RestaurantSerializer,RegisterSerializer,UserSerializer,
                          DishSerializer,TableSerializer,SeatSerializer,
                          ItemSerializer,ItemPullSerializer,OrdersSerializer,
                          ReviewSerializer,UserseatSerializer,AddTableSerializer)

# Create your views here.

class RestaurantRegisterView(viewsets.ModelViewSet):
    permission_classes=[IsAuthenticated]
    queryset=Restaurant.objects.all()
    serializer_class=RegisterSerializer

class RestaurantsView(viewsets.ModelViewSet):
    queryset=Restaurant.objects.all()
    serializer_class=RestaurantSerializer
    permission_classes=[IsAuthenticated]
    @action(detail=False,methods=['post'])
    def PullDetails(self,request):
        searchPlace=Restaurant.objects.filter(manager=request.data.get('manager',None)).first()
        serializer=RestaurantSerializer(searchPlace)
        # print(serializer.data)
        return Response(serializer.data)
    
    @action(detail=True,methods=['get'])
    def livetables(self,request,pk=None):
        place=self.get_object()
        tables=Table.objects.filter(restaurant=place)
        serializer=TableSerializer(tables,many=True)
        return Response({'table':serializer.data},status=status.HTTP_200_OK)
    
    @method_decorator(cache_page(60*60))
    def list(self, request, *args, **kwargs):
        # print('cache')
        return super().list(request, *args, **kwargs)
    
    @method_decorator(cache_page(60*60))
    def retrieve(self, request, *args, **kwargs):
        return super().retrieve(request, *args, **kwargs)
    
    def perform_update(self, serializer):
        cache.clear()
        return super().perform_update(serializer)
    
    def perform_destroy(self, instance):
        cache.clear()
        return super().perform_destroy(instance)
    
    def perform_create(self, serializer):
        cache.clear()
        return super().perform_create(serializer)

class MenuView(viewsets.ModelViewSet):
    permission_classes=[IsAuthenticated]
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
    
    def perform_update(self, serializer):
        cache.clear()
        return super().perform_update(serializer)
    
    def perform_destroy(self, instance):
        cache.clear()
        return super().perform_destroy(instance)
    
    def perform_create(self, serializer):
        cache.clear()
        return super().perform_create(serializer)

class TableView(viewsets.ModelViewSet):
    permission_classes=[IsAuthenticated]
    queryset=Table.objects.all()
    serializer_class=TableSerializer
    @action(detail=False,methods=['post'])
    def AddTable(self,request):
        serializer=AddTableSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

class SeatPolling(viewsets.ModelViewSet):
    permission_classes=[IsAuthenticated]
    queryset=Seat.objects.all()
    serializer_class=SeatSerializer
    @action(detail=False,methods=['get'])
    def userseats(self,request):
        queryset=Seat.objects.filter(uid=request.user.id,occupied=True)
        serializer=UserseatSerializer(queryset,many=True)
        # print(request.user)
        return Response(serializer.data)

class OrdersView(viewsets.ModelViewSet):
     permission_classes=[IsAuthenticated]
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
     @action(detail=False,methods=['post'])
     def pollorders(self,request):
        queryset=Orders.objects.filter(seller=request.data.get('seller',None),paid=False,arrival__gte=datetime.timedelta(minutes=10))
        serializer=self.get_serializer(queryset,many=True)
        return Response(serializer.data)
     @action(detail=False,methods=['post'])
     def orderhistroy(self,request):
        queryset=Orders.objects.filter(seller=request.data.get('seller',None),paid=True)
        serializer=self.get_serializer(queryset,many=True)
        return Response(serializer.data)

class Review(viewsets.ModelViewSet):
     permission_classes=[IsAuthenticated]
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
                data={'id':request.user.id,'username':userdata.username,'email':userdata.email,'phone':userdata.phone,'isManager':userdata.isManager}
                if userdata.isManager:
                    resId=Restaurant.objects.filter(manager=userdata.id).first()
                    if resId:data['resId']=resId.id
                return Response(data)