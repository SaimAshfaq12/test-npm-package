import React, { useState } from "react";
import { CognitoUser, CognitoUserPool } from "amazon-cognito-identity-js";
import Singleton from "../../singleton/singleton";

export function DoormanResendCodeNoUI({ email, onSuccess, onFail }) {
	var instance = Singleton.getInstance();
	try {
		if (!email) {
			onFail("Email is required");
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
		cognitoUser.resendConfirmationCode(function (err, result) {
			if (err) {
				onFail(err);
				return;
			}
			onSuccess({ result, message: "Code resent successfully" });
		});
	} catch (err) {
		onFail(err);
	}
}
