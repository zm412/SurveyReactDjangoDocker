
import React, { Component} from 'react';
import { Button } from 'react-bootstrap';
import  OptionsService  from  '../../../routers/OptionsService';
import  { OptionsList }  from  './OptionsList';
import {useState, useEffect, useContext} from 'react';
import { Context } from "../../../Context";



const optionsService = new OptionsService();

export const Options_mini_form = () => {

  const [allOptions, setAllOptions] = useState([]);
  const [currOption, setCurrOption] = useState('');
  const [currOptionList, setCurrOptionList] = useState([]);
  const [context, setContext] = useContext(Context);
  console.log(context, 'context2')

  React.useEffect(() => {
    optionsService.getOptions().then(result => { setAllOptions(result.data) });
  }, []);

  const handlerSubmit = (event) => {
    cleanUl();
    event.preventDefault();
    if(currOption != ''){
      setCurrOptionList(currOptionList.concat(currOption));
      context.optionsList = currOptionList.concat(currOption);
      setContext(context)
      setCurrOption('');
  console.log(context, 'context3')
  console.log(currOptionList, 'currlist')
    }
  }

  const addLiValueInInput = (event) => {
    let li = event.target.closest("li");
    setCurrOption(li.innerHTML);
    cleanUl();
  }

  const cleanUl = (e) => {
    let ul = document.querySelector('#variants_list');
    ul.innerHTML = '';
  }

  const getFilteredList = (arr) => {
    let ul = document.querySelector('#variants_list');
    ul.addEventListener("click", addLiValueInInput);
    arr.forEach(elem =>{
      if (elem.toLowerCase().startsWith(currOption.toLowerCase()) && currOption != ''){
        ul.insertAdjacentHTML('beforeend', `<li>${elem}</li>`)
      }else{
        ul.innerHTML = '';
      }
    }
    );
  }

  React.useEffect(() => {
    getFilteredList(allOptions)
  }, [currOption]);


  const handlerInput = (e) => {
    setCurrOption(e.target.value);
    cleanUl();
  }

  const handlerRemoveOpt = (e) => {
    let indexD = e.target.dataset.index;
    setCurrOptionList(currOptionList.filter((n, i) => i != indexD));
  }


  return (
    <div className="m-3" > 

      <div>
        <OptionsList 
          current_options_list={currOptionList} 
          delete_opt_func={handlerRemoveOpt} 
        />
      </div>
    
      <div >
        <input type="text" name="new_opt"  onChange={handlerInput} value={currOption} placeholder='Option'/>
        <input type="submit" onClick={handlerSubmit} value="Add options" />
      </div>
    
      <div>
        <ul id="variants_list"></ul>
      </div>

    </div>
  )
};

