import  React, { Component } from  'react';
import  QuestionsService  from  '../../../routers/QuestionsService';

const questionsService = new QuestionsService();

class QuestionsList extends Component {

  constructor(props) {
    super(props);
    this.state  = {
      questions: [],
      nextPageURL:  ''
    };
    this.nextPage  =  this.nextPage.bind(this);
    this.handleDelete  =  this.handleDelete.bind(this);
  }

componentDidMount() {
	var  self  =  this;
	questionsService.getQuestions().then(function (result) {
		console.log(result);
		self.setState({ questions:  result.data, nextPageURL:  result.nextlink})
	});
}

handleDelete(e,pk){
	var  self  =  this;
	questionsService.deleteQuestion({pk :  pk}).then(()=>{
		var newArr  =  self.state.questions.filter(function(obj) {
			return  obj.pk  !==  pk;
		});
		
		self.setState({questions:  newArr})
	});
}

nextPage(){
	var  self  =  this;
	console.log(this.state.nextPageURL);		
	questionsService.getQuestionsByURL(this.state.nextPageURL).then((result) => {
		self.setState({ questions:  result.data, nextPageURL:  result.nextlink})
	});
}
render() {

	return (
		<div  className="questions--list">
      <h3>Questions list</h3>
			<table  className="table">
			<thead  key="thead">
			<tr>
				<th>#</th>
				<th>User</th>
				<th>Question</th>
				<th>Question type</th>
			</tr>
			</thead>
			<tbody>
			{this.state.questions.map( c  =>
				<tr  key={c.pk}>
				<td>{c.pk}  </td>
				<td>{c.user}</td>
				<td>{c.question}</td>
				<td>{c.question_type}</td>
				<td>
				<button  onClick={(e)=>  this.handleDelete(e,c.pk) }> Delete</button>
				<a  href={"/question/" + c.pk}> Update</a>
				</td>
			</tr>)}
			</tbody>
			</table>
			<button  className="btn btn-primary"  onClick=  {  this.nextPage  }>Next</button>
		</div>
		);
  }
}

export  default  QuestionsList;
