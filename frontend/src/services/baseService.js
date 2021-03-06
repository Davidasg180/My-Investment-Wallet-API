export default class BaseService {
	constructor() {
		this.baseUrl = window.location.protocol + "//" + window.location.host + "/api/";
		this.url = {
			version : 'alpha/',
			route : '',
		}
	}

	find( id ) {
		console.log(id)
		const path = this.url.version + this.url.route + ( id ? `${id}/` : "" ) + ( this.url.subRoute ? `${this.url.subRoute}` : "" )
		var url = new URL(path, this.baseUrl);
		// if (params) Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

		var requestOptions = {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + localStorage.getItem('token')
			}
		};

		return fetch(url, requestOptions)
			.then(this.handleResponse)
			.then(response => { return response; })
			.catch(error => { console.log(error); throw error; });
	}

	/**
	 * GET /process/:id
	 * */
	/**
	 * POST /process
	 * */
	create() { }
	/**
	 * PATCH /process/:id
	 * */
	updateById() {

	}
	/**
	 * DELETE /process/:id
	 * */
	destroyById() { }

	/**
	 * POST /process/update/:processId/state/:stateId
	 * */

	handleResponse(response) {
		console.log(response)
		if (400 <= response.status) return Promise.reject(response.statusText);

		return response.text().then(text => {
			if (text === 'Unauthorized') return;
			const data = text && JSON.parse(text);
			if (!response.ok) {
				if (response.status === 401) {
					// auto logout if 401 response returned from api
					window.location.reload(true);
				}
				const error = (data && data.message) || response.statusText;
				return Promise.reject(error);
			}
			return data;
		});
	}
}