from django.urls import path
from . import views

urlpatterns = [
    # path('crawl_page/',views.crawl_page),
    path('sendData/',views.sendDataToHadoop)
]
