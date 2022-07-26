export default class Request {
	async postData(url, data) {
		let formData;

		formData = new FormData(data);
	
		let responce = await fetch(url, {
			method : 'POST',
			body: formData
		});
	
		if (!responce.ok) {
			throw Error(responce.statusText);
		}
	
		return await responce.text();
	}
	
	async getResources(url) {
	
		let responce = await fetch(url);
	
		if (!responce.ok) {
			throw Error(responce.statusText);
		}
	
		return await responce.json();
	};
}