const ITool = require('./ITool')

module.exports = class ProxyTool extends ITool {
	constructor(ip, port, username = null, password = null) {
		if(typeof ip !== 'string') {
			throw new Error('Failed to use ProxyTool: ip was not string')
		}
		if(typeof port !== 'number' || port < 1 || port > 9999) {
			throw new Error('Failed to use ProxyTool: port was not number or had invalid value')
		}

		super()
		this.ip = ip
		this.port = port
		this.username = username
		this.password = password
	}

	// Tool meta
	get strategy() {
		return ['request','bot']
	}
	get step() {
		return ['gather']
	}
	get name() {
		return 'proxy'
	}
	get raw() {
		let raw = {}

		// Proxy hostname
		raw.hostname = this.ip + ':' + this.port

		// Proxy credentials
		if(this.username && this.password) {
			raw.auth = {
				username: this.username, 
				password: this.password
			}
		}

		return raw
	}
}