
import React from 'react';
import { Button, Carousel, Card, Image } from 'react-bootstrap';
import { Admin_col } from './Profile_frame/Admin_col';
import { First_col } from './Profile_frame/First_col';
import { Second_col } from './Profile_frame/Second_col';
import { Button_accord } from './Profile_frame/common_components/tab_system/Button_accord';
import { Tab_accord } from './Profile_frame/common_components/tab_system/Tab_accord';

export const Profile = ({ is_super, userid, username }) => {

  let first_col_content = <First_col />
  let second_col_content = <Second_col />
  let admin_col_content = <Admin_col />

  let getTabClass = (id_elem, is_super) => {
    let classN = 'col col-sm-12  m-4 p-2 frame ';
    if(is_super == 'true'){
      if(id_elem == 'first_col') classN += 'col-lg-3';
      if(id_elem == 'second_col') classN += 'col-lg-4';
      if(id_elem == 'admin_col') classN += 'col-lg-3';
    }else{
      classN = 'col-lg-6';
    }
    return classN;
  }

  return (

    <div>
      <div className="row buttons_block ">
          <Button_accord 
              tab_name="first_col"
              tabs_class_name=".frame"
              buttons_class_name=".main_button"
              buttons_all_classes="active mt-1 main_button col-sm-7 .main_button"
              button_name="First Col"
              variant="secondary" 
          />

          <Button_accord 
              tab_name="second_col"
              tabs_class_name=".frame"
              buttons_class_name=".main_button"
              buttons_all_classes="mt-1 main_button col-sm-7 .main_button"
              button_name="Second Col"
              variant="secondary" 
          />

    { is_super == 'true' && 
          <Button_accord 
              tab_name="admin_col"
              tabs_class_name=".frame"
              buttons_class_name=".main_button"
              buttons_all_classes="mt-1 main_button col-sm-7 .main_button"
              button_name="Admin Col"
              variant="secondary" 
          />
    }
    </div>

      <div className="row justify-content-md-center">

        <Tab_accord
            add_class='active' 
            content={first_col_content} 
            id_elem='first_col' 
            classTab={ getTabClass('first_col', is_super) }
            classTitle='tabName'
            title="First Col" 
        />

        <Tab_accord
            add_class='' 
            content={second_col_content} 
            id_elem='second_col' 
            classTab={ getTabClass('second_col', is_super) }
            classTitle='tabName'
            title="Second col" 
        />

    { is_super == 'true' && 

        <Tab_accord
            add_class='' 
            content={admin_col_content} 
            id_elem='admin_col' 
            classTab={ getTabClass('admin_col', is_super) }
            classTitle='tabName'
            title="Admin panel"
        /> 

    }
        
      </div>

    </div>
  )
};
