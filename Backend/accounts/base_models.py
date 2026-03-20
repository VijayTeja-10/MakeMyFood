from django.contrib.auth.hashers import make_password,check_password
from django.db import models
class PasswordField(models.Model):
    password=models.CharField(max_length=100)
    class Meta:
        abstract = True
    def set_password(self,raw_password):
        self.password=make_password(raw_password)
    
    def check_password(self,raw_password):
        return check_password(raw_password,self.password)