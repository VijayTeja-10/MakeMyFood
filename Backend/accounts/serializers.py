from rest_framework import serializers
from .models import Restaurant,Table,Menu,Seat,GlobalUser


class DishSerializer(serializers.ModelSerializer):
    class Meta:
        model=Menu
        fields='__all__'

class SeatSerializer(serializers.ModelSerializer):
    class Meta:
        model=Seat
        fields='__all__'

class TableSerializer(serializers.ModelSerializer):
    seat=SeatSerializer(many=True)
    seats=serializers.SerializerMethodField()
    class Meta:
        model=Table
        fields=['id','val','seat','seats']
    def get_seats(self,obj):
        return obj.seat.count() if hasattr(obj,'seat') else 0

class RestaurantSerializer(serializers.ModelSerializer):
    menu=DishSerializer(many=True)
    table=TableSerializer(many=True)
    tables=serializers.SerializerMethodField()
    class Meta:
        model=Restaurant
        exclude=['password','email','pin']
    def get_tables(self,obj):
        return obj.table.count() if hasattr(obj,'table') else 0

class RegisterSerializer(serializers.ModelSerializer):
    password=serializers.CharField(write_only=True,style={'input_type' : 'password'})
    class Meta:
        model=Restaurant
        fields='__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=GlobalUser
        fields='__all__'