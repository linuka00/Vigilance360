from django.urls import path
from . import views

urlpatterns = [
    path('trigger', views.trigger),
    path('generate_token', views.generate_jwt_token),
]
