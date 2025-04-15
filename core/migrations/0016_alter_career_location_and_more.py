# Generated by Django 4.2.20 on 2025-03-29 11:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0015_companyinfo_partner_location'),
    ]

    operations = [
        migrations.AlterField(
            model_name='career',
            name='location',
            field=models.CharField(choices=[('Nairobi, Kenya', 'Nairobi, Kenya'), ('Mogadishu, Somalia', 'Mogadishu, Somalia'), ('Dubai, UAE', 'Dubai, UAE'), ('Dodoma, Tanzania', 'Dodoma, Tanzania'), ('Accra, Ghana', 'Accra, Ghana'), ('Ethopia, Addis Ababa', 'Ethopia, Addis Ababa')], default='Nairobi, Kenya', max_length=255),
        ),
        migrations.AlterField(
            model_name='companyinfo',
            name='office_location',
            field=models.CharField(choices=[('Nairobi, Kenya', 'Nairobi, Kenya'), ('Mogadishu, Somalia', 'Mogadishu, Somalia'), ('Dubai, UAE', 'Dubai, UAE'), ('Dodoma, Tanzania', 'Dodoma, Tanzania'), ('Accra, Ghana', 'Accra, Ghana'), ('Ethopia, Addis Ababa', 'Ethopia, Addis Ababa')], default='Nairobi, Kenya', max_length=255),
        ),
        migrations.AlterField(
            model_name='location',
            name='city',
            field=models.CharField(choices=[('Nairobi', 'Nairobi'), ('Mogadishu', 'Mogadishu'), ('Dubai', 'Dubai'), ('Dodoma', 'Dodoma'), ('Accra', 'Accra'), ('Addis Ababa', 'Addis Ababa')], default='Nairobi', max_length=100),
        ),
    ]
