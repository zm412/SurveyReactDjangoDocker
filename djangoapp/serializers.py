from rest_framework import serializers
from .models import User, Question, Option, Survey, Survey_instance, Answer

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('pk', 'username')

class OptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Option
        fields = ('pk', 'option')



class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ('pk','question',  'question_type')
