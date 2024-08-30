import React, { useState } from "react";
// import { Link } from "react-router-dom";
import {
	CognitoUserAttribute,
	CognitoUserPool,
} from "amazon-cognito-identity-js";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Singleton from "../../singleton/singleton";
// import userPool from "~/utilities/awsPool";
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";

export function DoormanSignup({ onSuccess, onFail }) {
	const [errorMessage, setErrorMessage] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPass, setShowConfirmPass] = useState(false);
	const [loading, setLoading] = useState(false);

	const toggleEyeIcon = (eyeParameters) => {
		eyeParameters((prevState) => !prevState);
	};

	const initialValues = {
		email: "",
		password: "",
		confirmPassword: "",
	};

	var instance = Singleton.getInstance();

	const handleSubmit = (values, { setErrors }) => {
		try {
			setLoading(true);
			values.email = values.email.toLowerCase();
			const { email, password, confirmPassword } = values;

			const errors = {};

			if (Object.keys(errors).length === 0 && password !== confirmPassword) {
				setErrorMessage("Passwords do not match");
				setLoading(false);
				return;
			}
			if (Object.keys(errors).length > 0) {
				setErrors(errors);
				setLoading(false);
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
					setErrorMessage(`${err.message}`);
					onFail(err);
					setLoading(false);
					return;
				}
				onSuccess({
					message: "Email verification code sent to your email!",
					result,
				});
				setErrorMessage("");
				setLoading(false);
			});
		} catch (err) {
			console.error("err in signup", err);
			onFail(err);
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
			<div
				className="dm-auth-widget"
				style={instance?.configuration?.style?.boxStyle}
			>
				<h2 className="dm-widget-title">Sign Up</h2>
				<Formik
					initialValues={initialValues}
					onSubmit={handleSubmit}
					validateOnBlur={true}
					validateOnChange={true}
				>
					{({ errors, touched, handleBlur }) => (
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
									Email:{" "}
								</label>
								<Field
									className="dm-form-input"
									type="email"
									name="email"
									placeholder="Enter your email"
									validate={(val) => validateEmail(val)}
									onBlur={handleBlur}
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
									onBlur={handleBlur}
									validate={(val) => validateRequiredField(val, "Password")}
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
							<div
								className={`dm-form-group ${
									errors.confirmPassword && touched.confirmPassword
										? "required"
										: ""
								}`}
							>
								<label className="dm-form-label" htmlFor="password">
									Confirm Password:{" "}
								</label>
								<Field
									className="dm-form-input"
									type={showConfirmPass ? "text" : "password"}
									name="confirmPassword"
									placeholder="Enter your password"
									onBlur={handleBlur}
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
							<button
								className="dm-btn spinner-wrap"
								type="submit"
								style={instance?.configuration?.style?.buttonStyle}
								disabled={loading}
							>
								{loading ? <span className="btn-loader"></span> : "Sign Up"}
							</button>
							<div className="dm-text-link">
								<p>
									Already have an account? <a href="/login">Sign In</a>
								</p>
							</div>
						</Form>
					)}
				</Formik>
			</div>
		</>
	);
}
