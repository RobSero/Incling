# REST Framework Imports
from rest_framework import status
from rest_framework import viewsets
from rest_framework.exceptions import NotFound, NotAcceptable
from rest_framework.response import Response

# Model and serializer Imports
from .models import Task
from .models import Tile
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
    except ValueError:
      raise NotAcceptable(detail='Required integer for task id, please try a different request')


def get_filtered_tasks(pk_list):
  try:
    return Task.objects.filter(pk__in=pk_list)
  except Task.DoesNotExist:
    raise NotFound()
  except ValueError:
      raise NotAcceptable(detail='Required integer for task id, please try a different request')  
 
    
def validate_tile_changes(current_tile=None, new_tile=None):
    """ checks if the task will be removed from it's tile and checks if the current tile's tasklist will have at least one task remaining in it """
    if current_tile == new_tile:  #check new tile does not match the current tile
      return True 
    try:
      obj_tile = Tile.objects.get(pk=current_tile) 
      if obj_tile.tasklist_length() < 2: 
        return False
    except ValueError:
      raise NotAcceptable(detail='Required integer for tile id, please try a different request')
    return True


#  ----------------------------------------------------------------------------
#                                  TASK VIEWSETS
#  ----------------------------------------------------------------------------


class TaskViewSet(viewsets.ViewSet):
  """  Contins the logic for handling the Task CRUD functionality """
  
  def list(self,request):
    qs_all_tasks = get_all_tasks()
    serialized_tasks = TaskSerializer(qs_all_tasks, many=True)
    return Response(serialized_tasks.data, status=status.HTTP_200_OK)
  
  
  def create(self, request):
    new_task = TaskSerializer(data=request.data)
    if new_task.is_valid():
      new_task.save()
      return Response(new_task.data, status=status.HTTP_201_CREATED)
    return Response(new_task.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
  
  
  def retrieve(self, request, pk=None):
    obj_task = get_task(pk=pk)
    serialized_task = TaskSerializer(obj_task)
    return Response(serialized_task.data, status=status.HTTP_200_OK)
  
  
  def update(self,request, pk=None):
    # Prior to updating, this will check if the current task's assigned tile has at least one remaining task within it before the task will be assigned.
    obj_task = get_task(pk=pk)
    if obj_task.tile: # check if task has a current tile
      new_tile = request.data.get('tile', obj_task.tile.id)  # check if a new tile has been included in the request, if none is provided, keep the current tile
      if not validate_tile_changes(current_tile=obj_task.tile.id, new_tile=new_tile): 
        return Response({"Error" : f"Current Tile {obj_task.tile.id} must have at least one task"}, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
    serialized_task = TaskSerializer(obj_task,data=request.data)
    if serialized_task.is_valid():
      serialized_task.save()
      return Response(serialized_task.data, status=status.HTTP_202_ACCEPTED)
    return Response(serialized_task.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
  
  
  def partial_update(self,request, pk=None):
    # Prior to updating, this will check if the current task's assigned tile has at least one remaining task within it before the task will be assigned.
    obj_task = get_task(pk=pk)
    if obj_task.tile: # check if task has a current tile
      new_tile = request.data.get('tile', obj_task.tile.id) # check if a new tile has been included in the request, if none is provided, keep the current tile
      if not validate_tile_changes(current_tile=obj_task.tile.id, new_tile=new_tile): 
        return Response({"Error" : f"Current Tile {obj_task.tile.id} must have at least one task"}, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
    serialized_task = TaskSerializer(obj_task,data=request.data, partial=True)
    if serialized_task.is_valid():
      serialized_task.save()
      return Response(serialized_task.data, status=status.HTTP_202_ACCEPTED)
    return Response(serialized_task.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
  
  
  def destroy(self,request, pk=None):
    # Task may only be deleted if the containing Tile still has one remaining Task within it
    obj_task = get_task(pk=pk)
    if obj_task.tile: 
      if not validate_tile_changes(current_tile=obj_task.tile.id): 
          return Response({"Error" : f"Current Tile must have at least one task"}, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
    obj_task.delete()
    return Response({'message': 'deleted successfully'}, status=status.HTTP_202_ACCEPTED)