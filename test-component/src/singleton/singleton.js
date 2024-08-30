const { DriverApp } = require("./driverApp");

const Singleton = (function () {
	var instance;

	function createInstance() {
		var classObj = new DriverApp();
		return classObj;
	}

	return {
		getInstance: function () {
			if (!instance) {
				instance = createInstance();
			}
			return instance;
		},
	};
})();

module.exports = Singleton;
