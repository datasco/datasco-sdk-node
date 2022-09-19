const { parse } = require('node-html-parser')

module.exports = class Page {
	#html = null
	#document = null

	constructor({  data, log, error }) {
		this.log = log
		this.error = error

		// Result is has HTML
		if(data) {
			this.#html = data
			this.#document = parse(data)
		}
	}

	get html() {
		return this.#html
	}
	get document() {
		return this.#document
	}

	get success() {
		return !this.error && this.#html
	}

	querySelector(selector) {
		if(!this.#document) {
			throw new Error('Failed to execute querySelector, page was not gathered')
		}
		if(typeof selector !== 'string') {
			throw new Error('Failed to execute querySelector, selector was not string')
		}

		return this.#document.querySelector(selector)
	}
	querySelectorAll(selector) {
		if(!this.#document) {
			throw new Error('Failed to execute querySelectorAll, page was not gathered')
		}
		if(typeof selector !== 'string') {
			throw new Error('Failed to execute querySelectorAll, selector was not string')
		}

		return this.#document.querySelectorAll(selector)
	}
}