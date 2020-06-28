from django.contrib import admin
from django.urls import path, include
from django.contrib.auth import views as auth_views

urlpatterns = [
    path('text', include('front_end.urls'), name='index'),
    path('admin/', admin.site.urls),
    path('', include('web_app.urls')),
    path('login/', auth_views.LoginView.as_view()),
]
