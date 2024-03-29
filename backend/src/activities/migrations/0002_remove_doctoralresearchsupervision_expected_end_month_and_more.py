# Generated by Django 4.2.2 on 2024-01-22 18:23

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('activities', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='doctoralresearchsupervision',
            name='expected_end_month',
        ),
        migrations.RemoveField(
            model_name='doctoralresearchsupervision',
            name='expected_end_year',
        ),
        migrations.AddField(
            model_name='doctoralresearchsupervision',
            name='expected_end_date',
            field=models.DateField(default=datetime.date.today),
        ),
        migrations.AddField(
            model_name='doctoralresearchsupervision',
            name='status',
            field=models.IntegerField(choices=[(1, 'приступил'), (2, 'в процессе'), (3, 'завершил'), (4, 'проистановил'), (5, 'защитил')], default=1),
        ),
    ]
