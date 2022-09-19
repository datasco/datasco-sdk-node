const InfoController = require("./InfoController")
const GatherController = require("./GatherController")
const ExtractController = require("./ExtractController")
const SmartCollectController = require("./SmartCollectController")

const APIRequest = require("../utils/APIRequest")

module.exports = class APIController {
	constructor(options) {
		if(!options || typeof options !== 'object') {
			throw new Error('Failed to create APIController, options was not object')
		}
		if(!options.API_KEY) {
			throw new Error('Failed to create APIController, API_KEY not specified in options')
		}
		if(options.selfhosted && typeof options.selfhosted !== 'string') {
			throw new Error('Failed to create APIController, options.selfhosted value was not string')
		}

		this.API_KEY = options.API_KEY
		this.fetch = APIRequest(options.selfhosted ? options.selfhosted : 'http://api.datasco.ru/api')
	}

	get info() {
		return new InfoController(this.API_KEY, this.fetch)
	}

	get gather() {
		return new GatherController(this.API_KEY, this.fetch)
	}

	get extract() {
		return new ExtractController(this.API_KEY, this.fetch)
	}

	get smartcollect() {
		return new SmartCollectController(this.API_KEY, this.fetch)
	}
}