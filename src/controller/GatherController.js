const Page = require("../types/Page")
const ITool = require("./tools/ITool")

module.exports = class GatherController {
	constructor(API_KEY, fetch) {
		this.API_KEY = API_KEY
		this.fetch = fetch
	}

	async byRequest(url, options) {
		return this.#gather(url, 'request', options)
	}
	async byBot(url, options) {
		return this.#gather(url, 'bot', options)
	}

	async #gather(url, strategy, options) {
		let { cache, tools } = options ?? { cache: null, tools: null }

		if(typeof url !== 'string' && !Array.isArray(url)) {
			throw new Error(`Failed to gather by ${strategy}, url was not string or array of strings`)
		}
		if(typeof strategy !== 'string' || !['request','bot'].includes(strategy)) {
			throw new Error(`Failed to gather, invalid strategy (${strategy})`)
		}
		if(cache && typeof cache !== 'string') {
			throw new Error(`Failed to gather by ${strategy}, cache value was not string`)
		}
		if(tools && (!Array.isArray(tools) || !tools.every(tool => tool instanceof ITool))) {
			throw new Error(`Failed to gather by ${strategy}, tools was not array of tools`)
		}

		// Tools
		let _tools = undefined
		if(tools) {
			_tools = {}
			for(let tool of tools) {
				let { strategy: toolStrategy, step: toolStep, name: toolName, raw: toolRaw } = tool

				// Check strategy
				if(!toolStrategy.includes(strategy)) {
					throw new Error(`Failed to gather, tool "${toolName}" is not supports gather by ${strategy}`)
				}
				// Check step
				if(!toolStep.includes('gather')) {
					throw new Error(`Failed to gather, tool "${toolName}" is not for gather step`)
				}

				_tools[toolName] = toolRaw
			}
		}

		let result = await this.fetch({
			route: '/gather',
			method: 'POST',
			body: {
				url: url,
				strategy: strategy,
				tools: _tools
			},
			API_KEY: this.API_KEY
		})

		let pages = {}
		// One URL (String)
		if(typeof url === 'string') {
			pages = new Page(result)
		}
		// Multiple URLs (String)
		else {
			// Walk every url
			for (let index = 0; index < url.length; index++) {
				pages[url[index]] = new Page(result[index])
			}
		}

		return pages
	}
}