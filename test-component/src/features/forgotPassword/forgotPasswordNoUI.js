import React, { useState } from "react";
import {
	CognitoUser,
	AuthenticationDetails,
	CognitoUserPool,
} from "amazon-cognito-identity-js";
import Singleton from "../../singleton/singleton";

export function DoormanForgotPasswordNoUI({ email, onSuccess, onFail }) {
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

		cognitoUser.forgotPassword({
			onSuccess: (data) => {
				onSuccess(data);
			},
			onFailure: (err) => {
				onFail(err);
			},
		});
	} catch (err) {
		console.error("err while code verifying", err);
		onFail(err);
	}
}
