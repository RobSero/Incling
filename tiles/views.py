# REST Framework Imports
from rest_framework import status
from rest_framework.exceptions import NotFound, NotAcceptable
from rest_framework import viewsets
from rest_framework.response import Response

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
    pass
  
  
  
  def retrieve(self, request, pk=None):
    qs_tile = get_tile(pk=pk)
    serialized_tile = TileSerializer(qs_tile)
    return Response(serialized_tile.data, status=status.HTTP_200_OK)
  
  
  def update(self,request, pk=None):
    pass
  
  
  def partial_update(self,request, pk=None):
    pass
  
  
  def destroy(self,request, pk=None):
    qs_task = get_tile(pk=pk)
    qs_task.delete()
    return Response({'message': 'deleted successfully'}, status=status.HTTP_202_ACCEPTED)