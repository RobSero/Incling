# REST Framework Imports
from rest_framework.serializers import ModelSerializer, SerializerMethodField

# Model and serializer Imports
from .models import Tile
from tasks.serializers import SimpleTaskSerializer


class TileSerializer(ModelSerializer):
  """  Serialize Tile Data including assigned nested tasks, uses a reduced fields serializer for read-only purposes   """
  
  # tasks = SimpleTaskSerializer(many=True, read_only=True)
  tasks = SerializerMethodField()
  
  class Meta:
    model = Tile
    fields = '__all__'
    
  def get_tasks(self, instance):
    tasks = instance.tasks.order_by('order')
    return SimpleTaskSerializer(tasks, read_only=True, many=True).data


