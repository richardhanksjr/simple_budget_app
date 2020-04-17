from django.db import models


class PayCycle(models.Model):
    start_date = models.DateTimeField(auto_now_add=True)
    pay_amount = models.FloatField(null=False)

    def __str__(self):
        return f"{self.start_date}: {self.pay_amount}"


class Expense(models.Model):
    amount = models.FloatField(null=False)
    pay_cycle = models.ForeignKey(PayCycle, on_delete=models.CASCADE)

    def __str__(self):
        return f"Pay cycle: {self.pay_cycle.start_date} -- {self.amount}"
