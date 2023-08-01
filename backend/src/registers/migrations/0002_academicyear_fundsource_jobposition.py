# Generated by Django 4.2.2 on 2023-07-30 16:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('registers', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='AcademicYear',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=255, null=True)),
                ('first_semester_start', models.DateField()),
                ('first_semester_end', models.DateField()),
                ('second_semester_start', models.DateField()),
                ('second_semester_end', models.DateField()),
                ('active', models.BooleanField(default=True)),
            ],
            options={
                'verbose_name': 'Учебный год',
                'verbose_name_plural': 'Справочник учебных годов',
                'ordering': ['id'],
            },
        ),
        migrations.CreateModel(
            name='FundSource',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('code', models.CharField(blank=True, max_length=100, null=True)),
                ('name', models.CharField(max_length=255)),
            ],
            options={
                'verbose_name': 'Справочник фондов',
                'verbose_name_plural': 'Справочник фондов',
                'ordering': ['name'],
            },
        ),
        migrations.CreateModel(
            name='JobPosition',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('code', models.CharField(blank=True, max_length=100, null=True)),
                ('name', models.CharField(max_length=255)),
            ],
            options={
                'verbose_name': 'Справочник должности',
                'verbose_name_plural': 'Список должностей',
                'ordering': ['name'],
            },
        ),
    ]