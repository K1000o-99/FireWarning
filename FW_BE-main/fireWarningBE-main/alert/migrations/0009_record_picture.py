# Generated by Django 4.2.6 on 2023-10-11 21:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('alert', '0008_alter_location_latitude_alter_location_longitude'),
    ]

    operations = [
        migrations.AddField(
            model_name='record',
            name='picture',
            field=models.ImageField(default='images/default.png', upload_to='images/'),
        ),
    ]
