from django.urls import path
from web_app import views


urlpatterns = [
    path('', views.Index.as_view(), name='index'),
    path('update-expense/', views.UpdateExpense.as_view(), name='update-expense'),
    path('delete-expense/<pk>', views.DeleteExpense.as_view(), name='delete-expense'),
    path('new-expense', views.NewExpense.as_view(), name='new-expense'),
    path('add-credit', views.AddCredit.as_view(), name='add-credit'),
    path('expense-pie-chart', views.ExpensePieChart.as_view(), name='expense-pie-chart'),
]