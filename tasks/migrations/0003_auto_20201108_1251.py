# Generated by Django 2.2.17 on 2020-11-08 12:51

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('tasks', '0002_task_tile'),
    ]

    operations = [
        migrations.AlterField(
            model_name='task',
            name='tile',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='tasks', to='tiles.Tile'),
        ),
    ]
