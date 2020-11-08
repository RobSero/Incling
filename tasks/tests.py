from django.db.models import Q
from django.test import TestCase


# Model and serializer Imports
from .models import Task


class TaskTestSuite(TestCase):
  """  Handles the tests for creating tasks and querying the database  """
  def setUp(self):
    Task.objects.create(title='Clear dashboard', description='it is looking pretty messy dude', task_type='2')
    Task.objects.create(title='Get Cheap Pens', description='you know they are gonna die within a day, buy a decent one...', task_type='0')
    Task.objects.create(title='Delegate new projects', description='get this done ASAP before next quarter', task_type='3')

    
    
  def test_get_task(self):
    obj_task = Task.objects.get(pk=1)
    self.assertTrue(obj_task)
    self.assertEqual(obj_task.title, 'Clear dashboard')
    # self.assertEqual(obj_task.tile, None)
    
  def test_search_queries(self):
    qs_search = Task.objects.filter(Q(title__icontains='cheap') | Q(description__icontains='messy'))
    self.assertTrue(qs_search)
    self.assertEqual(len(qs_search), 2)
    self.assertEqual(qs_search.last().title, 'Get Cheap Pens')

  


