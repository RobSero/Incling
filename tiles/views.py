# REST Framework Imports
from rest_framework import status
from rest_framework.exceptions import NotFound
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


