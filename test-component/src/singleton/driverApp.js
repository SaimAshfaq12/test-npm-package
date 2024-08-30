module.exports.DriverApp = class DriverApp {
	constructor() {
		this._configuration;
	}

	set configuration(value) {
		this._configuration = value;
	}

	get configuration() {
		return this._configuration;
	}
};
