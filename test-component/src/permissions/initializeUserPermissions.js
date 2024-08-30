import axios from "axios";
import { CognitoUserPool } from "amazon-cognito-identity-js";
import Singleton from "../singleton/singleton";

export const DoormanInitializeUserPermissions = async () => {
	var instance = Singleton.getInstance();

	const userPool = new CognitoUserPool({
		UserPoolId: instance?.configuration?.userPoolId,
		ClientId: instance?.configuration?.clientId,
	});

	const cognitoUser = userPool.getCurrentUser();

	let idToken;

	cognitoUser?.getSession(function (err, session) {
		if (err) {
			console.error("Error getting session: ", err);
			return;
		}
		idToken = session?.idToken?.jwtToken;
	});

	let response;

	if (idToken) {
		await axios
			.get(
				`${instance?.configuration?.apiGatewayUrl}/user/public/permissions`,
				{
					headers: {
						Authorization: `Bearer ${idToken}`,
					},
				}
			)
			.then((res) => {
				response = res;
			})
			.catch((err) => {
				console.error("Error: ", err);
			});
	}

	const flatPermissions = response?.data?.role?.flatMap(
		(role) => role.permission
	);

	const permissions = Array.from(new Set(flatPermissions));

	instance.configuration.userPermissions = permissions;

	return permissions;
};
