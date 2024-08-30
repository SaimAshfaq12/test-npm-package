import React, { useState } from "react";
// import { Link } from "react-router-dom";
import {
	AuthenticationDetails,
	CognitoUser,
	CognitoUserPool,
} from "amazon-cognito-identity-js";
import Cookies from "js-cookie";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "../../assets/scss/auth.scss";
import Singleton from "../../singleton/singleton";
import { DoormanInitializeUserPermissions } from "../../permissions/initializeUserPermissions";
import K from "../../utilities/constants";
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";

export function DoormanLogin({ onAuthSuccess, onAuthFail, showSignupLink }) {
	const [errorMessage, setErrorMessage] = useState("");
	const [isNewUser, setIsNewUser] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [showNewPassword, setShowNewPassword] = useState(false);
	const [showConfirmPass, setShowConfirmPass] = useState(false);
	const [loading, setLoading] = useState(false);

	const toggleEyeIcon = (eyeParameters) => {
		eyeParameters((prevState) => !prevState);
	};

	const initialValues = {
		email: "",
		password: "",
		newPassword: "",
		confirmPassword: "",
	};

	var instance = Singleton.getInstance();

	const handleSubmit = (values, { setErrors }) => {
		try {
			setLoading(true);
			values.email = values.email.toLowerCase();
			const { email, password, newPassword, confirmPassword } = values;
			const errors = {};

			if (isNewUser) {
				if (newPassword !== confirmPassword) {
					setErrorMessage("Passwords do not match");
					setLoading(false);
					return;
				}
			}
			if (Object.keys(errors).length > 0) {
				setErrors(errors);
				setLoading(false);
				return;
			}
			// var instance = Singleton.getInstance();
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

			// Calculate the expiration time, 9 hours from the current time
			const currentTime = new Date();
			const expirationTime = new Date(
				currentTime.getTime() + 9 * 60 * 60 * 1000
			);

			cognitoUser.authenticateUser(authenticationDetails, {
				onSuccess: async (authData) => {
					Cookies.set(K.Cookie.User, authData.getIdToken().getJwtToken(), {
						path: "/",
						domain: instance.configuration.cookieDomain,
						expires: expirationTime,
					});
					let permissions;
					await DoormanInitializeUserPermissions()
						.then((userPermissions) => {
							permissions = userPermissions;
						})
						.catch((error) => {
							console.error("Error getting user permissions: ", error);
						});
					setErrorMessage("");
					onAuthSuccess(authData, permissions);
					setLoading(false);
				},
				onFailure: (err) => {
					setErrorMessage(err.message);
					onAuthFail(err);
					setLoading(false);
				},
				newPasswordRequired: (userAttributes, requiredAttributes) => {
					setIsNewUser(true);
					delete userAttributes.email_verified;
					cognitoUser.completeNewPasswordChallenge(
						newPassword,
						{},
						{
							onSuccess: async (session) => {
								console.log("Password changed successfully");
								Cookies.set(K.Cookie.User, session.getIdToken().getJwtToken(), {
									path: "/",
									domain: instance.configuration.cookieDomain,
									expires: expirationTime,
								});
								let permissions;
								await DoormanInitializeUserPermissions()
									.then((userPermissions) => {
										permissions = userPermissions;
									})
									.catch((error) => {
										console.error("Error getting user permissions: ", error);
									});
								onAuthSuccess(session, permissions);
								setErrorMessage("");
								setIsNewUser(false);
								setLoading(false);
							},
							onFailure: (err) => {
								console.error("Password change failed:", err);
								setErrorMessage(`${err.message}`);
								onAuthFail(err);
								setLoading(false);
							},
						}
					);
				},
			});
		} catch (err) {
			console.error("errr while submitting", err);
			onAuthFail(err);
			setErrorMessage(`${err}`);
			setLoading(false);
		}
	};

	const validateRequiredField = (value, fieldName) => {
		return !value ? `${fieldName} is required` : "";
	};

	const validateEmail = (value) => {
		if (!value) {
			return "Email is required";
		} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
			return "Invalid email address";
		}
	};

	return (
		<>
			<Formik
				initialValues={initialValues}
				onSubmit={handleSubmit}
				validateOnBlur={true}
				validateOnChange={true}
			>
				{({ errors, touched, setFieldTouched, setFieldValue }) => (
					<div
						className="dm-auth-widget"
						style={instance?.configuration?.style?.boxStyle}
					>
						<h2 className="dm-widget-title">Login</h2>
						<Form className="dm-form">
							{errorMessage ? (
								<div className="dm-alert dm-alert-danger">
									{/* Display the authentication error message */}
									{errorMessage}
								</div>
							) : (
								""
							)}
							<div
								className={`dm-form-group ${
									errors.email && touched.email ? "required" : ""
								}`}
							>
								<label className="dm-form-label" htmlFor="email">
									asdasd:{" "}
								</label>
								<Field
									className="dm-form-input"
									type="email"
									name="email"
									placeholder="Enter your email"
									validate={(val) => validateEmail(val)}
									// onBlur={handleBlur}
									onBlur={() => setFieldTouched("email", true)}
									style={instance?.configuration?.style?.inputStyle}
								/>
								{errors.email && touched.email ? (
									<ErrorMessage
										name="email"
										component="div"
										className="dm-error-msg"
									/>
								) : null}
							</div>
							<div
								className={`dm-form-group ${
									errors.password && touched.password ? "required" : ""
								}`}
							>
								<label className="dm-form-label" htmlFor="password">
									Password:{" "}
								</label>
								<Field
									className="dm-form-input"
									type={showPassword ? "text" : "password"}
									name="password"
									placeholder="Enter your password"
									onBlur={() => setFieldTouched("password", true)}
									validate={(val) => {
										return validateRequiredField(val, "Password");
									}}
									onChange={(e) => {
										setFieldTouched("newPassword", false);
										setFieldTouched("confirmPassword", false);
										setFieldValue("password", e.target.value);
									}}
									style={instance?.configuration?.style?.inputStyle}
								/>
								<Icon
									icon={showPassword ? eye : eyeOff}
									size={12}
									onClick={() => toggleEyeIcon(setShowPassword)}
									className="eye-icon"
								/>
								{errors.password && touched.password ? (
									<ErrorMessage
										name="password"
										component="div"
										className="dm-error-msg"
									/>
								) : null}
							</div>
							{isNewUser && (
								<>
									<div className="dm-alert dm-alert-info">
										To complete your account setup, please set your new
										password.
									</div>
									<div
										className={`dm-form-group ${
											errors.newPassword && touched.newPassword
												? "required"
												: ""
										}`}
									>
										<label className="dm-form-label" htmlFor="password">
											New Password:{" "}
										</label>
										<Field
											className="dm-form-input"
											type={showNewPassword ? "text" : "password"}
											name="newPassword"
											placeholder="Enter your password"
											onChange={(e) => {
												setFieldTouched("confirmPassword", false);
												setFieldValue("newPassword", e.target.value);
											}}
											onBlur={() => setFieldTouched("newPassword", true)}
											validate={(val) =>
												validateRequiredField(val, "New Password")
											}
											style={instance?.configuration?.style?.inputStyle}
										/>
										<Icon
											icon={showNewPassword ? eye : eyeOff}
											size={12}
											onClick={() => toggleEyeIcon(setShowNewPassword)}
											className="eye-icon"
										/>
										{errors.newPassword && touched.newPassword ? (
											<ErrorMessage
												name="newPassword"
												component="div"
												className="dm-error-msg"
											/>
										) : null}
									</div>

									<div
										className={`dm-form-group ${
											errors.confirmPassword && touched.confirmPassword
												? "required"
												: ""
										}`}
									>
										<label className="dm-form-label" htmlFor="password">
											Confirm New Password:{" "}
										</label>
										<Field
											className="dm-form-input"
											type={showConfirmPass ? "text" : "password"}
											name="confirmPassword"
											onBlur={() => setFieldTouched("confirmPassword", true)}
											onChange={(e) => {
												setFieldValue("confirmPassword", e.target.value);
											}}
											placeholder="Enter your password"
											validate={(val) =>
												validateRequiredField(val, "Confirm Password")
											}
											style={instance?.configuration?.style?.inputStyle}
										/>
										<Icon
											icon={showConfirmPass ? eye : eyeOff}
											size={12}
											onClick={() => toggleEyeIcon(setShowConfirmPass)}
											className="eye-icon"
										/>
										{errors.confirmPassword && touched.confirmPassword ? (
											<ErrorMessage
												name="confirmPassword"
												component="div"
												className="dm-error-msg"
											/>
										) : null}
									</div>
								</>
							)}
							<button
								type="submit"
								className="dm-btn spinner-wrap"
								style={instance?.configuration?.style?.buttonStyle}
								disabled={loading}
							>
								{loading ? <span className="btn-loader"></span> : "Login"}
							</button>
							<div className="dm-text-link">
								<a href="/forgot-password">Forgot your password? </a>
								{/* <Link to="/forgot-password">Forgot your password? </Link> */}
								{showSignupLink && (
									<>
										<fieldset className="content-divider">
											<legend>OR</legend>
										</fieldset>
										<p>
											Don't have an account? <a href="/signup">Sign Up</a>
											{/* Don't have an account? <Link to="/signup">Sign Up</Link> */}
										</p>
									</>
								)}
							</div>
						</Form>
					</div>
				)}
			</Formik>
		</>
	);
}
