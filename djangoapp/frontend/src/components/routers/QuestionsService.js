
import { fetchDataPost, fetchDataGet, fetchFormdataPost } from '../collection_func'

export default class QuestionsService{
	
	constructor(){}
	
	getQuestions() {
		const url = `api/questions/`;
		return fetchDataGet(url);
	}  

	getQuestionsByURL(link){
		const url = `${link}`;
		//return axios.get(url).then(response => response.data);
		return fetchDataGet(url);
	}
	getQuestion(pk) {
		const url = `api/questions/${pk}`;
		return fetchDataGet(url);
	}
	deleteQuestion(customer){
		const url = `${API_URL}/api/questions/${question.pk}`;
		return axios.delete(url);
	}
	createQuestion(formdata){
		const url = `api/questions/`;
		return fetchFormdataPost(url, formdata);
	}
	updateQuestion(customer){
		const url = `api/questions/${question.pk}`;
		return axios.put(url,customer);
	}
}
