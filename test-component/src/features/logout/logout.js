import { CognitoUserPool } from "amazon-cognito-identity-js";
import Cookies from "js-cookie";
import Singleton from "../../singleton/singleton";
import K from "../../utilities/constants";

export const DoormanLogout = async () => {
	var instance = Singleton.getInstance();

	const userPool = new CognitoUserPool({
		UserPoolId: instance?.configuration?.userPoolId,
		ClientId: instance?.configuration?.clientId,
	});

	const cognitoUser = userPool.getCurrentUser();

	if (cognitoUser) {
		cognitoUser.signOut(() => {
			console.log("User signed out successfully");
		});
		// Cookies.remove(K.Cookie.User);
		Cookies.remove(K.Cookie.User, {
			path: "/",
			domain: instance?.configuration?.cookieDomain,
		});
		return "User signed out successfully";
	} else {
		return "No user is currently signed in";
		// onSuccess("No user is currently signed in");
	}
};
