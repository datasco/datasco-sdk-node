const fetch = require('node-fetch')

module.exports = (BASE_URL) => async ({ route, method, body, API_KEY }) => {
	const resp = await fetch(BASE_URL + route, {
		method: method,
		headers: {
			'Authorization': API_KEY,
			'Accept': 'application/json',
		  	'Content-Type': 'application/json'
		},
		body: body ? JSON.stringify(body) : null
	})

	const result = await resp.json()
	//console.log(result)

	return result
}