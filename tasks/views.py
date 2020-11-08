# REST Framework Imports
from rest_framework import status
from rest_framework.exceptions import NotFound
from rest_framework import viewsets
from rest_framework.response import Response

# Model and serializer Imports
from .models import Task
from .serializers import TaskSerializer


#  ----------------------------------------------------------------------------
#                                   TASK QUERIES
#  ----------------------------------------------------------------------------
#  I decided to use REST framework exception 'NotFound()' rather than Django's 'get_object_or_404' 
#  just for bit of consistency despite slightly more lines of code
def get_all_tasks():
    try:
      return Task.objects.all()
    except Task.DoesNotExist:
      raise NotFound(detail='Tasks could not be found, please try a different request')
    
def get_task(pk):
    try:
      return Task.objects.get(pk=pk)
    except Task.DoesNotExist:
      raise NotFound(detail='Task does not appear to exist, please try a different request')
    