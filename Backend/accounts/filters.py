import django_filters
from .models import Menu

class MenuFilter(django_filters.FilterSet):
    item=django_filters.CharFilter(field_name='item',lookup_expr='icontains')
    class Meta:
        model=Menu
        fields=['item']