from django.db import models


class PayCycle(models.Model):
    start_date = models.DateTimeField(auto_now_add=True)
    pay_amount = models.FloatField(null=False)

    def __str__(self):
        return f"{self.start_date}: {self.pay_amount}"


class Expense(models.Model):
    PAYMENT_TYPE_CHOICES = [
        ('red_card', 'Red Card'),
        ('amazon_card', 'Amazon Card'),
        ('greed_card', 'Green Card'),
        ('other', 'Other'),
    ]

    EXPENSE_TYPE_CHOICES = [
        ('groceries', 'Groceries'),
        ('take_out_food', 'Take Out Food'),
        ('gas', 'Gas'),
        ('clothes', 'Clothes'),
        ('baby_stuff', 'Kid Stuff'),
        ('toiletries', 'Toiletries'),
        ('car_house', 'Car or House'),
        ('entertainment', 'Entertainment'),
        ('drinks', "Drinks"),
        ('dogs', 'Dogs'),
        ('medical', 'Medical'),
        ('previous_balance', 'Previous Balance'),
        ('other', 'Other')
    ]
    date_created = models.DateTimeField(auto_now_add=True)
    amount = models.FloatField(null=False)
    pay_cycle = models.ForeignKey(PayCycle, on_delete=models.CASCADE)
    payment_type = models.CharField(choices=PAYMENT_TYPE_CHOICES, default='green_card', max_length=20)
    expense_type = models.CharField(choices=EXPENSE_TYPE_CHOICES, default='groceries', max_length=20)

    def __str__(self):
        return f"Pay cycle: {self.pay_cycle.start_date} -- {self.amount}"


class Piano(models.Model):
    name = models.CharField(max_length=10)



