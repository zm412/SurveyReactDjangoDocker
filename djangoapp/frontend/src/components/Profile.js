
import React, {useState, useEffect} from 'react';
import { Button, Carousel, Card, Image } from 'react-bootstrap';
import { Admin_col } from './Profile_frame/Admin_col';
import { First_col } from './Profile_frame/First_col';
import { Second_col } from './Profile_frame/Second_col';
import { Button_accord } from './Profile_frame/common_components/tab_system/Button_accord';
import { Tab_accord } from './Profile_frame/common_components/tab_system/Tab_accord';
import  QuestionsService  from  './routers/QuestionsService';
import { Context } from "./Context.js";

export const Profile = ({ is_super, userid, username }) => {

  const questionsService = new QuestionsService();
  const [context, setContext] = React.useContext(Context);

  let first_col_content = <First_col />
  let second_col_content = <Second_col />
  let admin_col_content = <Admin_col />


  React.useEffect(() => {
    questionsService.getQuestions().then(result => setContext(result));
  }, []);

 	      
  let objButtonsArgs = [{
    tab_name:"first_col",
    buttons_all_classes:"active",
    button_name:"First Col",
  },{
    tab_name:"second_col",
    buttons_all_classes:"",
    button_name:"Second Col",
  },{
    tab_name:"admin_col",
    buttons_all_classes: is_super !== 'true' ? 'hidden_block' : '',
    button_name:"Admin Col",
  }];
 
  let objTabsArgs = [{
      add_class: 'active ' + is_super ? 'col-lg-3' : 'col-lg-6',
      content: first_col_content,
      id_elem: 'first_col',
      title:"First Col"
    },{
      add_class: is_super ? 'col-lg-4' : 'col-lg-6',
      content: second_col_content,
      id_elem: 'second_col',
      title:"Second Col"
    },{
      add_class: is_super ? 'col-lg-3' : 'hidden_block',
      content: admin_col_content,
      id_elem: 'admin_col',
      title:"Admin Col"
    }];
   

  return (

    <div>
      <div className="row buttons_block ">
            {
              objButtonsArgs.map((n, i) => 
                <Button_accord 
                    key={i}
                    tab_name={n.tab_name}
                    tabs_class_name=".frame"
                    buttons_class_name=".main_button"
                    buttons_all_classes={ `mt-1 main_button col-sm-7 ${n.buttons_all_classes}` }
                    button_name={n.button_name}
                    variant="secondary" 
                />
              )
            }
    </div>

    <div className="row justify-content-md-center">
            {
              objTabsArgs.map((n, i) =>
                  <Tab_accord
                    key={i}
                    add_class={n.add_class} 
                    content={n.content} 
                    id_elem={n.id_elem} 
                    classTab='col col-sm-12  m-4 p-2 frame '
                    classTitle='tabName'
                    title={n.title}
                />
              )
            }
      </div>
    </div>
  )
};
