from django.urls import path
from web_app import views


urlpatterns = [
    path('', views.Index.as_view(), name='index'),
]