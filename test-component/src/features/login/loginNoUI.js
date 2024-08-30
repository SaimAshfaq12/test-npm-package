import {
	AuthenticationDetails,
	CognitoUser,
	CognitoUserPool,
} from "amazon-cognito-identity-js";
import Cookies from "js-cookie";
import Singleton from "../../singleton/singleton";
import { DoormanInitializeUserPermissions } from "../../permissions/initializeUserPermissions";
import K from "../../utilities/constants";
import { useState } from "react";

export function DoormanLoginNoUI({
	email,
	password,
	newPassword,
	onAuthSuccess,
	onAuthFail,
}) {
	const [isNewUser, setIsNewUser] = useState(false);

	try {
		if (!email) {
			onAuthFail("Email is required");
			return;
		}
		if (!password) {
			onAuthFail("Password is required");
			return;
		}
		if (isNewUser) {
			if (!newPassword) {
				onAuthFail(
					"New Password is required for completion of your account setup"
				);
				return;
			}
		}
		var instance = Singleton.getInstance();

		const userPool = new CognitoUserPool({
			UserPoolId: instance?.configuration?.userPoolId,
			ClientId: instance?.configuration?.clientId,
		});

		const cognitoUser = new CognitoUser({
			Username: email,
			Pool: userPool,
		});

		const authenticationDetails = new AuthenticationDetails({
			Username: email,
			Password: password,
		});

		return cognitoUser.authenticateUser(authenticationDetails, {
			onSuccess: async (authData) => {
				Cookies.set(K.Cookie.User, authData.getIdToken().getJwtToken(), {
					path: "/",
					domain: instance.configuration.cookieDomain,
					expires: K.Cookie.Expiry,
				});

				let permissions;
				await DoormanInitializeUserPermissions()
					.then((userPermissions) => {
						permissions = userPermissions;
					})
					.catch((error) => {
						onAuthFail(error);
						return;
					});

				onAuthSuccess(authData, permissions);
			},
			onFailure: (err) => {
				onAuthFail(err);
			},
			newPasswordRequired: (userAttributes, requiredAttributes) => {
				setIsNewUser(true);
				delete userAttributes.email_verified;
				cognitoUser.completeNewPasswordChallenge(
					newPassword,
					{},
					{
						onSuccess: (session) => {
							// Handle success after setting a new password
							setIsNewUser(false);
							onAuthSuccess("Password changed successfully");
						},
						onFailure: (err) => {
							// Handle failure to change password
							onAuthFail(err);
						},
					}
				);
			},
		});
	} catch (err) {
		onAuthFail(err);
		return;
	}
}
