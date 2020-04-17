from django.db import models


class PayCycle(models.Model):
    start_date = models.DateTimeField(auto_now_add=True)
    pay_amount = models.FloatField(null=False)


class Expense(models.Model):
    amount = models.FloatField(null=False)
    pay_cycle = models.ForeignKey(PayCycle, on_delete=models.CASCADE)
