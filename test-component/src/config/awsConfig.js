import { CognitoUserPool } from "amazon-cognito-identity-js";

export const configure = (config) => {
	console.log("awsconfig", config);
	const userPool = new CognitoUserPool({
		...config,
	});
	console.log("user pool", userPool);
};
