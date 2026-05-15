from django.contrib import admin
from .models import Restaurant,GlobalUser,Table,Menu,Reviews,Seat,Orders
# Register your models here.
admin.site.register(Restaurant)
admin.site.register(GlobalUser)
admin.site.register(Table)
admin.site.register(Seat)
admin.site.register(Menu)
admin.site.register(Reviews)
admin.site.register(Orders)