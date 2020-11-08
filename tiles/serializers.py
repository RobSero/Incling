# REST Framework Imports
from rest_framework.serializers import ModelSerializer

# Model and serializer Imports
from .models import Tile
from tasks.serializers import SimpleTaskSerializer
from tasks.views import get_task


class TileSerializer(ModelSerializer):
  """  Serialize Tile Data including assigned nested tasks   """
  
  tasks = SimpleTaskSerializer(many=True, read_only=True)
  
  class Meta:
    model = Tile
    fields = '__all__'
    


