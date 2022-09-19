const ITool = require('./ITool')

module.exports = class ActionsTool extends ITool {
	constructor(actions) {
		if(!Array.isArray(actions) || !actions.every(action => action.type ? true : false)) {
			throw new Error('Failed to use ActionsTool: actions was not array of actions')
		}

		super()
		this.actions = actions
	}

	// Actions: mouse
	static mouseMove(X, Y) {
		return { type: 'mouse_move', x: X, y: Y }
	}
	static mouseClick(X, Y) {
		return { type: 'mouse_click', x: X, y: Y }
	}
	static mouseClick() {
		return { type: 'mouse_click' }
	}
	static mouseClickElement(query) {
		if(typeof query !== 'string') {
			throw new Error('Failed to create mouseClickElement action: query was not string')
		}

		return { type: 'mouse_click', el: query }
	}
	// Actions: keyboard
	static keyboardType(text) {
		if(typeof text !== 'string') {
			throw new Error('Failed to create keyboardType action: text was not string')
		}

		return { type: 'keyboard_type', text: text }
	}
	// Actions: eval
	static eval(fn) {
		if(typeof fn !== 'function') {
			throw new Error('Failed to create eval action: handler value was not function')
		}

		return { type: 'evaluate', code: fn.toString() }
	}

	// Tool meta
	get strategy() {
		return ['bot']
	}
	get step() {
		return ['gather']
	}
	get name() {
		return 'actions'
	}
	get raw() {
		return this.actions
	}
}