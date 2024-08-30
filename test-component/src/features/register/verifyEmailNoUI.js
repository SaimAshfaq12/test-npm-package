import React, { useState } from "react";
import {
	CognitoUser,
	AuthenticationDetails,
	CognitoUserPool,
} from "amazon-cognito-identity-js";
import Singleton from "../../singleton/singleton";

export function DoormanVerifyEmailNoUI({
	email,
	verificationCode,
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
			onFail("Verification Code is required");
			return;
		}
		const userPool = new CognitoUserPool({
			UserPoolId: instance?.configuration?.userPoolId,
			ClientId: instance?.configuration?.clientId,
		});

		const cognitoUser = new CognitoUser({
			Username: email,
			Pool: userPool,
		});
		cognitoUser.confirmRegistration(
			verificationCode,
			true,
			function (err, result) {
				if (err) {
					onFail(err);
					return;
				}
				onSuccess(result);
			}
		);
	} catch (err) {
		onFail(err);
	}
}
