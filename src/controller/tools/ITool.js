module.exports = class ITool {
	get strategy() {
		throw new Error('Failed to use tool, tool supported strategy was not defined')
	}
	get step() {
		throw new Error('Failed to use tool, tool supported step was not defined')
	}
	get name() {
		throw new Error('Failed to use tool, tool name was not defined')
	}
	get raw() {
		throw new Error('Failed to use tool, tool raw content was not defined')
	}
}