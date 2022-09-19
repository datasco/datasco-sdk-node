module.exports = class Result {
	constructor(resp) {
		this.success = resp.success
		this.code = resp.code
		this.data = resp.data
		this.log = resp.log

		if(resp.message || resp.error) {
			this.error = resp.message ?? resp.error
		} 
	}
}