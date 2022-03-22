from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from .serializers import *

from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseNotFound, HttpResponseRedirect
from django.shortcuts import render
from django.db.models import Q
from django.urls import reverse
from django.forms import MultiWidget, TextInput
from django.http import JsonResponse
from django import forms
from django.utils import timezone
from datetime import timedelta, datetime
from django.views.decorators.http import require_http_methods
import json

from .models import User, Question, Survey, Survey_instance, Option, Answer

def index(request):
    print(Question.objects.all(), 'all')
    print(request.user, 'USER')
    return render(request, "djangoapp/index.html")

@api_view(['GET', 'POST'])
def options_list(request):
    if request.method == 'GET':
        return Response({ 'data': Option.objects.values_list('option', flat=True)})


@api_view(['GET', 'POST'])
def questions_list(request):
    if request.method == 'GET':
        data = []
        nextPage = 1
        previousPage = 1
        questions = Question.objects.all()
        page = request.GET.get('page', 1)
        paginator = Paginator(questions, 10)
        try:
            data = paginator.page(page)
        except PageNotAnInteger:
            data = paginator.page(1)
        except EmptyPage:
            data = paginator.page(paginator.num_pages)

        serializer = QuestionSerializer(data,context={'request': request} ,many=True)
        if data.has_next():
            nextPage = data.next_page_number()
        if data.has_previous():
            previousPage = data.previous_page_number()

        print(data, 'serKKKKKKKKKKKKKKKKKKKKKKKk')
        return Response({
            'data': serializer.data,
            'count': paginator.count,
            'numpages' : paginator.num_pages,
            'nextlink': '/api/questions/?page=' + str(nextPage),
            'prevlink': '/api/questions/?page=' + str(previousPage)
        })

    elif request.method == 'POST':
        new_quest = Question(user=request.user)
        serializer = QuestionSerializer(data=request.data, instance=new_quest)
        if serializer.is_valid():
            serializer.user=request.user
            serializer.save()
            listArr = [ request.POST['opt1'],request.POST['opt2'],request.POST['opt3'],request.POST['opt4'],request.POST['opt5']]
            print(listArr, 'listArr')
            for k in listArr:
                try:
                    opt = Option.objects.get(option=k)
                    serializer.options.add(opt)
                    print(opt, 'opt1')
                except Option.DoesNotExist:
                    opt = Option.objects.create(option=k)
                    serializer.options.add(opt)
                    print(opt, 'opt2')
            print(serializer, 'serialiserLLLLLL')
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


def add_question(request):
    message = ''
    error = True

    if request.method == "POST":
        listArr = [ request.POST['opt1'],request.POST['opt2'],request.POST['opt3'],request.POST['opt4'],request.POST['opt5']]
        new_quest = Question(user=request.user)
        add_form = Add_question(request.POST, instance=new_quest)

        if add_form.is_valid():
            question = add_form.save()
            question.save()
            question.question_type = request.POST['question_type']
            question.save(update_fields=[ 'question_type'])

            for k in listArr:
                if any(k):
                    opt = Option.objects.create(question=question, option=k)
    return render(request, "djangoapp/index.html", get_context(request.user) )


