const Account = require("../types/Account")

module.exports = class InfoController {
	constructor(API_KEY, fetch) {
		this.API_KEY = API_KEY
		this.fetch = fetch
	}

	async getAccount() {
		let result = await this.fetch({
			route: '/info',
			method: 'POST',
			API_KEY: this.API_KEY
		})

		return new Account(result)
	}
}