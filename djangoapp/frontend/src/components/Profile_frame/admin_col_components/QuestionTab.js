
import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import  QuestionsService  from  '../../routers/QuestionsService';
import  QuestionsList  from './questions_components/QuestionsList';
import  { QuestionForm }  from './questions_components/QuestionForm';


export const QuestionTab = () => {
  const questionService  =  new QuestionsService();

  questionService.getQuestions()
    .then(doc => console.log(doc, 'doc'))

  return (
    <div className="m-3" >
      <QuestionsList /> 
      <hr/>
      <QuestionForm />
    </div>
  )
};

