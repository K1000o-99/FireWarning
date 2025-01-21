import base64
from django.core.files.base import ContentFile
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from .serializer import RecordSerializer, LocationSerializer, CustomUserSerializer
from .models import Record, Location, CustomUser

# Create your views here.
class RecordView(viewsets.ModelViewSet):
    serializer_class = RecordSerializer
    queryset = Record.objects.all()

    def create_record_with_base64_image(self, request):
        description = request.data.get('description')
        latitude = request.data.get('latitude')
        longitude = request.data.get('longitude')
        picture_base64 = request.data.get('picture_base64')

        # Decodificar la imagen base64
        format, imgstr = picture_base64.split(';base64,')
        ext = format.split('/')[-1]
        data = ContentFile(base64.b64decode(imgstr), name=f'{description}_image.{ext}')

        location = Location.objects.create(latitude=latitude, longitude=longitude)
        record = Record.objects.create(
            location=location,
            description=description,
            picture=data
        )

        serializer = RecordSerializer(record)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class LocationView(viewsets.ModelViewSet):
      serializer_class = LocationSerializer
      #si nosotros queremos dar más información de los campos , traemos el modelo
      queryset = Location.objects.all()



class CustomUserList(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer


