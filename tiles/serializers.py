# REST Framework Imports
from rest_framework.serializers import ModelSerializer

# Model and serializer Imports
from .models import Tile
from tasks.serializers import SimpleTaskSerializer


class TileSerializer(ModelSerializer):
  """  Serialize Tile Data including assigned nested tasks, uses a reduced fields serializer for read-only purposes   """
  
  tasks = SimpleTaskSerializer(many=True, read_only=True)
  
  class Meta:
    model = Tile
    fields = '__all__'


