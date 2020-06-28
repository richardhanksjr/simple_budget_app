from datetime import date
import calendar
from django.views.generic import TemplateView
from django.views import View
from django.http import HttpResponseRedirect, Http404, JsonResponse, HttpResponseForbidden
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib import messages
from tracking_analyzer.models import Tracker

from web_app.models import PayCycle, Expense

from web_app.models import Piano

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
        total_expected_remaining = pay_cycle.pay_amount - (day_of_cycle * amount_per_day)
        print(total_expected_remaining)
        print(total_expenses)
        if total_expected_remaining <= pay_cycle.pay_amount - total_expenses:
            return 'GREEN'
        elif total_expected_remaining * .75<= (pay_cycle.pay_amount - total_expenses):
            return 'YELLOW'
        return 'RED'
        # total_expected_to_date = day_of_cycle * amount_per_day
        #         # percentage_of_expected = total_expenses / total_expected_to_date
        #         # if percentage_of_expected <= 1:
        #         #     return "GREEN"
        #         # elif percentage_of_expected > 1.5:
        #         #     return "RED"
        #         # return "YELLOW"

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


class UpdateExpense(LoginRequiredMixin, View):
    login_url = '/login/'
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


class DeleteExpense(LoginRequiredMixin, View):
    login_url = '/login/'
    def get(self, request, *args, **kwargs):
        try:
            pk = kwargs['pk']
            Expense.objects.get(pk=pk).delete()
            messages.add_message(request, messages.INFO, 'Expense successfully deleted!')
            return HttpResponseRedirect('/')
        except Expense.DoesNotExist:
            return Http404("Expense does not exist")


class NewExpense(LoginRequiredMixin, View):
    login_url = '/login/'
    def post(self, request, *args, **kwargs):
        amount = request.POST.get('amount')
        expense_type = request.POST.get('expense_type')
        payment_type = request.POST.get('payment_type')
        pay_cycle = PayCycle.objects.order_by('-start_date').first()
        Expense.objects.create(amount=amount, pay_cycle=pay_cycle, expense_type=expense_type, payment_type=payment_type)
        messages.add_message(request, messages.INFO, 'Expense successfully added!')
        return HttpResponseRedirect('/')


class AddCredit(LoginRequiredMixin, View):
    login_url = '/login/'
    def post(self, request, *args, **kwargs):
        """
        Take a given amount and add it to the current/initial value of the pay_cycle.  In other words,
        we are treating a credit like we had more money to begin with than we initially did.
        """
        credit_amount = request.POST.get('amount')
        pay_cycle = PayCycle.objects.order_by('-start_date').first()
        pay_cycle.pay_amount = pay_cycle.pay_amount + float(credit_amount)
        pay_cycle.save()
        messages.add_message(request, messages.INFO, 'Credit successfully added!')
        return HttpResponseRedirect('/')


class ExpensePieChart(LoginRequiredMixin, View):
    login_url = '/login/'
    def get(self, request):
        if not request.user:
            raise HttpResponseForbidden
        pay_cycle = PayCycle.objects.order_by('-start_date').first()
        cycle_expenses = Expense.objects.filter(pay_cycle=pay_cycle)
        # labels: ['Groceries', 'Takeout Food', 'Gas', 'Clothes', 'Baby Stuff', 'Toiletries', "Car or House",
        #          'Entertainment', 'Drinks', 'Dogs', 'Medical', 'Other']
        grocery_expenses = sum([expense.amount for expense in cycle_expenses if expense.expense_type == 'groceries'])
        takeout_expenses = sum([expense.amount for expense in cycle_expenses if expense.expense_type == 'take_out_food'])
        gas_expenses = sum([expense.amount for expense in cycle_expenses if expense.expense_type == 'gas'])
        clothes = sum([expense.amount for expense in cycle_expenses if expense.expense_type == 'clothes']),
        kid_stuff = sum([expense.amount for expense in cycle_expenses if expense.expense_type == 'baby_stuff'])
        toiletries = sum([expense.amount for expense in cycle_expenses if expense.expense_type == 'toiletries'])
        car_or_house = sum([expense.amount for expense in cycle_expenses if expense.expense_type == 'car_house'])
        entertainment = sum([expense.amount for expense in cycle_expenses if expense.expense_type == 'entertainment'])
        drinks = sum([expense.amount for expense in cycle_expenses if expense.expense_type == 'drinks'])
        dogs = sum([expense.amount for expense in cycle_expenses if expense.expense_type == 'dogs'])
        medical = sum([expense.amount for expense in cycle_expenses if expense.expense_type == 'medical'])
        previous_balance = sum([expense.amount for expense in cycle_expenses if expense.expense_type == 'previous_balance'])
        other = sum([expense.amount for expense in cycle_expenses if expense.expense_type == 'other'])

        values = [grocery_expenses, takeout_expenses, gas_expenses, clothes, kid_stuff, toiletries, car_or_house,
                  entertainment, drinks, dogs, medical, previous_balance, other]


        return JsonResponse(values, safe=False)


class PianoView(TemplateView):
    template_name = 'piano/index.html'

    def get_context_data(self, **kwargs):
        piano = Piano.objects.create(name='text')
        Tracker.objects.create_from_request(self.request, piano)

        return super().get_context_data(**kwargs)
