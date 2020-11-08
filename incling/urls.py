from django.contrib import admin
from django.urls import path

# REST Framework Imports
from rest_framework.routers import DefaultRouter

# View Imports


router = DefaultRouter()

urlpatterns = [
    path('admin/', admin.site.urls),
]
