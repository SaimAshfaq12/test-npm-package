import React, { useState } from "react";
import { CognitoUserPool } from "amazon-cognito-identity-js";
import Singleton from "../../singleton/singleton";

export function DoormanChangePasswordNoUI({
	oldPassword,
	newPassword,
	onSuccess,
	onFail,
}) {
	var instance = Singleton.getInstance();

	try {
		if (!oldPassword) {
			onFail("Old password is required");
		}
		if (!newPassword) {
			onFail("New password is required");
		}

		const userPool = new CognitoUserPool({
			UserPoolId: instance?.configuration?.userPoolId,
			ClientId: instance?.configuration?.clientId,
		});

		const cognitoUser = userPool.getCurrentUser();

		cognitoUser.getSession(function (err, session) {
			if (err) {
				onFail(err);
				return;
			}
			cognitoUser.changePassword(
				oldPassword,
				newPassword,
				function (err, result) {
					if (err) {
						onFail(err);
						return;
					}
					onSuccess({ result, message: "Password changed successfully!" });
				}
			);
		});
	} catch (err) {
		console.error("errr while changing password", err);
	}
}
