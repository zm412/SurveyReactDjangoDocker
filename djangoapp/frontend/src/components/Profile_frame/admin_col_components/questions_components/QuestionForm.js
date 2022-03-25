
import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import  QuestionsService  from  '../../../routers/QuestionsService';
import  { Options_mini_form }  from  '../options_components/Options_mini_form';
import {useState, useEffect, useContext} from 'react';
import { Context } from "../../../Context";

const questionsService = new QuestionsService();

export const QuestionForm = () => {

  const [questionText, setQuestion] = useState('');
  const [questType, setQuestType] = useState('single_choice');
  const [optionsList, setOptionsList] = useState([]);

  const [context, setContext] = useContext(Context);
  console.log(context, 'context0')

  const handlerSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    formData.append('optionsList', context.optionsList)
    console.log(formData, 'formData')

    questionsService.createQuestion(formData).then(result => { 
      console.log(result, 'result');
    });
  }

  let handleChange = (e) => { 
    const elem = Array.from(event.target.options).find(el => el.selected)
    setQuestType(e.target.value)
  }



  return (
    <div className="m-3" > 
      <h3>Add new question</h3>
        <form onSubmit={handlerSubmit}>
        <input type="text" name="question"  onChange={(e)=>setQuestion(e.target.value)} value={questionText} placeholder='Question'/>
          <select id="" name="question_type">
            <option value="empty"></option>
            <option value="single_choice">Single choice</option>
            <option value="multiple_choice">Multiple choice</option>
            <option value="text_answ">Text answer</option>
          </select><br/>
        <Options_mini_form optionsList={optionsList} />
       <input type="submit" />
      </form>
    </div>
  )
};

