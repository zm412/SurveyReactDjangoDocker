
async function fetchFormdataPost(url, formdata){  
  const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
  try{
    let response = await fetch(url, {
      method: 'POST',
      headers: { 
        'X-CSRFToken': csrftoken,
      },
      body: formdata 
    });
    return await response.json();
  } catch(e){
    console.error(e);
  }
}

async function fetchDataPost(url, obj){  
  const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
  try{
    let response = await fetch(url, {
      method: 'POST',
      headers: { 
        'X-CSRFToken': csrftoken,
        "Content-type": "application/json"
      },
      body: JSON.stringify(obj) 
    });
    return await response.json();
  } catch(e){
    console.error(e);
  }
}

async function fetchDataGet(url) {
  let answer;
  await fetch(url)
    .then(response=> response.json())
    .then(data => { 
      console.log(data, 'data')
      answer = data 
    })
  return answer;
};

export {fetchDataPost, fetchDataGet, fetchFormdataPost};
