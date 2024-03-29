# Generated by Django 4.2.2 on 2023-12-24 15:38

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('activities', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='StudentResearchPublication',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('place', models.CharField(blank=True, max_length=255, null=True)),
                ('publication_date', models.DateField()),
                ('is_local', models.BooleanField(default=True)),
                ('student_research', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='activities.studentresearchsupervision')),
            ],
            options={
                'verbose_name': 'Публикация по итогам НИРС',
                'verbose_name_plural': 'Публикации по итогам НИРС',
                'ordering': ['publication_date', 'name'],
            },
        ),
        migrations.CreateModel(
            name='MonographPublication',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('place', models.CharField(blank=True, max_length=255, null=True)),
                ('publication_date', models.DateField()),
                ('is_local', models.BooleanField(default=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Публикация монографии',
                'verbose_name_plural': 'Публикации монографий',
                'ordering': ['name', 'publication_date'],
            },
        ),
        migrations.CreateModel(
            name='GoogleScholarPublication',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255)),
                ('link', models.CharField(blank=True, max_length=255, null=True)),
                ('citation_id', models.CharField(blank=True, max_length=100, null=True)),
                ('authors', models.CharField(blank=True, max_length=255, null=True)),
                ('publication', models.CharField(blank=True, max_length=255, null=True)),
                ('year', models.CharField(blank=True, max_length=10, null=True)),
                ('citation_number', models.SmallIntegerField(blank=True, null=True)),
                ('cited_by', models.JSONField(blank=True, null=True)),
                ('is_local', models.BooleanField(default=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateField(auto_now=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Статьи Google Scholar',
                'verbose_name_plural': 'Публикации на сайте Google Scholar',
                'ordering': ['year', 'title'],
            },
        ),
    ]
