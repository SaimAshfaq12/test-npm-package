// import logo from "./logo.svg";
import React, { useState, useRef } from "react";
import "./App.css";
import Cookies from "js-cookie";
import axios from "axios";
import {
	DoormanConfigure,
	DoormanLogin,
	DoormanLoginNoUI,
	DoormanSignup,
	DoormanSignupNoUI,
	DoormanVerifyEmail,
	DoormanVerifyEmailNoUI,
	DoormanChangePassword,
	DoormanChangePasswordNoUI,
	DoormanForgotPassword,
	DoormanForgotPasswordNoUI,
	DoormanSetPassword,
	DoormanSetPasswordNoUI,
	DoormanLogout,
	DoormanResendCodeNoUI,
	DoormanUserHasAllPermissions,
	// hasAnyPermission,
	// DoormanCheckPermission,
	DoormanUserHasAnyPermission,
} from "test-component";
import Products from "./components/products/products";
import ExternalAppLoginComponent from "./components/login/externalAppLogin";
// import {
// 	DoormanConfigure,
// 	DoormanLogin,
// 	DoormanLoginNoUI,
// 	DoormanSignup,
// 	DoormanSignupNoUI,
// 	DoormanVerifyEmail,
// 	DoormanVerifyEmailNoUI,
// 	DoormanChangePassword,
// 	DoormanChangePasswordNoUI,
// 	DoormanForgotPassword,
// 	DoormanForgotPasswordNoUI,
// 	DoormanSetPassword,
// 	DoormanSetPasswordNoUI,
// 	DoormanResendCodeNoUI,
// 	DoormanLogout,
// 	DoormanUserHasAllPermissions,
// 	hasAnyPermission,
// 	DoormanCheckPermission,
// 	DoormanUserHasAnyPermission,
// } from "@code_district/doorman";

let config = {
	userPoolId: "us-east-1_mdk8mFWNv",
	clientId: "1liau61478ov95tcd3p3u9j3kt",
	cookieDomain: "localhost",
	apiGatewayUrl:
		"https://uv71v862e8.execute-api.us-east-1.amazonaws.com/dev-08-01",
	style: {
		// inputStyle: {
		// 	backgroundColor: "white",
		// 	color: "black",
		// 	fontStyle: "italic",
		// 	fontSize: "14px",
		// },
		// buttonStyle: {
		// 	backgroundColor: "darkslategray",
		// },
		// boxStyle: { backgroundColor: "gainsboro" },
		primaryColor: "darkslategray",
	},
};

// const boxStyleProps = {
// 	backgroundColor: "gainsboro",
// };

// const inputStyleProps = {
// 	backgroundColor: "lightgrey",
// 	color: "black",
// 	fontStyle: "italic",
// 	fontSize: "14px",
// };

// const buttonStyleProps = {
// 	backgroundColor: "darkslategray",
// };

DoormanConfigure(config);

// DoormanTestLogin("saim@gmail.com", "cd@123", "sdd123");