@api_view(['GET', 'PUT', 'DELETE'])
def questions_detail(request, pk):
    try:
        question = Question.objects.get(pk=pk)
    except Question.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = QuestionSerializer(customer,context={'request': request})
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = QuestionSerializer(customer, data=request.data,context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        question.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


def start_surv(request, surv_id):
    message = ''
    survey = Survey.objects.get(id=surv_id)
    try:
        survey_inst = Survey_instance.objects.get(survey=survey, user=request.user )
        message = 'this survey instance alredy started'
    except Survey_instance.DoesNotExist:
        surv_inst = Survey_instance.objects.create(user=request.user, survey=survey,)
        message = 'survey_inst created'
    return HttpResponseRedirect(reverse("index"))

def add_interv(request, surv_id):
    message = ''
    survey_inst = Survey_instance.objects.get(survey_id=surv_id, user=request.user )
    survey = Survey.objects.get(id=surv_id)
    for c in survey.questions.all():
        new_str = ', '.join(request.POST.getlist(str( c.id )))

        try:
            old_answer = Answer.objects.get(survey_inst=survey_inst, user=request.user, question=c )
            old_answer.answer=new_str
            old_answer.save(update_fields=['answer'])
            message = 'answer is changed'
        except Answer.DoesNotExist:
            answer = Answer.objects.create(
                user=request.user,
                question=c,
                survey_inst=survey_inst,
                answer= new_str )
            message = 'answer is added'

    return HttpResponseRedirect(reverse("index"))

def add_opt(request, quest_id):
    message = ''
    if request.method == "POST" and request.user.is_superuser:
        try:
            quest = Question.objects.get(id=quest_id)
            Option.objects.create(question=quest, option= request.POST['new_opt'] )
            message = 'option is added'
        except Question.DoesNotExist:
            message = 'there is no question with this id'
    return HttpResponseRedirect(reverse("index"))


def delete_opt(request, opt_id):
    message = ''
    try:
        option = Option.objects.get(id=opt_id)
        option.delete()
        message = 'option is deleted'
    except Option.DoesNotExist:
        message = 'there is no option with such id'

    return HttpResponseRedirect(reverse("index"))


def update_survey(request, surv_id):
    message = ''
    if request.method == "POST" and request.user.is_superuser:
        survey = Survey.objects.get(id=surv_id)
        survey.title = request.POST['title']
        survey.description = request.POST['description']
        survey.save(update_fields=['title', 'description'])
        message = 'question were updated'
    else:
        message =  'Data is not valid'

    return HttpResponseRedirect(reverse("index"))



def add_survey(request):

    message = ''
    if request.method == "POST":
        new_surv = Survey(user=request.user)
        list_of_questions = get_questions()
        add_form = Add_survey(request.POST, instance=new_surv)

        if add_form.is_valid():
            survey = add_form.save()
            surveys_quests = request.POST.getlist('question_list')

            for c in surveys_quests:
                questionI = Question.objects.get(id=c)
                questionI.quest_collection.add(survey)

            survey.save()
            message =  'Survey is saved'
        else:
            message =  'Data is not valid'
    else:
        message =  'Data is not valid'

    return HttpResponseRedirect(reverse("index"))

def del_from_list(request, surv_id, quest_id):
    message = ''
    try:
        survey = Survey.objects.get(id=surv_id)
        question = Question.objects.get(id=quest_id)
        question.quest_collection.remove(survey)
        message =  'Question is deleted from list'
    except Survey.DoesNotExist:
        message = 'there is no survey with such id'

    return HttpResponseRedirect(reverse("index"))

def add_on_list(request, surv_id):
    message = ''
    if request.method == "POST":
        try:
            survey = Survey.objects.get(id=surv_id)
            question = Question.objects.get(id=request.POST['question_id'])
            question.quest_collection.add(survey)
            message =  'Question is added to the list'
        except Survey.DoesNotExist:
            message = 'there is no survey with such id'

    return HttpResponseRedirect(reverse("index"))



def delete_survey(request, surv_id):
    message = ''
    try:
        survey = Survey.objects.get(id=surv_id)
        survey.delete()
        message =  'Survey is deleted'
    except Question.DoesNotExist:
        message = 'there is no survey with such id'

    return HttpResponseRedirect(reverse("index"))

def delete_question(request, quest_id):
    message = ''
    try:
        question = Question.objects.get(id=quest_id)
        question.delete()
        message = 'question is deleted'
    except Question.DoesNotExist:
        message = 'there is no category with such id'

    return HttpResponseRedirect(reverse("index"))



def update_question(request, quest_id):
    if request.method == "POST":
        try:
            question = Question.objects.get(id=quest_id)
            update_form = Add_question(request.POST)
            if update_form.is_valid():
                question.question = request.POST['question']
                question.question_type = request.POST['question_type']
                question.save(update_fields=['question', 'question_type'])
                message = 'question is updated'
                return HttpResponseRedirect(reverse("index"))

            else:
                message = 'data is not valid'
        except Question.DoesNotExist:
            message = 'there is no category with such id'
    else:
        message = 'data is not valid'

    return HttpResponseRedirect(reverse("index"))



def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "djangoapp/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "djangoapp/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "djangoapp/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "djangoapp/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "djangoapp/register.html")
