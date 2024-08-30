import React, { useState } from "react";
import { CognitoUserPool } from "amazon-cognito-identity-js";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Singleton from "../../singleton/singleton";
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";

export function DoormanChangePassword({ onSuccess, onFail }) {
	const [errorMessage, setErrorMessage] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPass, setShowConfirmPass] = useState(false);
	const [showNewPass, setShowNewPass] = useState(false);
	const [loading, setLoading] = useState(false);

	const toggleEyeIcon = (eyeParameters) => {
		eyeParameters((prevState) => !prevState);
	};

	const initialValues = {
		oldPassword: "",
		newPassword: "",
		confirmPassword: "",
	};

	var instance = Singleton.getInstance();

	const handleSubmit = (values, { setErrors }) => {
		try {
			setLoading(true);
			const { oldPassword, newPassword, confirmPassword } = values;
			const errors = {};

			if (newPassword !== confirmPassword) {
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

			const cognitoUser = userPool.getCurrentUser();

			cognitoUser.getSession(function (err, session) {
				if (err) {
					setErrorMessage(`${err.message}`);
					return;
				}
				cognitoUser.changePassword(
					oldPassword,
					newPassword,
					function (err, result) {
						if (err) {
							onFail(err);
							setErrorMessage(`${err.message}`);
							setLoading(false);
							return;
						}
						onSuccess({ message: "Password changed successfully!", result });
						setErrorMessage("");
						setLoading(false);
					}
				);
			});
		} catch (err) {
			console.error("errr while changing password", err);
			onFail(err);
			setLoading(false);
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
				<h2 className="dm-widget-title">Change Password</h2>
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
									errors.oldPassword && touched.oldPassword ? "required" : ""
								}`}
							>
								<label className="dm-form-label" htmlFor="password">
									Old Password:{" "}
								</label>
								<Field
									className="dm-form-input"
									type={showPassword ? "text" : "password"}
									name="oldPassword"
									placeholder="Enter your old password"
									onBlur={handleBlur}
									validate={(val) => validateRequiredField(val, "Old Password")}
									style={instance?.configuration?.style?.inputStyle}
								/>
								<Icon
									icon={showPassword ? eye : eyeOff}
									size={12}
									onClick={() => toggleEyeIcon(setShowPassword)}
									className="eye-icon"
								/>
								{errors.oldPassword && touched.oldPassword ? (
									<ErrorMessage
										name="oldPassword"
										component="div"
										className="dm-error-msg"
									/>
								) : null}
							</div>
							<div
								className={`dm-form-group ${
									errors.newPassword && touched.newPassword ? "required" : ""
								}`}
							>
								<label className="dm-form-label" htmlFor="password">
									New Password:{" "}
								</label>
								<Field
									className="dm-form-input"
									type={showNewPass ? "text" : "password"}
									name="newPassword"
									placeholder="Enter your new password"
									onBlur={handleBlur}
									validate={(val) => validateRequiredField(val, "New Password")}
									style={instance?.configuration?.style?.inputStyle}
								/>
								<Icon
									icon={showNewPass ? eye : eyeOff}
									size={12}
									onClick={() => toggleEyeIcon(setShowNewPass)}
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
									errors.oldPassword ||
									errors.newPassword ||
									errors.confirmPassword
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
									" Change Password"
								)}
							</button>
						</Form>
					)}
				</Formik>
			</div>
		</>
	);
}
