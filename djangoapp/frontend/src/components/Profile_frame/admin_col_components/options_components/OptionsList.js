
import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import {useState, useEffect} from 'react';


export const OptionsList = ({current_options_list, delete_opt_func}) => {
  console.log(current_options_list, 'listList')

  return (
    <div className="m-3" > 
    <h3>Options list</h3>
      <ol>
        {
          current_options_list &&
          current_options_list.map((n,i) => (
            <li key={i}><span>{n}</span><button data-index={i} onClick={delete_opt_func}>Delete</button></li>
          ))
        }
      </ol>
 
    </div>
  )
};
