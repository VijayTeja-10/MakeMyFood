from django.db import models
from .base_models import PasswordField
# Create your models here.
class Customer(models.Model):
    name=models.CharField(max_length=50)
    email=models.EmailField()
    phone=models.BigIntegerField()
    password=models.CharField(max_length=100)

class Restaurant(PasswordField):
    name=models.CharField(max_length=255)
    email=models.EmailField(default='')
    phone=models.BigIntegerField()
    location=models.URLField()

    def __str__(self):
        return self.name

class Menu(models.Model):
    item=models.CharField(max_length=100)
    price=models.DecimalField(max_digits=10,decimal_places=2)
    restaurant=models.ForeignKey(Restaurant,on_delete=models.CASCADE,related_name='menu')
    table=models.ForeignKey('Table',on_delete=models.CASCADE,related_name='dishes',blank=True)

class Table(models.Model):
    val=models.IntegerField()
    seats=models.IntegerField(default=1)
    occupied=models.BooleanField(default=False)
    restaurant=models.ForeignKey(Restaurant,on_delete=models.CASCADE,related_name='tables')    

    def __str__(self):
        return str(self.val)

class Reviews(models.Model):
    review=models.TextField()
    user=models.ForeignKey(Customer,on_delete=models.CASCADE)
    restaurant=models.ForeignKey(Restaurant,on_delete=models.CASCADE,related_name='reviews')

    def __str__(self):
        return self.user