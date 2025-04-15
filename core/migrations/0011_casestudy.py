# Generated by Django 4.2.20 on 2025-03-22 02:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0010_proposalrequest_email'),
    ]

    operations = [
        migrations.CreateModel(
            name='CaseStudy',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255)),
                ('industry', models.CharField(choices=[('tech', 'Technology'), ('finance', 'Finance'), ('healthcare', 'Healthcare'), ('education', 'Education'), ('ecommerce', 'E-commerce')], max_length=50)),
                ('description', models.TextField()),
                ('challenges', models.TextField()),
                ('solutions', models.TextField()),
                ('results', models.TextField()),
                ('image', models.URLField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]
