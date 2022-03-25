import React, { useState } from 'react';
import { Profile } from './Profile';
import { Context } from "./Context.js";


export default function App() {

  /*
  constructor() {
    super();
    this.state = {
      //is_super: document.querySelector('#user_info').dataset.is_super.toLowerCase() || true,
      is_super: "true",
      //userid: document.querySelector('#user_info').dataset.userid || 0,
      userid: 0,
      //username: document.querySelector('#user_info').dataset.username || 'zm412',
      username: 'zm412',
    };
  }
   
   */
  const [is_super, setIsSuper] = useState("true");
  const [userid, setUserid] = useState(0);
  const [username, setUsername] = useState("zm412");
  const [context, setContext] = useState(null);


    return (

    <div className="App-header">
      <Context.Provider value={[context, setContext]}>
        <Profile 
          is_super={is_super} 
          userid={userid} 
          username={username} 
        />
      </Context.Provider>
    </div>
          
    );
}

