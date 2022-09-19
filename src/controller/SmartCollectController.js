const DataCategory = require("../types/DataCategory")
const ITool = require("./tools/ITool")

module.exports = class SmartCollectController {
	constructor(API_KEY, fetch) {
		this.API_KEY = API_KEY
		this.fetch = fetch
	}

	async collect(source, data, options) {
		let availableDataCategories = Object.values(DataCategory)
		let { cache, tools: { gatherTools: gather, extractTools: extract } } = options ?? { cache: null, tools: { gather: null, extract: null } }

		if(typeof source !== 'string' && !Array.isArray(source)) {
			throw new Error(`Failed to collect, source was not string or array of strings`)
		}
		if(cache && typeof cache !== 'string') {
			throw new Error(`Failed to collect, cache value was not string`)
		}
		if(!Array.isArray(data) || !data.every(dataCategory => (typeof dataCategory === 'string' && availableDataCategories.includes(dataCategory)) || typeof dataCategory === 'object')) {
			throw new Error(`Failed to collect, extracted data categories was not array of DataCategory/DataStructure`)
		}
		if(tools && (!Array.isArray(tools) || !tools.every(tool => tool instanceof ITool))) {
			throw new Error(`Failed to collect, tools was not array of tools`)
		}

		// Tools
		let gatherTools = undefined
		let extractTools = undefined
		if(tools) {
			gatherTools = {}
			extractTools = {}
			for(let tool of tools) {
				let { strategy: toolStrategy, step: toolStep, name: toolName, raw: toolRaw } = tool

				// Check strategy
				if(!toolStrategy.includes(strategy)) {
					throw new Error(`Failed to gather, tool "${toolName}" is not supports gather by ${strategy}`)
				}

				// Gather tool
				if(toolStep.includes('gather')) {
					gatherTools[toolName] = toolRaw
				}
				// Gather tool
				if(toolStep.includes('extract')) {
					extractTools[toolName] = toolRaw
				}
			}
		}

		let result = await this.fetch({
			route: '/gather',
			method: 'POST',
			body: {
				url: url,
				strategy: strategy,
				data: data,
				tools: {
					gather: gatherTools,
					extract: extractTools
				}
			},
			API_KEY: this.API_KEY
		})

		return result
	}
}