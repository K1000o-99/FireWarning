from django.db import models

# Create your models here.
from django.db import models
from django.utils import timezone

class Location(models.Model):
    latitude = models.DecimalField(max_digits=18, decimal_places=15)
    longitude = models.DecimalField(max_digits=18, decimal_places=15)

    def __str__(self):
        return f'Location ({self.latitude}, {self.longitude})'


class Record(models.Model):
    location = models.OneToOneField(Location, on_delete=models.CASCADE)
    description = models.TextField()
    date = models.DateTimeField(default=timezone.now)
    picture = models.ImageField(upload_to='images/', default='images/default.png')

    def __str__(self):
        return f'Record {self.id} - {self.description}'


class CustomUser(models.Model):
    username = models.CharField(max_length=150, unique=True)
    password = models.CharField(max_length=128, editable=True)  # Hacer que la contraseña sea editable
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)

    def __str__(self):
        return f'Record {self.username} Name {self.first_name} {self.last_name}'
