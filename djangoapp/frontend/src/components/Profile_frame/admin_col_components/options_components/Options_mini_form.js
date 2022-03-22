
import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import  OptionsService  from  '../../../routers/OptionsService';
import  { OptionsList }  from  './OptionsList';
import {useState, useEffect} from 'react';

const optionsService = new OptionsService();

export const Options_mini_form = () => {

  const [allOptions, setAllOptions] = React.useState([]);
  const [currOption, setCurrOption] = React.useState('');
  const [currOptionList, setCurrOptionList] = React.useState([]);

  React.useEffect(() => {
    optionsService.getOptions().then(result => { setAllOptions(result.data) });
  }, []);
    console.log(allOptions, 'allOpt')


  console.log(currOptionList, 'list')
  console.log(currOption, 'currOption')

  const handlerSubmit = (event) => {
    cleanUl();
    event.preventDefault();
    console.log(currOption, 'currOpt')
    setCurrOptionList(currOptionList.concat(currOption));
    setCurrOption('');
    console.log(currOptionList, 'tempList')
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
    cleanUl()
  }

  const handlerRemoveOpt = (e) => {
    indexD = e.target.dataset.index;
    setCurrOptionList(currOptionList.splice(indexD, 1));
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

