from django.urls import path
from .views import Index, SubmitText




urlpatterns = [
    path('', Index.as_view(), name='index'),
    path('submit_text', SubmitText.as_view(), name='submit_text')

]
