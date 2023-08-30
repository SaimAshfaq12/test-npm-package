import history from "./history";

export const redirectToUrl = (path, domainPrefix = "") => {
	window.location =
		window.location.protocol +
		"//" +
		(domainPrefix ? domainPrefix + "." : "") +
		K.Network.URL.Client.BaseHost +
		":" +
		K.Network.URL.Client.BasePort +
		path;
};

export const setFieldErrorsFromServer = (error, form, values = undefined) => {
	if (error.error === undefined) return;
	const errors = error.error.data.errors;
	if (typeof errors === "string" || errors instanceof String) {
		return;
	}
	let fieldErrors = [];
	for (let key in errors) {
		if (errors.hasOwnProperty(key)) {
			// let fieldError = errors[key].map((error) => {
			//     return error;
			// });
			fieldErrors.push({
				name: key,
				errors: errors[key],
				value: values && values[key] ? values[key] : undefined,
			});
		}
	}
	form.setFields(fieldErrors);
};

export const camelCaseKeys = (obj) =>
	Object.keys(obj).reduce(
		(ccObj, field) => ({
			...ccObj,
			[snakeToCamel(field)]: obj[field],
		}),
		{}
	);

export const deleteQueryParam = (key) => {
	const queryParams = new URLSearchParams(window.location.search);
	queryParams.delete(key);
	history.push({
		search: queryParams.toString(),
	});
};
