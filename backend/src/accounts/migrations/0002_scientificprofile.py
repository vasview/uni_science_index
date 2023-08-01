# Generated by Django 4.2.2 on 2023-07-23 11:23

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('registers', '0001_initial'),
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='ScientificProfile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('account', models.CharField(blank=True, max_length=200, null=True)),
                ('research_db', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='registers.researchdatabase')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Профиль пользователя в индексируемых базах',
                'verbose_name_plural': 'Профили пользователя в индексируемых базах',
                'ordering': ['id'],
            },
        ),
    ]