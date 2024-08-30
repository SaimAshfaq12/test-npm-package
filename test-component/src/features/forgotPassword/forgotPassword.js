import React, { useState } from "react";
import {
	CognitoUser,
	AuthenticationDetails,
	CognitoUserPool,
} from "amazon-cognito-identity-js";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Singleton from "../../singleton/singleton";
import { Icon } from "react-icons-kit";
import { arrowLeft } from "react-icons-kit/typicons/arrowLeft";

export function DoormanForgotPassword({ onSuccess, onFail }) {
	const initialValues = {
		email: "",
	};

	const [errorMessage, setErrorMessage] = useState("");
	const [loading, setLoading] = useState(false);

	var instance = Singleton.getInstance();

	const handleSubmit = (val, { setErrors }) => {
		try {
			setLoading(true);
			const userPool = new CognitoUserPool({
				UserPoolId: instance?.configuration?.userPoolId,
				ClientId: instance?.configuration?.clientId,
			});

			const cognitoUser = new CognitoUser({
				Username: val.email.toLowerCase(),
				Pool: userPool,
			});

			cognitoUser.forgotPassword({
				onSuccess: (data) => {
					console.log("Data", data);
					onSuccess({ status: "SUCCESS", email: val.email.toLowerCase() });
					setLoading(false);
				},
				onFailure: (err) => {
					onFail(err);
					setErrorMessage(`${err.message}`);
					setLoading(false);
				},
			});
		} catch (err) {
			console.error("err while code verifying", err);
			onFail(err);
			setLoading(false);
		}
	};

	const validateEmail = (value) => {
		if (!value) {
			return "Email is required";
		} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
			return "Invalid email address";
		}
	};

	return (
		<div
			className="dm-auth-widget"
			style={instance?.configuration?.style?.boxStyle}
		>
			<h2 className="dm-widget-title">Forgot Password</h2>
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
								errors.email && touched.email ? "required" : ""
							}`}
						>
							<label className="dm-form-label">Email: </label>
							<Field
								className="dm-form-input"
								type="email"
								name="email"
								validate={(val) => validateEmail(val)}
								onBlur={handleBlur}
								placeholder="Enter your email"
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
						<button
							className={`dm-btn spinner-wrap${
								errors.email ? " dm-btn-margin-top" : ""
							}`}
							type="submit"
							style={instance?.configuration?.style?.buttonStyle}
							disabled={loading}
						>
							{loading ? <span className="btn-loader"></span> : "Continue"}
						</button>
						<div className="dm-text-link">
							<a href="/login">
								<Icon icon={arrowLeft} size={22} className="back-arrow" />
								Back to Sign in
							</a>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
}
