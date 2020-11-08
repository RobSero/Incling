from django.test import TestCase, Client

# Model and serializer Imports
from .models import Tile
from tasks.models import Task

client = Client()


class TileTestSuite(TestCase):
  """  Handles the tests for creating tiles and querying the database  """
  def setUp(self):
    Task.objects.create(title='Clear dashboard', description='it is looking pretty messy dude', task_type='2')
    
    
  def test_create_tile(self):
    
    new_tile_request = client.post('/api/tiles/', { "tasks": [1] })    
    self.assertEqual(new_tile_request.status_code, 201)
    # print(dir(new_tile_request))
    self.assertTrue(new_tile_request.data['tasks'])
    obj_task = Task.objects.get(pk=1)
    self.assertTrue(obj_task)
    self.assertEqual(obj_task.tile.id, 1) # correctly assigned foreign key to task
    
    obj_tile = Tile.objects.get(pk=1)
    obj_tile.delete()
    obj_task = Task.objects.get(pk=1)
    self.assertFalse(obj_task.tile) # task's tile foreign key should reset to Null when containing tile is deleted