function App() {
	const [email, setEmail] = useState("");
	const [cognitoId, setCognitoId] = useState("");

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

	// const onSignupSuccess = async (res) => {
	// 	console.log("res", res);
	// 	// setEmail(res?.user?.username);
	// 	// setCognitoId(res?.userSub);
	// 	// const body = {
	// 	// 	email: res?.user?.username,
	// 	// 	cognitoUser: res?.userSub,
	// 	// 	emailVerified: false,
	// 	// 	role: [13],
	// 	// };

	// 	// const idToken = Cookies.get("doorman_user");

	// 	// console.log("ID token", idToken);

	// 	// await axios.post(
	// 	// 	"https://uv71v862e8.execute-api.us-east-1.amazonaws.com/dev-08-01/auth/signup",
	// 	// 	body,
	// 	// 	{
	// 	// 		headers: {
	// 	// 			Authorization: `Bearer ${idToken}`,
	// 	// 			// Authorization:
	// 	// 			// 	"Bearer eyJraWQiOiJ3Y3Z1cEpvRHYwQXJlQ0hiSWNaTHR1YzhZWmVXc1dyMmtVZExcLzhBeWRXOD0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJiNGQ4NTQwOC04MDcxLTcwM2QtN2JkOC0xNmNlOWYwY2JkM2YiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMS5hbWF6b25hd3MuY29tXC91cy1lYXN0LTFfbWRrOG1GV052IiwiY29nbml0bzp1c2VybmFtZSI6ImI0ZDg1NDA4LTgwNzEtNzAzZC03YmQ4LTE2Y2U5ZjBjYmQzZiIsIm9yaWdpbl9qdGkiOiJlMzBjNjc4ZC0yMGFkLTQxMmYtOWU2Zi1kZTY1MTQ3ZWQxZGIiLCJhdWQiOiIxbGlhdTYxNDc4b3Y5NXRjZDNwM3U5ajNrdCIsImV2ZW50X2lkIjoiZDVjMDI3NDYtNDMzNi00MTllLWE0NjQtM2FiMTgxNDE4NjRjIiwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE2OTM4MjIyMDcsImV4cCI6MTY5MzgyNTgwNywiaWF0IjoxNjkzODIyMjA3LCJqdGkiOiI2MTUyMDcwYi1hNjY3LTQ1MDktYjg1Zi1iZDNiMWY1YTQ3OWYiLCJlbWFpbCI6InNhaW0uYXNoZmFxQGNvZGVkaXN0cmljdC5jb20ifQ.CeZ7AdqnqqjyYT8IdU1ePcYZwAN0juDafpt8Xpy8VPuVYbaEwcIdSfTDtmgqHZmnots_WhVuK75Buv2dHVAR1itwluBl1whIZvjBPiM4WeMxBDyF0OHpHbs0jGHCXnSeyF0H0aySwnC6MEltpC09k39rUFenpR579T1veX6LYZdgeuvkkQdXYCI7YuRvXL9UI5UjRADSXTxt2tITyi80PhyRuasbirk6rWk0Pj254EJT7QeTdX4MGIPgQXX8ZCh6sWONR0fYdWtg1x2L8-_MQ2daaxs86ynRIojcM4dOYfkwui5qF9uCtMc_V8BfMZ7tFMdVYayxxnBaWWOf1b4jKQ",
	// 	// 		},
	// 	// 	}
	// 	// );
	// };

	// const onSignupFail = (err) => {
	// 	console.log(err);
	// 	// alert(err);
	// };

	const onVerifySuccess = async (res) => {
		console.log("res", res);
		// const body = {
		// 	email,
		// };
		// const idToken = Cookies.get("doorman_user");
		// await axios.patch(
		// 	"https://uv71v862e8.execute-api.us-east-1.amazonaws.com/dev-08-01/auth/verify-email",
		// 	body,
		// 	{
		// 		headers: {
		// 			Authorization: `Bearer ${idToken}`,
		// 			// Authorization:
		// 			// 	"Bearer eyJraWQiOiJ3Y3Z1cEpvRHYwQXJlQ0hiSWNaTHR1YzhZWmVXc1dyMmtVZExcLzhBeWRXOD0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJiNGQ4NTQwOC04MDcxLTcwM2QtN2JkOC0xNmNlOWYwY2JkM2YiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMS5hbWF6b25hd3MuY29tXC91cy1lYXN0LTFfbWRrOG1GV052IiwiY29nbml0bzp1c2VybmFtZSI6ImI0ZDg1NDA4LTgwNzEtNzAzZC03YmQ4LTE2Y2U5ZjBjYmQzZiIsIm9yaWdpbl9qdGkiOiJlMzBjNjc4ZC0yMGFkLTQxMmYtOWU2Zi1kZTY1MTQ3ZWQxZGIiLCJhdWQiOiIxbGlhdTYxNDc4b3Y5NXRjZDNwM3U5ajNrdCIsImV2ZW50X2lkIjoiZDVjMDI3NDYtNDMzNi00MTllLWE0NjQtM2FiMTgxNDE4NjRjIiwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE2OTM4MjIyMDcsImV4cCI6MTY5MzgyNTgwNywiaWF0IjoxNjkzODIyMjA3LCJqdGkiOiI2MTUyMDcwYi1hNjY3LTQ1MDktYjg1Zi1iZDNiMWY1YTQ3OWYiLCJlbWFpbCI6InNhaW0uYXNoZmFxQGNvZGVkaXN0cmljdC5jb20ifQ.CeZ7AdqnqqjyYT8IdU1ePcYZwAN0juDafpt8Xpy8VPuVYbaEwcIdSfTDtmgqHZmnots_WhVuK75Buv2dHVAR1itwluBl1whIZvjBPiM4WeMxBDyF0OHpHbs0jGHCXnSeyF0H0aySwnC6MEltpC09k39rUFenpR579T1veX6LYZdgeuvkkQdXYCI7YuRvXL9UI5UjRADSXTxt2tITyi80PhyRuasbirk6rWk0Pj254EJT7QeTdX4MGIPgQXX8ZCh6sWONR0fYdWtg1x2L8-_MQ2daaxs86ynRIojcM4dOYfkwui5qF9uCtMc_V8BfMZ7tFMdVYayxxnBaWWOf1b4jKQ",
		// 		},
		// 	}
		// );
	};

	const onCodeResendSuccess = (res) => {
		console.log("resend success", res);
	};

	const onVerifyFail = (err) => {
		console.log("on verify email fail", err);
	};

	// const boxStyleProps = {
	// 	backgroundColor: "gainsboro",
	// };

	// const inputStyleProps = {
	// 	backgroundColor: "lightgrey",
	// 	color: "black",
	// 	fontStyle: "italic",
	// 	fontSize: "14px",
	// };

	// const buttonStyleProps = {
	// 	backgroundColor: "darkslategray",
	// };

	const handleLogoutClick = async () => {
		console.log("In handle logout");
		const logoutMessage = await DoormanLogout();
		console.log("Message returned from component: ", logoutMessage);
		// return (
		// <DoormanLogout
		// onSuccess={(msg) => console.log("Message from component", msg)}
		// />
		// DoormanLogout();
		// );
	};

	const checkAllPermissions = () => {
		// const hasPermission = DoormanCheckUserPermissions("CPA-0");
		const hasPermission = DoormanUserHasAllPermissions([
			"CPA-01",
			"APA-01",
			"APA-05",
		]);
		console.log("Has All Permission", hasPermission);
	};

	const checkAnyPermission = () => {
		// const hasPermission = DoormanCheckUserPermissions("CPA-0");
		const hasPermission = DoormanUserHasAnyPermission(["CPA-01", "sd"]);
		console.log("Has Any Permission", hasPermission);
	};

	// const [formData, setFormData] = useState({
	// 	username: "",
	// 	password: "",
	// });

	// const handleInputChange = (event) => {
	// 	const { name, value } = event.target;
	// 	setFormData({
	// 		...formData,
	// 		[name]: value,
	// 	});
	// };

	// const handleSubmit = (event) => {
	// 	event.preventDefault();
	// 	// You can handle form submission logic here, e.g., sending data to a server.
	// 	console.log("Submitted data:", formData);
	// };

	let onAuthSuccess = (authData, permissions) => {
		// Handle successful login
		console.log("Login successful:", authData, permissions);
	};

	let onAuthFail = (error) => {
		// Handle login failure
		console.error("Login failed:", error);
	};

	// DoormanLoginNoUI({
	// 	email: "saim.ashfaq@codedistrict.com",
	// 	password: "Codedistrict@123",
	// 	// newPassword: "jk",
	// 	onAuthSuccess,
	// 	onAuthFail,
	// });

	const onSuccess = (message) => {
		// Handle successful password reset initiation
		console.log("Password reset successful:", message);
	};

	const onFail = (error) => {
		// Handle password reset initiation failure
		console.error("Password reset failed:", error);
	};

	// DoormanForgotPasswordNoUI({
	// 	email: "saim.ashfaq+789@codedistrict.com",
	// 	onSuccess,
	// 	onFail,
	// });

	// DoormanSetPasswordNoUI({
	// 	email: "saim.ashfaq+789@codedistrict.com",
	// 	verificationCode: "212933",
	// 	password: "Codedistrict@123",
	// 	onSuccess,
	// 	onFail,
	// });

	const onSignupSuccess = (message) => {
		// Handle successful signup
		console.log("Signup successful:", message);
	};

	const onSignupFail = (error) => {
		// Handle signup failure
		console.error("Signup failed:", error);
	};

	// DoormanSignupNoUI({
	// 	email: "saim.ashfaq+100@codedistrict.com",
	// 	password: "Codedistrict@123",
	// 	onSuccess: onSignupSuccess,
	// 	onFail: onSignupFail,
	// });

	// DoormanResendCodeNoUI({
	// 	email: "saim.ashfaq+101@codedistrict.com",
	// 	onSuccess,
	// 	onFail,
	// });

	// DoormanVerifyEmailNoUI({
	// 	email: "saim.ashfaq+101@codedistrict.com",
	// 	verificationCode: "175038",
	// 	onSuccess: onVerifySuccess,
	// 	onFail: onVerifyFail,
	// });

	// DoormanChangePasswordNoUI({
	// 	oldPassword: "Codedistrict@123",
	// 	newPassword: "Codedistrict@123",
	// 	onSuccess,
	// 	onFail,
	// });

	return (
		<div className="App">
			<div>{/* <ExternalAppLoginComponent /> */}</div>
			{/* <h2 style={{ textAlign: "center" }}>Code District Package </h2> */}
			<DoormanLogin
				onAuthSuccess={onLoginSuccess}
				onAuthFail={onLoginFail}
				showSignupLink={true}
			/>
			{/* <button onClick={checkAllPermissions}>Check All Permissions</button>
			<button onClick={checkAnyPermission}>Check Any Permission</button> */}
			{/* <button onClick={() => hasAllPermissions(["CPA-01", "AAE"])}>Test</button> */}
			<button
				// onClick={() => {
				// 	console.log("In logout");
				// 	DoormanLogout();
				// }}
				onClick={handleLogoutClick}
			>
				Logout
			</button>
			{/* <DoormanLogout
				onSuccess={(res) => console.log("res", res)}
				onFail={(err) => console.log("Err", err)}
			/> */}

			<DoormanSignup onSuccess={onSignupSuccess} onFail={onSignupFail} />
			<DoormanVerifyEmail
				email={"usamasaqib1@gmail.com"}
				onVerifySuccess={onVerifySuccess}
				onResendSuccess={onCodeResendSuccess}
				onVerifyFail={onVerifyFail}
				onResendFail={(err) => console.log("Err resending code", err)}
			/>
			<DoormanForgotPassword
				onSuccess={(val) => console.log("val", val)}
				onFail={(err) => console.log("err in forgot password", err)}
			/>
			<DoormanSetPassword
				onSuccess={(val) => {
					console.log("Val in set password", val);
					alert(val);
				}}
				onResendSuccess={(res) => console.log("Resend success", res)}
				onFail={(err) => console.log("Err in set password", err)}
				onResendFail={(err) => console.log("Err resending code", err)}
				email={"saim.ashfaq+171@codedistrict.com"}
			/>
			<DoormanChangePassword
				onSuccess={(val) => console.log("val", val)}
				onFail={(err) => console.log("err changing password", err)}
				// email={"saim.ashfaq@codedistrict.com"}
			/>
			{/* <Products /> */}
		</div>
	);
}

export default App;
