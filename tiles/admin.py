from django.contrib import admin

# Model and serializer Imports
from .models import Tile
from tasks.models import Task


class TaskInline(admin.TabularInline):
  model = Task

class TileAdmin(admin.ModelAdmin):
  """ allows viewing/editting of the Tasks assigned to the Tile  """
  inlines = [
    TaskInline
  ]
  

admin.site.register(Tile, TileAdmin)