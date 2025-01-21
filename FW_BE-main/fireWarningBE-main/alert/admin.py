from django.contrib import admin
from .models import Record ,Location, CustomUser

# Register your models here.

admin.site.register(Record)
admin.site.register(Location)
admin.site.register(CustomUser)