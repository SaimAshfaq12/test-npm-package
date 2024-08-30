import React, { useState } from "react";
import { CognitoUser, CognitoUserPool } from "amazon-cognito-identity-js";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Singleton from "../../singleton/singleton";
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";

export function DoormanSetPassword({
	email,
	onSuccess,
	onResendSuccess,
	onFail,
	onResendFail,
}) {
	const [errorMessage, setErrorMessage] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPass, setShowConfirmPass] = useState(false);
	const [loading, setLoading] = useState(false);
	const [resendLoading, setResendLoading] = useState(false);

	const initialValues = {
		verificationCode: "",
		password: "",
		confirmPassword: "",
	};

	const toggleEyeIcon = (eyeParameters) => {
		eyeParameters((prevState) => !prevState);
	};

	var instance = Singleton.getInstance();

	const handleSubmit = (values, { setErrors }) => {
		try {
			setLoading(true);
			setResendLoading(false);
			const { verificationCode, password, confirmPassword } = values;

			const errors = {};
			if (password !== confirmPassword) {
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

			const cognitoUser = new CognitoUser({
				Username: email,
				Pool: userPool,
			});
			cognitoUser.confirmPassword(verificationCode, password, {
				onSuccess: () => {
					onSuccess("Your password has been updated successfully!");
					setErrorMessage("");
					setLoading(false);
				},
				onFailure: (err) => {
					console.error("Err", err);
					onFail(err);
					setErrorMessage(`${err.message}`);
					setLoading(false);
				},
			});
		} catch (err) {
			onFail(err);
			setErrorMessage(`${err}`);
			setLoading(false);
		}
	};

	const resendCode = () => {
		try {
			setResendLoading(true);
			setLoading(false);
			const userPool = new CognitoUserPool({
				UserPoolId: instance?.configuration?.userPoolId,
				ClientId: instance?.configuration?.clientId,
			});

			const cognitoUser = new CognitoUser({
				Username: email,
				Pool: userPool,
			});
			// cognitoUser.resendConfirmationCode(function (err, result) {
			// 	if (err) {
			// 		onResendFail(err);
			// 		setErrorMessage(`${err.message}`);
			// 		setResendLoading(false);
			// 		return;
			// 	}
			// 	onResendSuccess({ message: "Code resent successfully!", result });
			// 	setErrorMessage("");
			// 	setResendLoading(false);
			// });
			cognitoUser.forgotPassword({
				onSuccess: (data) => {
					onResendSuccess({ message: "Code resent successfully!" });
					setErrorMessage("");
					setResendLoading(false);
				},
				onFailure: (err) => {
					onFail(err);
					setErrorMessage(`${err.message}`);
					setLoading(false);
					setResendLoading(false);
				},
			});
		} catch (err) {
			console.error("Err while code resend", err);
			onFail(err);
			setResendLoading(false);
		}
	};

	const validateRequiredField = (value, fieldName) => {
		return !value ? `${fieldName} is required` : "";
	};

	return (
		<>
			<div
				className="dm-auth-widget"
				style={instance?.configuration?.style?.boxStyle}
			>
				<h2 className="dm-widget-title">Set Password</h2>
				<Formik
					initialValues={initialValues}
					onSubmit={handleSubmit}
					validateOnBlur={true}
					validateOnChange={true}
				>
					{({ errors, touched, handleBlur }) => (
						<Form className="dm-form">
							{errorMessage ? (
								<div className="dm-alert dm-alert-danger">{errorMessage}</div>
							) : (
								""
							)}
							<div
								className={`dm-form-group ${
									errors.verificationCode && touched.verificationCode
										? "required"
										: ""
								}`}
							>
								<label className="dm-form-label">Code: </label>
								<Field
									className="dm-form-input"
									type="text"
									name="verificationCode"
									placeholder="Enter verification code"
									onBlur={handleBlur}
									validate={(val) =>
										validateRequiredField(val, "Verification Code")
									}
									style={instance?.configuration?.style?.inputStyle}
								/>
								{errors.verificationCode && touched.verificationCode ? (
									<ErrorMessage
										name="verificationCode"
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
									placeholder="Enter new password"
									onBlur={handleBlur}
									validate={(val) => validateRequiredField(val, "Password")}
									style={instance?.configuration?.style?.inputStyle}
								/>
								<Icon
									icon={showPassword ? eye : eyeOff}
									size={12}
									onClick={() => toggleEyeIcon(setShowPassword)}
									// onClick={handleToggle}
									className="eye-icon"
								/>
								{errors.password && errors.password ? (
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
									placeholder="Enter Confirm password"
									onBlur={handleBlur}
									validate={(val) =>
										validateRequiredField(val, "Confirm Password")
									}
									style={instance?.configuration?.style?.inputStyle}
								/>
								<Icon
									icon={showConfirmPass ? eye : eyeOff}
									size={12}
									// onClick={confirmPass}
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
								className={`dm-btn spinner-wrap ${
									errors.email || errors.password || errors.confirmPassword
										? "dm-btn-margin-top"
										: ""
								}`}
								type="submit"
								style={instance?.configuration?.style?.buttonStyle}
								disabled={loading}
							>
								{loading ? (
									<span className="btn-loader"></span>
								) : (
									"Set Password"
								)}
							</button>
						</Form>
					)}
				</Formik>
				<div className="dm-resend">
					{resendLoading ? (
						<div className="spinner-wrap" style={{ border: 0 }}>
							<span className="loader"></span>
						</div>
					) : (
						<a
							className="spinner-wrap"
							onClick={resendCode}
							disabled={resendLoading}
						>
							Resend Code
						</a>
					)}
				</div>
			</div>
		</>
	);
}
