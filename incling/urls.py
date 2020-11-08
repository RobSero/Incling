from django.contrib import admin
from django.urls import path, include

# REST Framework Imports
from rest_framework.routers import DefaultRouter

# View Imports
from tasks.views import TaskViewSet
from tiles.views import TileViewSet


router = DefaultRouter()
router.register('tiles', TileViewSet, basename='tile-viewset')
router.register('tasks', TaskViewSet, basename='task-viewset')



urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]
