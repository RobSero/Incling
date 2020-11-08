# REST Framework Imports
from rest_framework.serializers import ModelSerializer

# Model and serializer Imports
from .models import Task


class TaskSerializer(ModelSerializer):
  """ Serializes all data and fields  """
  
  class Meta:
    model = Task
    fields = '__all__'
    
