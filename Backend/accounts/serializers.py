from rest_framework import serializers
from .models import Restaurant,Table,Menu,Seat,GlobalUser,Reviews,Orders
from django.shortcuts import get_object_or_404

class UserseatSerializer(serializers.ModelSerializer):
    tval=serializers.SerializerMethodField()
    rid=serializers.SerializerMethodField()
    class Meta:
        model=Seat
        fields='__all__'
    def get_rid(self,obj):
        return obj.table.restaurant.id
    def get_tval(self,obj):
        return obj.table.val

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
        fields=['id','val','seat','seats','restaurant']
    def get_seats(self,obj):
        return obj.seat.count() if hasattr(obj,'seat') else 0

class AddTableSerializer(serializers.ModelSerializer):
    class Meta:
        model=Table
        fields=['val','restaurant']
    
class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model=Reviews
        fields='__all__'

class RestaurantSerializer(serializers.ModelSerializer):
    menu=DishSerializer(many=True)
    table=TableSerializer(many=True)
    review=ReviewSerializer(many=True)
    tables=serializers.SerializerMethodField()
    reviews=serializers.SerializerMethodField()
    class Meta:
        model=Restaurant
        exclude=['gstId','email','pincode']
    def get_tables(self,obj):
        return obj.table.count() if hasattr(obj,'table') else 0
    def get_reviews(self,obj):
        return obj.review.count() if hasattr(obj,'review') else 0

class RegisterSerializer(serializers.ModelSerializer):
    # password=serializers.CharField(write_only=True,style={'input_type' : 'password'})
    class Meta:
        model=Restaurant
        fields='__all__'

class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model=Menu
        fields=['item','restaurant','id']

class ItemPullSerializer(serializers.ModelSerializer):
    Rname=serializers.SerializerMethodField()
    class Meta:
        model=Menu
        fields='__all__'
    def get_Rname(self,obj):
        return obj.restaurant.name
    
class OrdersSerializer(serializers.ModelSerializer):
    Rname=serializers.SerializerMethodField()
    review=serializers.SerializerMethodField()
    user=serializers.SerializerMethodField()
    loc=serializers.SerializerMethodField()
    class Meta:
        model=Orders
        fields='__all__'
    def get_Rname(self,obj):
        return obj.seller.name
    def get_loc(self,obj):
        return obj.seller.location
    def get_review(self,obj):
        qs=Reviews.objects.filter(order=obj.id).first()
        if qs:
            rv=ReviewSerializer(qs)
            # print(qs,rv.data)
            return rv.data['review']
        return False
    def get_user(self,obj):
        return [obj.buyer.username,obj.buyer.phone]

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model=Reviews
        fields='__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=GlobalUser
        fields='__all__'
        extra_kwargs={'password':{'write_only':True}}
    
    def check_pass(self,password):
        if not password or (len(password)<8): return False
        c1,c2,c3=False,False,False

        for c in password:
            if not c.isalnum() and not c3:c3=True
            if c.isalpha() and not c2:c2=True
            if c.isdigit() and not c1:c1=True
        return c1 and c2 and c3

    def create(self,validated_data): #ensures password hashing
        if self.check_pass(validated_data.get('password',None)):
            return GlobalUser.objects.create_user(**validated_data)
        raise serializers.ValidationError({'password':'Your password must be more than 8 characters long, contain letters and numbers, and special characters.'})
    
    def update(self, instance, validated_data):
        password=validated_data.pop('password',None)
        if password and self.check_pass(password):
            instance.set_password(password) #built in
        else:
            raise serializers.ValidationError({'password':'Your password must be more than 8 characters long, contain letters and numbers, and special characters.'})
        return super().update(instance, validated_data) #updates other fields along with password