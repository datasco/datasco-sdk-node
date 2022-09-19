const { API, DataCategory } = require("../src");

(async() => {
	// Setup API
	const api = new API({
		selfhosted: 'http://localhost:80/api',
		API_KEY: 'c8e61c46-8919-4412-9420-7'
	})

	// Page
	let page = await api.gather.byRequest('https://proxymal.ru/contacts')
	if(page.success) {
		let data = await api.extract.extractData(page, [
			DataCategory.Email,
			DataCategory.Phone,
			DataCategory.MediaURL
		])
		console.log(data)
	}
	else {
		console.error(page.error)
	}
})()