import React, { useState } from "react";
import {
	CognitoUser,
	AuthenticationDetails,
	CognitoUserPool,
} from "amazon-cognito-identity-js";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Singleton from "../../singleton/singleton";

export function DoormanVerifyEmail({
	email,
	onVerifySuccess,
	onResendSuccess,
	onVerifyFail,
	onResendFail,
}) {
	const initialValues = {
		verificationCode: "",
	};

	const [errorMessage, setErrorMessage] = useState("");
	const [loading, setLoading] = useState(false);
	const [resendLoading, setResendLoading] = useState(false);

	var instance = Singleton.getInstance();

	const verifyCode = (val, { setErrors }) => {
		try {
			setLoading(true);
			setResendLoading(false);
			// if (!val.verificationCode) {
			// 	setErrors({
			// 		verificationCode: "Enter your verification code",
			// 	});
			// 	setLoading(false);
			// 	return;
			// }
			const userPool = new CognitoUserPool({
				UserPoolId: instance?.configuration?.userPoolId,
				ClientId: instance?.configuration?.clientId,
			});

			const cognitoUser = new CognitoUser({
				Username: email,
				Pool: userPool,
			});
			cognitoUser.confirmRegistration(
				val.verificationCode,
				true,
				function (err, result) {
					if (err) {
						onVerifyFail(err);
						setErrorMessage(`${err.message}`);
						setLoading(false);
						return;
					}
					onVerifySuccess({ message: "Email verified successfully!", result });
					setErrorMessage("");
					setLoading(false);
				}
			);
		} catch (err) {
			console.error("err while code verifying", err);
			onVerifyFail(err);
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
			cognitoUser.resendConfirmationCode(function (err, result) {
				if (err) {
					onResendFail(err);
					setErrorMessage(`${err.message}`);
					setResendLoading(false);
					return;
				}
				onResendSuccess({ message: "Code resent successfully!", result });
				setErrorMessage("");
				setResendLoading(false);
			});
		} catch (err) {
			console.error("Err while code resend", err);
			onResendFail(err);
			setResendLoading(false);
		}
	};

	const validateRequiredField = (value, fieldName) => {
		return !value ? `${fieldName} is required` : "";
	};

	return (
		<div
			className="dm-auth-widget"
			style={instance?.configuration?.style?.boxStyle}
		>
			<h2 className="dm-widget-title">Email Verification</h2>
			<Formik
				initialValues={initialValues}
				onSubmit={verifyCode}
				validateOnBlur={true}
				validateOnChange={true}
			>
				{({ errors, touched, handleBlur }) => (
					<Form className="dm-form">
						{errorMessage ? (
							<div className="dm-alert dm-alert-danger">{errorMessage}</div>
						) : null}
						<div
							className={`dm-form-group ${
								errors.verificationCode && touched.verificationCode
									? "required"
									: ""
							}`}
						>
							<label className="dm-form-label">Verification Code: </label>
							<Field
								className="dm-form-input"
								type="text"
								name="verificationCode"
								placeholder="Enter Verification Code"
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
						<button
							className={`dm-btn spinner-wrap ${
								errors.verificationCode ? "dm-btn-margin-top" : ""
							}`}
							type="submit"
							style={instance?.configuration?.style?.buttonStyle}
							disabled={loading}
						>
							{loading ? <span className="btn-loader"></span> : "Verify"}
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
	);
}
