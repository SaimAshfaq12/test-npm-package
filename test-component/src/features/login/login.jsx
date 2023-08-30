import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Checkbox, Form, Input, message, Typography } from "antd";
import qs from "qs";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
// import Logo from "../../assets/images/logo.svg";
import {
	deleteQueryParam,
	setFieldErrorsFromServer,
} from "../../utilities/generalUtility";
import {
	CognitoUserPool,
	CognitoUser,
	AuthenticationDetails,
} from "amazon-cognito-identity-js";
import { saveUserEmail } from "../../redux/userEmail/userEmail";
import User from "../../models/user";

const userPool = new CognitoUserPool({
	UserPoolId: "us-east-1_mdk8mFWNv",
	ClientId: "1liau61478ov95tcd3p3u9j3kt",
});

// configure({
// 	UserPoolId: "us-east-1_mdk8mFWNv",
// 	ClientId: "1liau61478ov95tcd3p3u9j3kt",
// })

export const Login = () => {
	// const dispatch = useDispatch();
	// const [form] = Form.useForm();
	// const paramJson = qs.parse(location.search, { ignoreQueryPrefix: true });
	// const navigate = useNavigate();

	// useEffect(() => {
	// 	console.log("paramJson: ", paramJson);
	// 	if (paramJson.err) {
	// 		message.error(paramJson.err);
	// 		deleteQueryParam("err");
	// 	}
	// }, []);

	// const handleSubmit = (values) => {
	// 	const cognitoUser = new CognitoUser({
	// 		Username: values.email,
	// 		Pool: userPool,
	// 	});

	// 	const authenticationDetails = new AuthenticationDetails({
	// 		Username: values.email,
	// 		Password: values.password,
	// 	});

	// 	cognitoUser.authenticateUser(authenticationDetails, {
	// 		onSuccess: async (authData) => {
	// 			try {
	// 				await User.awsLogin(
	// 					values.email,
	// 					values.remember,
	// 					authData,
	// 					dispatch
	// 				);
	// 				navigate("/");
	// 			} catch (err) {
	// 				setFieldErrorsFromServer(err, form, values);
	// 				User.clearUserCookie();
	// 			}
	// 		},
	// 		onFailure: (err) => {
	// 			dispatch(saveUserEmail(values.email));
	// 			if (err.code === "UserNotConfirmedException") {
	// 				message.warning("Please verify your email first!");
	// 				cognitoUser.resendConfirmationCode(function (err) {
	// 					if (err) {
	// 						message.error(err.message || "Something went wrong!");
	// 						return;
	// 					}
	// 					navigate("/verify-email");
	// 				});
	// 			} else {
	// 				message.error(err.message || "Something went wrong!");
	// 			}
	// 		},
	// 	});
	// };

	const { Title } = Typography;
	return (
		<></>
		// <div className="login-container">
		// 	<div className="lc-logo">{/* <img src={Logo} alt="logo" /> */}</div>
		// 	<Card bordered={false} className="login-card">
		// 		<h4>Login to your account</h4>
		// 		<Form
		// 			form={form}
		// 			name="login-form"
		// 			initialValues={{
		// 				remember: true,
		// 			}}
		// 			onFinish={handleSubmit}
		// 			layout="vertical"
		// 		>
		// 			<Form.Item
		// 				name="email"
		// 				rules={[
		// 					{
		// 						required: true,
		// 						message: "Please input your Email!",
		// 					},
		// 				]}
		// 			>
		// 				<Input
		// 					type="email"
		// 					prefix={
		// 						<UserOutlined className="site-form-item-icon text-primary" />
		// 					}
		// 					placeholder="Email"
		// 					size="large"
		// 				/>
		// 			</Form.Item>

		// 			<Form.Item
		// 				name="password"
		// 				rules={[
		// 					{
		// 						required: true,
		// 						message: "Please input your password!",
		// 					},
		// 				]}
		// 			>
		// 				<Input.Password
		// 					prefix={
		// 						<LockOutlined className="site-form-item-icon text-primary" />
		// 					}
		// 					placeholder="Password"
		// 					size="large"
		// 					autoComplete="false"
		// 				/>
		// 			</Form.Item>
		// 			<Form.Item>
		// 				<Form.Item name="remember" valuePropName="checked" noStyle>
		// 					<Checkbox>Remember me</Checkbox>
		// 				</Form.Item>

		// 				<Link to="/forgot-password" className="float-right" href="">
		// 					Forgot password
		// 				</Link>
		// 			</Form.Item>
		// 			<Title level={5} className="text-center">
		// 				{"Don't Have an Account?" + "  "}
		// 				<Link to="/register">Sign Up</Link>
		// 			</Title>
		// 			<Form.Item className="mb-0">
		// 				<Button block size="large" type="primary" htmlType="submit">
		// 					Log In
		// 				</Button>
		// 			</Form.Item>
		// 		</Form>
		// 	</Card>
		// </div>
	);
};
