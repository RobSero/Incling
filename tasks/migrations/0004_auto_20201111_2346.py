# Generated by Django 2.2.17 on 2020-11-11 23:46

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('tasks', '0003_auto_20201108_1251'),
    ]

    operations = [
        migrations.AlterField(
            model_name='task',
            name='description',
            field=models.TextField(max_length=500),
        ),
        migrations.AlterField(
            model_name='task',
            name='order',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='task',
            name='tile',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='tasks', to='tiles.Tile'),
        ),
        migrations.AlterOrderWithRespectTo(
            name='task',
            order_with_respect_to='tile',
        ),
    ]
