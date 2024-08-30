import React, { useState } from "react";
import { DoormanLoginNoUI } from "@code_district/doorman";

function ExternalAppLoginComponent() {
	console.log("External APP Login");
	const [loginSuccess, setLoginSuccess] = useState(false);
	const [loginError, setLoginError] = useState("");

	const onLoginSuccess = async (tokens, permissions) => {
		console.log("Tokens", tokens);

		console.log("Permissions from onAuthSuccess", permissions);

		// new Promise((resolve, reject) => {
		// 	DoormanInitializeUserPermissions()
		// 		.then((userPermissions) => {
		// 			// Resolve the promise with the userPermissions data
		// 			console.log("user permissions", userPermissions);
		// 			resolve(userPermissions);
		// 		})
		// 		.catch((error) => {
		// 			// Reject the promise with the error
		// 			reject(error);
		// 		});
		// });
		// alert("User logged in successfully");
		// const body = {};
		// // const idToken = val?.idToken?.jwtToken;
		// console.log("Val", val);
		// const idToken = Cookies.get("doorman_user");
		// console.log("ID token", idToken);
		// await axios
		// 	.post(
		// 		"https://uv71v862e8.execute-api.us-east-1.amazonaws.com/dev-08-01/auth/signin",
		// 		body,
		// 		{
		// 			headers: {
		// 				Authorization: `Bearer ${idToken}`,
		// 			},
		// 		}
		// 	)
		// 	.then((res) => {
		// 		console.log("res", res.data.message);
		// 		alert(res.data.message);
		// 	})
		// 	.catch((err) => {
		// 		console.log("errr", err);
		// 	});
		// console.log("Driver Success: ", val);
	};

	const onLoginFail = (err) => {
		console.error("Driver Fail: ", err);
		// alert(err);
	};

	const handleLogin = (email, password, newPassword) => {
		// Call DoormanLoginNoUI with the necessary parameters and receive the callback functions
		const { onAuthSuccess, onAuthFail } = DoormanLoginNoUI(
			email,
			password,
			newPassword
		);

		// Define the onAuthSuccess callback function
		onAuthSuccess((authData, permissions) => {
			// Handle successful login here
			setLoginSuccess(true);
			console.log("Login successful:", authData, permissions);
		});

		// Define the onAuthFail callback function
		onAuthFail((error) => {
			// Handle login failure here
			setLoginError(error);
			console.error("Login failed:", error);
		});
	};

	return (
		<div>
			{/* Your login form and input fields */}
			<input type="text" placeholder="Email" />
			<input type="password" placeholder="Password" />
			<button
				onClick={() =>
					handleLogin("user@email.com", "password123", "newPassword123")
				}
			>
				Login
			</button>

			{/* Display success or error messages if login attempt has been made */}
			{loginSuccess && <p>Login successful!</p>}
			{loginError && <p>Login failed: {loginError}</p>}
		</div>
	);
}

export default ExternalAppLoginComponent;
