
import React, { Component, useContext } from 'react';
import { Button } from 'react-bootstrap';
import  QuestionsList  from './questions_components/QuestionsList';
import  { QuestionForm }  from './questions_components/QuestionForm';
import { Context } from "../../Context";


export const QuestionTab = () => {
  const [context, setContext] = useContext(Context);


  console.log(context, 'context')

  return (
    <div className="m-3" >
      <QuestionsList /> 
      <hr/>
      <QuestionForm />
    </div>
  )
};

