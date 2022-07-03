from django.urls import path, include
from web_app import views


urlpatterns = [
    path('djga/', include('google_analytics.urls')),
    path('', views.Index.as_view(), name='index'),
    path('update-expense/', views.UpdateExpense.as_view(), name='update-expense'),
    path('delete-expense/<pk>', views.DeleteExpense.as_view(), name='delete-expense'),
    path('new-expense/<int:pay_cycle_id>', views.NewExpense.as_view(), name='new-expense'),
    path('add-credit/<int:pay_cycle_id>', views.AddCredit.as_view(), name='add-credit'),
    path('expense-pie-chart', views.ExpensePieChart.as_view(), name='expense-pie-chart'),
    path('piano', views.PianoView.as_view(), name='piano'),
    path('countdown', views.TemplateView.as_view(template_name="countdown/countdown.html")),
    path("drawing", views.Drawing.as_view(), name='drawing'),
]