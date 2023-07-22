# Generated by Django 4.2.2 on 2023-07-19 19:11

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='AcademicDegree',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('code', models.CharField(blank=True, max_length=50, null=True)),
                ('name', models.CharField(max_length=200)),
            ],
            options={
                'verbose_name': 'Ученая степень',
                'verbose_name_plural': 'Справочник ученых степеней',
                'ordering': ['name'],
            },
        ),
        migrations.CreateModel(
            name='AcademicTitle',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('code', models.CharField(blank=True, max_length=50, null=True)),
                ('name', models.CharField(max_length=200)),
            ],
            options={
                'verbose_name': 'Звание преподавателя',
                'verbose_name_plural': 'Справочник званий преподавателей',
                'ordering': ['name'],
            },
        ),
        migrations.CreateModel(
            name='ResearchDataBase',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('url', models.CharField(max_length=255)),
                ('request_param', models.CharField(blank=True, max_length=200, null=True)),
                ('description', models.CharField(blank=True, max_length=200, null=True)),
                ('sort', models.SmallIntegerField()),
                ('active', models.BooleanField(default=True)),
            ],
            options={
                'verbose_name': 'Справочник наукоемких баз данных',
                'verbose_name_plural': 'Справочник наукоемких баз данных',
                'ordering': ['name'],
            },
        ),
    ]
