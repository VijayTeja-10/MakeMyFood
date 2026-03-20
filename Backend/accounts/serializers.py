from rest_framework import serializers
from .models import Restaurant,Table,Menu


class DishSerializer(serializers.ModelSerializer):
    class Meta:
        model=Menu
        fields=['id','item']

class TableSerializer(serializers.ModelSerializer):
    dishes=DishSerializer(many=True)
    class Meta:
        model=Table
        fields=['id','val','seats','occupied','dishes']

class RestaurantSerializer(serializers.ModelSerializer):
    tables=TableSerializer(many=True)
    class Meta:
        model=Restaurant
        fields=['id','name','email','phone','tables']

class RegisterSerializer(serializers.ModelSerializer):
    password=serializers.CharField(write_only=True,style={'input_type' : 'password'})
    class Meta:
        model=Restaurant
        fields=['name','email','phone','password']