# REST Framework Imports
from rest_framework import status
from rest_framework import viewsets
from rest_framework.exceptions import NotFound, NotAcceptable
from rest_framework.response import Response
from rest_framework.views import APIView

# Model and serializer Imports
from .models import Tile
from .serializers import TileSerializer

#  ----------------------------------------------------------------------------
#                                   TILE QUERIES
#  ----------------------------------------------------------------------------
#  I decided to use REST framework exception 'NotFound()' rather than Django's 'get_object_or_404' 
#  just for bit of consistency despite slightly more lines of code
def get_all_tiles():
    try:
      return Tile.objects.all().order_by('launch_date')
    except Tile.DoesNotExist:
      raise NotFound(detail='Tiles could not be found, please try a different request')

def get_tile(pk):
    try:
      return Tile.objects.get(pk=pk)
    except Tile.DoesNotExist:
      raise NotFound(detail='Tile does not appear to exist, please try a different request')
    except ValueError:
      raise NotAcceptable(detail='Required integer for task id, please try a different request')
    
def get_tiles_by_status(status):
    try:
      return Tile.objects.filter(status=status).order_by('launch_date')
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
    # UPDATED SINCE PRE-TASK, NOW ONLY REQUIRES A STATUS FIELD
    new_tile = TileSerializer(data=request.data)
    if new_tile.is_valid():
      obj_new_tile = new_tile.save()
      obj_new_tile.save()
      return Response(new_tile.data, status=status.HTTP_201_CREATED)
    return Response(new_tile.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
  
  
  
  def retrieve(self, request, pk=None):
    obj_tile = get_tile(pk=pk)
    obj_tile.save()
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
    task_order = request.data.get('task_order', None)
    if task_order:
      print(task_order)
      obj_tile.set_task_order(task_order)
    serialized_tile = TileSerializer(obj_tile,data=request.data, partial=True)
    if serialized_tile.is_valid():
      serialized_tile.save()
      return Response(serialized_tile.data, status=status.HTTP_202_ACCEPTED)
    return Response(serialized_tile.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
  
  
  def destroy(self,request, pk=None):
    # sets any contained tasks with one-to-many relationship to null foreign key
    obj_tile = get_tile(pk=pk)
    obj_tile.delete()
    return Response({'message': 'deleted successfully, all contained tasks still remain'}, status=status.HTTP_202_ACCEPTED)
  
  
class TileStatusView(APIView):
  def get(self, request, status=None):
    if status == 4:
      qs_all_tiles = get_all_tiles()
    else:
      qs_all_tiles = get_tiles_by_status(status=status)
    serialized_tiles = TileSerializer(qs_all_tiles, many=True)
    return Response(serialized_tiles.data)

    