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

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        pay_cycle = PayCycle.objects.order_by('-start_date').first()
        if not pay_cycle:
            return context
        cycle_expenses = Expense.objects.filter(pay_cycle=pay_cycle)
        total_expenses = sum([cycle.amount for cycle in cycle_expenses])
        context['money_left'] = pay_cycle.pay_amount - total_expenses
        context['cycle_expenses'] = cycle_expenses
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
        pay_cycle = PayCycle.objects.order_by('-start_date').first()
        new_expense = Expense.objects.create(amount=amount, pay_cycle=pay_cycle)
        messages.add_message(request, messages.INFO, 'Expense successfully added!')
        return HttpResponseRedirect('/')
