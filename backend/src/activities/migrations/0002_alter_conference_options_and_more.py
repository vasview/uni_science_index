# Generated by Django 4.2.2 on 2023-11-08 16:13

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('activities', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='conference',
            options={'ordering': ['name', 'date'], 'verbose_name': 'Участие в семинарах и конференциях', 'verbose_name_plural': '13 Участие в семинарах и конференциях'},
        ),
        migrations.AlterModelOptions(
            name='inventionpatent',
            options={'ordering': ['number', 'issued_date'], 'verbose_name': 'Патент на изобретение', 'verbose_name_plural': '8 Патенты на изобретение'},
        ),
    ]