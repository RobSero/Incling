# REST Framework Imports
from rest_framework import status
from rest_framework.exceptions import NotFound, NotAcceptable
from rest_framework import viewsets
from rest_framework.response import Response

# Model and serializer Imports
from .models import Tile
from .serializers import TileSerializer
from tasks.views import get_filtered_tasks

#  ----------------------------------------------------------------------------
#                                   TILE QUERIES
#  ----------------------------------------------------------------------------
#  I decided to use REST framework exception 'NotFound()' rather than Django's 'get_object_or_404' 
#  just for bit of consistency despite slightly more lines of code
def get_all_tiles():
    try:
      return Tile.objects.all()
    except Tile.DoesNotExist:
      raise NotFound(detail='Tiles could not be found, please try a different request')

def get_tile(pk):
    try:
      return Tile.objects.get(pk=pk)
    except Tile.DoesNotExist:
      raise NotFound(detail='Tile does not appear to exist, please try a different request')
    except ValueError:
      raise NotAcceptable(detail='Required integer for task id, please try a different request')


#  ----------------------------------------------------------------------------
#                                  TILE VIEWSETS
#  ----------------------------------------------------------------------------


class TileViewSet(viewsets.ViewSet):
  """  Contins the logic for handling the Tile CRUD functionality """
  
  def list(self,request):
    qs_all_tiles = get_all_tiles()
    serialized_tiles = TileSerializer(qs_all_tiles, many=True)
    return Response(serialized_tiles.data, status=status.HTTP_200_OK)
  
  
  def create(self, request):
    qs_task_list = get_filtered_tasks(request.data["tasks"]) # get tasks from within request body
    if len(qs_task_list) < 1: # check if at least one task in the request exists to be assigned to new tile
      return Response({"Error" : "Please provide at least one valid task id"}, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
    new_tile = TileSerializer(data=request.data)
    if new_tile.is_valid():
      obj_new_tile = new_tile.save()
      obj_new_tile.tasks.add(*qs_task_list) # assign valid tasks from request to the created tile
      obj_new_tile.save()
      return Response(new_tile.data, status=status.HTTP_201_CREATED)
    return Response(new_tile.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
  
  
  
  def retrieve(self, request, pk=None):
    obj_tile = get_tile(pk=pk)
    serialized_tile = TileSerializer(obj_tile)
    return Response(serialized_tile.data, status=status.HTTP_200_OK)
  
  
  def update(self,request, pk=None):
    obj_tile = get_tile(pk=pk)
    serialized_tile = TileSerializer(obj_tile,data=request.data)
    if serialized_tile.is_valid():
      serialized_tile.save()
      return Response(serialized_tile.data, status=status.HTTP_202_ACCEPTED)
    return Response(serialized_tile.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
  
  
  def partial_update(self,request, pk=None):
    obj_tile = get_tile(pk=pk)
    serialized_tile = TileSerializer(obj_tile,data=request.data, partial=True)
    if serialized_tile.is_valid():
      serialized_tile.save()
      return Response(serialized_tile.data, status=status.HTTP_202_ACCEPTED)
    return Response(serialized_tile.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
  
  
  def destroy(self,request, pk=None):
    obj_task = get_tile(pk=pk)
    obj_task.delete()
    return Response({'message': 'deleted successfully'}, status=status.HTTP_202_ACCEPTED)