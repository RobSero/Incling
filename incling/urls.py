from django.contrib import admin
from django.urls import path, include, re_path

# REST Framework Imports
from rest_framework.routers import DefaultRouter

# View Imports
from .views import index
from tasks.views import TaskViewSet
from tiles.views import TileViewSet, TileStatusView


router = DefaultRouter()
router.register('tiles', TileViewSet, basename='tile-viewset')
router.register('tasks', TaskViewSet, basename='task-viewset')



urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/tiles/status/<int:status>/', TileStatusView.as_view()),
    re_path(r'^.*$', index)
]
