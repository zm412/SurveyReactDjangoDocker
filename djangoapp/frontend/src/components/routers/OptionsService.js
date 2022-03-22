
import { fetchDataPost, fetchDataGet, fetchFormdataPost } from '../collection_func'

export default class OptionsService{
	
	constructor(){}
	
	getOptions() {
		const url = `api/options/`;
		return fetchDataGet(url);
	}  

	getOptionsByURL(link){
		const url = `${link}`;
		//return axios.get(url).then(response => response.data);
		return fetchDataGet(url);
	}
	getOption(pk) {
		const url = `api/options/${pk}`;
		return fetchDataGet(url);
	}
	deleteOption(customer){
		const url = `${API_URL}/api/options/${option.pk}`;
		return axios.delete(url);
	}
	createOption(formdata){
		const url = `api/options/`;
		return fetchFormdataPost(url, formdata);
	}
	updateOption(customer){
		const url = `api/options/${option.pk}`;
		return axios.put(url,customer);
	}
}
