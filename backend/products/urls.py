from django.urls import path

from .views import product_list, create_order, add_to_cart, get_cart, remove_cart_item

urlpatterns = [
    path("products/", product_list, name="product_list"),
    path("orders/", create_order, name="create_order"),
    path("cart/add/", add_to_cart, name="add_to_cart"),
    path("cart/", get_cart, name="get_cart"),
    path("cart/<int:item_id>/", remove_cart_item, name="remove_cart_item"),
]