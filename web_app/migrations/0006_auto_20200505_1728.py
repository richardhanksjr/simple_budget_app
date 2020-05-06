# Generated by Django 3.0.5 on 2020-05-05 21:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('web_app', '0005_auto_20200421_1008'),
    ]

    operations = [
        migrations.AlterField(
            model_name='expense',
            name='expense_type',
            field=models.CharField(choices=[('groceries', 'Groceries'), ('take_out_food', 'Take Out Food'), ('gas', 'Gas'), ('clothes', 'Clothes'), ('baby_stuff', 'Kid Stuff'), ('toiletries', 'Toiletries'), ('car_house', 'Car or House'), ('entertainment', 'Entertainment'), ('drinks', 'Drinks'), ('dogs', 'Dogs'), ('medical', 'Medical'), ('previous_balance', 'Previous Balance'), ('other', 'Other')], default='groceries', max_length=20),
        ),
    ]
