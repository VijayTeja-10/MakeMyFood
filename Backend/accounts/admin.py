from django.contrib import admin
from .models import Restaurant,Customer,Table,Menu,Reviews
# Register your models here.
@admin.register(Restaurant)
class RestaurantAdmin(admin.ModelAdmin): 
    fields = ["name", "email", "phone", "location", "password"]
admin.site.register(Customer)
admin.site.register(Table)
admin.site.register(Menu)
admin.site.register(Reviews)