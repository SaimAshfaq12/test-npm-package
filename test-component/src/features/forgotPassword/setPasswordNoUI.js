import { CognitoUser, CognitoUserPool } from "amazon-cognito-identity-js";
import Singleton from "../../singleton/singleton";

export function DoormanSetPasswordNoUI({
	email,
	verificationCode,
	password,
	onSuccess,
	onFail,
}) {
	var instance = Singleton.getInstance();

	try {
		if (!email) {
			onFail("Email is required");
			return;
		}
		if (!verificationCode) {
			onFail("Verification code is required");
			return;
		}
		if (!password) {
			onFail("Password is required");
		}
		const userPool = new CognitoUserPool({
			UserPoolId: instance?.configuration?.userPoolId,
			ClientId: instance?.configuration?.clientId,
		});

		const cognitoUser = new CognitoUser({
			Username: email,
			Pool: userPool,
		});
		cognitoUser.confirmPassword(verificationCode, password, {
			onSuccess: () => {
				onSuccess("Your password has been updated successfully!");
			},
			onFailure: (err) => {
				onFail(err);
			},
		});
	} catch (err) {
		onFail(err);
	}
}
