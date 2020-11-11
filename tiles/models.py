from django.db import models
from datetime import datetime


#  ----------------------------------------------------------------------------
#                                      MODEL
#  ----------------------------------------------------------------------------

class Tile(models.Model):
    #   -------- TILE STATUS CHOICES -------------
  
  TILE_STATUS = [
    (0, 'Live'),
    (1, 'Draft'),
    (2, 'Pending'),
    (3, 'Archived')
  ]
  
    # -------------- FIELDS -------------------
  launch_date = models.DateTimeField(default=datetime.now)
  status = models.PositiveIntegerField(
    choices= TILE_STATUS,
    default=0)
  updated_at = models.DateTimeField(auto_now=True)
  
  
  def __str__(self):
    return f'Tile {self.id} -- {len(self.tasks.all())} tasks'
  
  def tasklist_length(self):
    return len(self.tasks.all())