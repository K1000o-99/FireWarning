from django.urls import path , include
from rest_framework import routers
from rest_framework.documentation import include_docs_urls
from .views import RecordView,LocationView,CustomUserList

#api version
router = routers.DefaultRouter()

router.register(r'record', RecordView, 'record')
router.register(r'location', LocationView, basename='location')
router.register(r'user', CustomUserList , 'user')

urlpatterns = [
    path('api/v1/', include(router.urls)),
    path('docs/', include_docs_urls(title="alert API"))
]
#en include indicamos que se deben incluir todas las url que se esten generando.
#con este codigo se estan generando los metodos get, post ,put y delete.

#  path('docs/', include_docs_urls(title="Tasks API"))
# en title se establece el titulo de la api