from django.db import models
from django.db.models.signals import pre_save
import random
import string

# Model Imports
from tiles.models import Tile

#  ----------------------------------------------------------------------------
#                                     MODEL
#  ----------------------------------------------------------------------------

class Task(models.Model):
  """  Task Model - fields include: title(String), description(String), task_type(Integer), tile(Foreign Key)   """
  
  #   -------- TASK TYPE CHOICES ------------
  TASK_TYPES = [
    (0, 'Unassigned'),
    (1, 'Survey'),
    (2, 'Discussion'),
    (3, 'Diary'),
  ]
  
  # --------------FIELDS -------------------
  title = models.CharField(max_length=50)
  description = models.TextField(max_length=500)
  task_type = models.PositiveIntegerField(  # used PositiveIntegerField rather than CharField to reduce hardcoding and I tend to prefer storing numbers to strings
    choices=TASK_TYPES,
    default=0
  )
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)
  order = models.IntegerField(default=0)
  tile = models.ForeignKey(Tile, 
                           related_name='tasks',
                           on_delete=models.CASCADE, 
                           blank=True, 
                           null=True)
  
  class Meta:
    order_with_respect_to = 'tile'
  
  
  def __str__(self):
    return f'{self.title} - {self.description}'


#  ----------------------------------------------------------------------------
#                                     SIGNALS
#  ----------------------------------------------------------------------------



# REDESIGNED HOW TASK ORDERS ARE MANAGED SINCE THE PRE-TASK AS PER ROB'S COMMENT, OMITTED PRE-SAVE NOW AND ORDER ASSIGNMENT IS NOW WIHIN THE CREATE VIEW

# def task_order_generator(sender,instance, **kwargs):
#   """ Generates a random order reference number on task creation  """
#   if not instance.order:
#     instance.order = ''.join(random.choices(string.ascii_uppercase + string.digits,k=15))
  
# pre_save.connect(task_order_generator,sender=Task)