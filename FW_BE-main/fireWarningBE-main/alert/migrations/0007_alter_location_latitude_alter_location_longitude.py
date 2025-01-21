# Generated by Django 4.2.6 on 2023-10-08 22:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('alert', '0006_alter_location_latitude_alter_location_longitude'),
    ]

    operations = [
        migrations.AlterField(
            model_name='location',
            name='latitude',
            field=models.DecimalField(decimal_places=17, max_digits=20),
        ),
        migrations.AlterField(
            model_name='location',
            name='longitude',
            field=models.DecimalField(decimal_places=17, max_digits=20),
        ),
    ]
