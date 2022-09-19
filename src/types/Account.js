module.exports = class Account {
	constructor({ user, stats, limit, origins_allowed }) {
		this.id = user.id
		this.email = user.email

		this.stats = stats
		this.limit = limit
		this.origins_allowed = origins_allowed
	}

	canGather() {
		return this.stats.gather <= this.limit.gather
	}
	canExtract() {
		return this.stats.extract <= this.limit.extract
	}
	canSmartcollect() {
		return this.stats.smart_collect <= this.limit.smart_collect
	}
}