from django.db import models


#  ----------------------------------------------------------------------------
#                                      MODEL
#  ----------------------------------------------------------------------------

class Tile(models.Model):
    #   -------- TILE STATUS CHOICES -------------
  
  TILE_STATUS = [
    (0, 'Pending'),
    (1, 'Live'),
    (2, 'Archived')
  ]
  
    # -------------- FIELDS -------------------
  launch_date = models.DateTimeField(auto_now_add=True)
  status = models.PositiveIntegerField(
    choices= TILE_STATUS,
    default=0)
  updated_at = models.DateTimeField(auto_now=True)
  
  
  def __str__(self):
    return f'Tile {self.id} -- {len(self.tasks.all())} tasks'
  
  def tasklist_length(self):
    return len(self.tasks.all())