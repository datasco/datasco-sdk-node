const DataCategory = require("../types/DataCategory")
const Page = require("../types/Page")
const ITool = require("./tools/ITool")

module.exports = class ExtractController {
	constructor(API_KEY, fetch) {
		this.API_KEY = API_KEY
		this.fetch = fetch
	}

	async extractData(page, data, options) {
		let { tools } = options ?? { tools: null }
		let availableDataCategories = Object.values(DataCategory)

		if(!page instanceof Page) {
			throw new Error(`Failed to extract data, page was not Page instance`)
		}
		if(!Array.isArray(data) || !data.every(dataCategory => (typeof dataCategory === 'string' && availableDataCategories.includes(dataCategory)) || typeof dataCategory === 'object')) {
			throw new Error(`Failed to extract data, extracted data categories was not array of DataCategory/DataStructure`)
		}
		if(tools && (!Array.isArray(tools) || !tools.every(tool => tool instanceof ITool))) {
			throw new Error(`Failed to extract data, tools was not array of tools`)
		}

		// Tools
		let _tools = undefined
		if(tools) {
			_tools = {}
			for(let tool of tools) {
				let { step: toolStep, name: toolName, raw: toolRaw } = tool

				// Check step
				if(!toolStep.includes('gather')) {
					throw new Error(`Failed to extract, tool "${toolName}" is not for extract step`)
				}

				_tools[toolName] = toolRaw
			}
		}

		let result = await this.fetch({
			route: '/extract',
			method: 'POST',
			body: {
				data: data,
				tools: _tools,
				html: page.html
			},
			API_KEY: this.API_KEY
		})

		return result.data
	}

	// Data categories
}