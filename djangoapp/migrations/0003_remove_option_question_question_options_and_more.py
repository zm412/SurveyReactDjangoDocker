# Generated by Django 4.0.2 on 2022-03-22 16:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('djangoapp', '0002_remove_option_question_option_question'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='option',
            name='question',
        ),
        migrations.AddField(
            model_name='question',
            name='options',
            field=models.ManyToManyField(blank=True, null=True, related_name='questions_option', to='djangoapp.Option'),
        ),
        migrations.AlterField(
            model_name='question',
            name='question_type',
            field=models.CharField(choices=[('single_choice', 'Single choice'), ('multiple_choice', 'Multiple_choice'), ('text_answ', 'Text answer')], max_length=15),
        ),
    ]
