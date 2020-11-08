# Incling - Django REST Framework Sample


## Installation and Usage

- Clone or download the repo
- Within your virtual environment, run: ``` pip install -r requirements.txt``` 
- Make your migrations
- Run your Django server with ```python manage.py runserver```

 

## Assumptions & Comments

- My understanding was that the Tiles must have at least one task in them at all times and so I have added in a little bit of error handing for when a PUT or PATCH request attempts to change a task’s tile. If the Tile only has that one task in it,  a 422 error will be raised. This can be bypassed by using the CRUD features on the Django admin to manually update them. Given more time, I would like to have explored an alternative approach to handling these checks - Possibly refactoring the checks into the serializer or model pre-save functions
- I made assumptions about what the Order field was so I just used a randomly generated order reference number at pre-save - Please let me know if you wish any changes to this
- Tile launch date set to current time on creation - please let me know if this should be different



## Available API requests

### ------------ Tasks ---------------

LIST
- GET: api/tasks/
- No body Required

CREATE
- POST: api/tasks/
- Body Required - All fields as shown
- Example body:
- ``` 
  {
      "title" : "Task 1",
      "description" : "Clean up desktop",
      "task_type" : 1
  }
  ```
- Tasks will initially be assigned null for their task foreign key and can be assigned with PUT or PATCH Requests. They will also be automatically assigned when a tile is created (see tile creation below)
- Tasks will randomly generate an order reference on creation and save to this field. As mentioned, if this needs to be different, please let me know.

RETRIEVE
- GET: api/tasks/```<task_id:int>```/
- No body Required

UPDATE
- PUT: api/tasks/```<task_id:int>```/
- Body - all fields required except for tile. Tile_id must exist if this is included, null is also valid:
- If no tile field is included, the task will remain with it's existing assigned tile (or null)
- Tile changing - The task can only be re-assigned to a new tile if the existing tile will have at least one task remaining in it.
- Example body:
- ``` 
	{
        "task_type" : 2 ,
        "title" : "Newly updated Task!",
        "description" : "Did you clean the desktop yet?",
        "tile" : 10
    }
  ```

PARTIAL UPDATE
- PATCH: api/tasks/```<task_id:int>```/
- Body - Not all fields are required. Tile_id must exist if this is included, null is also valid:
- If no tile field is included, the task will remain with it's existing assigned tile (or null)
- Tile changing - The task can only be re-assigned to a new tile if the existing tile will have at least one task remaining in it.
- Example body:
- ``` 
    {
	    "description" : "Did you clean the desktop yet?"
    }
  ```

DESTROY
- DELETE: api/tasks/```<task_id:int>```/
- No body Required
- The task can only be delete if the existing tile will have at least one task remaining in it



### ------------ Tiles---------------

LIST
- GET: api/tiles/
- No body Required

CREATE
- POST: api/tiles/
- Body Required - As a tile must have at least one task within it, an array of task ids must be provided. Minimum of one valid task id is required. This will automatically assign the array of tasks to this tile.
- Example body:
- ``` 
	{
       "tasks": [1,5]
    }
  ```

RETRIEVE
- GET: api/tiles/```<tile_id:int>```/
- No body Required

UPDATE
- PUT: api/tiles/```<tile_id:int>```/
- Body - Only status field required to assign a new status
- Example body:
- ``` 
	{
        "status" : 1
    }
  ```

PARTIAL UPDATE
- PATCH: api/tiles/```<tile_id:int>```/
- Body - Only status field available to assign a new status
- Example body:
- ``` 
	{
        "status" : 1
    }
  ```

DESTROY
- DELETE: api/tiles/```<tile_id:int>```/
- No body Required
- Any tasks contained within this tile will still persist however their tile foreign key is reset to null


## Hope you enjoy :-)