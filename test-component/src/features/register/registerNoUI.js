import React, { useState } from "react";
import {
	CognitoUserAttribute,
	CognitoUserPool,
} from "amazon-cognito-identity-js";
import Singleton from "../../singleton/singleton";

export function DoormanSignupNoUI({ email, password, onSuccess, onFail }) {
	var instance = Singleton.getInstance();

	try {
		if (!email) {
			onFail("Email is required");
			return;
		}
		if (!password) {
			onFail("Password is required");
			return;
		}

		const userPool = new CognitoUserPool({
			UserPoolId: instance?.configuration?.userPoolId,
			ClientId: instance?.configuration?.clientId,
		});

		const attributeList = [
			new CognitoUserAttribute({
				Name: "email",
				Value: email,
			}),
		];

		userPool.signUp(email, password, attributeList, null, (err, result) => {
			if (err) {
				onFail(err);
				return;
			}
			onSuccess({
				message: "Email verification code sent to your email!",
				result,
			});
		});
	} catch (err) {
		onFail(err);
	}
}
