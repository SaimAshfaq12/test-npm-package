// import "./styles.css";
import "../src/assets/scss/auth.scss";
import { DoormanConfigure } from "./config/config";
import { DoormanLogin } from "./features/login/login";
import { DoormanLoginNoUI } from "./features/login/loginNoUI";
import { DoormanSignup } from "./features/register/register";
import { DoormanSignupNoUI } from "./features/register/registerNoUI";
import { DoormanVerifyEmail } from "./features/register/verifyEmail";
import { DoormanVerifyEmailNoUI } from "./features/register/verifyEmailNoUI";
import { DoormanChangePassword } from "./features/changePassword/changePassword";
import { DoormanChangePasswordNoUI } from "./features/changePassword/changePasswordNoUI";
import { DoormanForgotPassword } from "./features/forgotPassword/forgotPassword";
import { DoormanForgotPasswordNoUI } from "./features/forgotPassword/forgotPasswordNoUI";
import { DoormanSetPassword } from "./features/forgotPassword/setPassword";
import { DoormanSetPasswordNoUI } from "./features/forgotPassword/setPasswordNoUI";
import { DoormanResendCodeNoUI } from "./features/resendCode/resendCodeNoUI";
import { DoormanLogout } from "./features/logout/logout";
import { DoormanUserHasAnyPermission } from "./permissions/userHasAnyPermission";
import { DoormanUserHasAllPermissions } from "./permissions/userHasAllPermissions";

export {
	DoormanConfigure,
	DoormanLogin,
	DoormanLoginNoUI,
	DoormanSignup,
	DoormanSignupNoUI,
	DoormanVerifyEmail,
	DoormanVerifyEmailNoUI,
	DoormanForgotPassword,
	DoormanForgotPasswordNoUI,
	DoormanSetPassword,
	DoormanSetPasswordNoUI,
	DoormanResendCodeNoUI,
	DoormanChangePassword,
	DoormanChangePasswordNoUI,
	DoormanLogout,
	DoormanUserHasAllPermissions,
	DoormanUserHasAnyPermission,
};
