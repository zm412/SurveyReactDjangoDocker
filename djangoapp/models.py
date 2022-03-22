from django.contrib.auth.models import AbstractUser
from django.db import models
from django import forms
from django.db.models.signals import post_save, pre_save
from django.core.validators import RegexValidator
import json

validate_alphanumeric = RegexValidator(r'^[a-zA-Z0-9]+$', 'Only alphanumeric characters are allowed.')


class User(AbstractUser):
    pass
    def serialize(self):
        return {
            'id': self.id,
            'username': self.username,
            'is_superuser': self.is_superuser,
        }

class Option(models.Model):
    option = models.CharField(max_length=64)

    def serialize(self):
        return {
            'id': self.id,
            'option': self.option,
        }


QUESTION_TYPE = (('single_choice', 'Single choice'),
                        ('multiple_choice', 'Multiple_choice'),
                        ('text_answ', 'Text answer'))

class Question(models.Model):

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='question_author')
    question = models.TextField()
    question_type = models.CharField(max_length=15, choices=QUESTION_TYPE)
    options = models.ManyToManyField(Option, blank=True, null=True, related_name='questions_option')

    def get_type(self):
        typeQ = json.loads( self.question_type )
        return typeQ

    def get_options_list(self):
        listO =  [v.serialize() for v in self.question_parent.all() ]
        return listO

    def serialize(self):
        return {
            'id': self.id,
            'question': self.question,
            'author': self.user.username,
            'question_type': self.question_type,
            'options_list': self.get_options_list()
        }

    def __str__(self):
        return f'id: {self.id} ,question: {self.question}'

class Survey(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='survey_author')
    title = models.CharField(max_length=64)
    description = models.CharField(max_length=255, blank=True)
    questions = models.ManyToManyField(Question, related_name='quest_collection')

    def __str__(self):
        return f'id: {self.id} ,title: {self.title}, quesitons: {self.questions}'

    def get_questions_id_list(self):
        querySet = self.questions.all()
        return [quest.id  for quest in querySet]


    def get_questions_list(self):
        querySet = self.questions.all()

        return [{'question': quest.question,
                 "id": quest.id,
                 'question_type': quest.question_type,
                 'options_list': quest.get_options_list(),
                 'author': quest.user.username } for quest in querySet]


    def serialize(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'author': self.user.username,
            'questions_list': self.get_questions_list(),
        }





class Survey_instance(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='item_interviewee')
    survey = models.ForeignKey(Survey, on_delete=models.CASCADE, related_name='survey_item')
    started = models.DateTimeField(auto_now_add=True)
    finished = models.DateTimeField(blank=True, null=True,)
    is_anonymous= models.BooleanField(default=False)

    def __str__(self):
        return f'id: {self.id} ,survey: {self.survey.id}, user: {self.user.username}, started: {self.started}'

    def serialize(self):
        return {
            'id': self.id,
            'user': self.user.username,
            'survey': self.survey.title,
            'started': self.started,
            'is_anonymouse': self.is_anonymous,
        }



class Answer(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='interwe')
    survey_inst = models.ForeignKey(Survey_instance, on_delete=models.CASCADE, related_name='survey_chapter')
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='questions_answ')
    answer = models.CharField(max_length=255, blank=True, null=True)


    def __str__(self):
        return f'id: {self.id} ,user: {self.user.username}, quesiton: {self.question.question}, answer: {self.answer}'

