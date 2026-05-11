from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class GlobalUser(AbstractUser):
    username = models.CharField(max_length=255)
    email=models.EmailField(unique=True)
    phone=models.BigIntegerField(unique=True)
    isManager=models.BooleanField(default=False)
    USERNAME_FIELD='email'
    REQUIRED_FIELDS=['username','phone']

    def __str__(self):
        return str(self.username)

class Restaurant(models.Model):
    name=models.CharField(max_length=255)
    email=models.EmailField()
    phone=models.BigIntegerField()
    desc=models.TextField(default='')
    image=models.URLField(default=None,null=True,blank=True)
    location=models.URLField()
    isRes=models.BooleanField(default=False)
    pin=models.IntegerField() #postalcode
    manager=models.ForeignKey(GlobalUser,on_delete=models.CASCADE,related_name='manager')

    def __str__(self):
        return self.name

class Menu(models.Model):
    item=models.CharField(max_length=100)
    image=models.URLField(default=None,null=True,blank=True)
    desc=models.TextField()
    price=models.DecimalField(max_digits=10,decimal_places=2)
    inStock=models.BooleanField(default=False)
    restaurant=models.ForeignKey(Restaurant,on_delete=models.CASCADE,related_name='menu')

class Table(models.Model):
    val=models.IntegerField()
    restaurant=models.ForeignKey(Restaurant,on_delete=models.CASCADE,related_name='table')

    def __str__(self):
        return str(self.val)
    
class Seat(models.Model):
    val=models.IntegerField()
    occupied=models.BooleanField(default=False)
    table=models.ForeignKey(Table,on_delete=models.CASCADE,related_name='seat')

    def __str__(self):
        return str(self.val)

class Reviews(models.Model):
    review=models.TextField()
    user=models.ForeignKey(GlobalUser,on_delete=models.CASCADE,related_name='users')
    restaurant=models.ForeignKey(Restaurant,on_delete=models.CASCADE,related_name='reviews')

    def __str__(self):
        return self.user