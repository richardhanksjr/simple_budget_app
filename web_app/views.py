from django.views.generic import TemplateView
from django.contrib.auth.mixins import LoginRequiredMixin
from django.db.models import Sum
from web_app.models import PayCycle, Expense


class Index(LoginRequiredMixin, TemplateView):
    template_name = 'web_app/index.html'
    login_url = '/login/'
    redirect_field_name = 'redirect_to'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        pay_cycle = PayCycle.objects.order_by('-start_date').first()
        cycle_expenses = Expense.objects.filter(pay_cycle=pay_cycle)
        total_expenses = sum([cycle.amount for cycle in cycle_expenses])
        context['money_left'] = pay_cycle.pay_amount - total_expenses
        return context

