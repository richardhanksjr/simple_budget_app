from datetime import date
import calendar
from django.views.generic import TemplateView
from django.views import View
from django.http import HttpResponseRedirect, Http404
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.messages.views import SuccessMessageMixin
from django.contrib import messages
from web_app.models import PayCycle, Expense


class Index(LoginRequiredMixin, TemplateView):
    template_name = 'web_app/index.html'
    login_url = '/login/'
    redirect_field_name = 'redirect_to'

    def _compute_money_color(self, total_expenses, pay_cycle):

        today_date = date.today()
        day_of_month = today_date.day
        num_days_in_current_month = calendar.monthrange(today_date.year, today_date.month)[1]
        days_in_current_cycle = 15 if day_of_month <= 15 else num_days_in_current_month - 15
        day_of_cycle = day_of_month % days_in_current_cycle
        amount_per_day = pay_cycle.pay_amount / (num_days_in_current_month / 2)
        total_expected_to_date = day_of_cycle * amount_per_day
        percentage_of_expected = total_expenses / total_expected_to_date
        if percentage_of_expected <= 1:
            return "GREEN"
        elif percentage_of_expected > 1.5:
            return "RED"
        return "YELLOW"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        pay_cycle = PayCycle.objects.order_by('-start_date').first()
        if not pay_cycle:
            return context
        cycle_expenses = Expense.objects.filter(pay_cycle=pay_cycle).order_by('-date_created')
        total_expenses = sum([cycle.amount for cycle in cycle_expenses])
        context['money_left'] = pay_cycle.pay_amount - total_expenses
        context['cycle_expenses'] = cycle_expenses
        context['expense_types'] = Expense.EXPENSE_TYPE_CHOICES
        context['payment_types'] = Expense.PAYMENT_TYPE_CHOICES
        context['money_color'] = self._compute_money_color(total_expenses, pay_cycle)
        return context


class UpdateExpense(View):
    def post(self, request, *args, **kwargs):
        try:
            pk = request.POST.get('pk')
            new_amount = request.POST.get('amount')
            expense = Expense.objects.get(pk=pk)
            expense.amount = new_amount
            expense.save()
            return HttpResponseRedirect('/')
        except Expense.DoesNotExist:
            raise Http404("Expense does not exist")


class DeleteExpense(View):
    def get(self, request, *args, **kwargs):
        try:
            pk = kwargs['pk']
            Expense.objects.get(pk=pk).delete()
            messages.add_message(request, messages.INFO, 'Expense successfully deleted!')
            return HttpResponseRedirect('/')
        except Expense.DoesNotExist:
            return Http404("Expense does not exist")


class NewExpense(View):
    def post(self, request, *args, **kwargs):
        amount = request.POST.get('amount')
        expense_type = request.POST.get('expense_type')
        payment_type = request.POST.get('payment_type')
        pay_cycle = PayCycle.objects.order_by('-start_date').first()
        Expense.objects.create(amount=amount, pay_cycle=pay_cycle, expense_type=expense_type, payment_type=payment_type)
        messages.add_message(request, messages.INFO, 'Expense successfully added!')
        return HttpResponseRedirect('/')
