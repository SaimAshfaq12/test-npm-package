<p align="center" >
  <a href="https://www.codedistrict.com/">
  <img 
    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRp-4uhZuWvQUL2LorlakCTK-ztn_quA-gZ9Cvlv7XVH8n9n0oE-ceQ2gobXkZnLMbloY4&usqp=CAU" 
    height="130" 
    width="130"
  >
  </a>
</p>

# Doorman

A comprehensive React package for seamless authentication management. Easily integrate secure user authentication in your applications. With Doorman, you can quickly configure authentication using Amazon Cognito User Pools and implement user authentication functionality effortlessly. This README will guide you through the installation, configuration and usage of Doorman.

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Components](#components)
  - [UI Components](#uicomponents)
    - [DoormanLogin](#doormanlogin)
    - [DoormanSignup](#doormansignup)
    - [DoormanVerifyEmail](#doormanverifyemail)
    - [DoormanForgotPassword](#doormanforgotpassword)
    - [DoormanSetPassword](#doormansetpassword)
    - [DoormanChangePassword](#doormanchangepassword)
  - [No UI (SDK)](#noui)
    - [DoormanLoginNoUI](#doormanloginnoui)
    - [DoormanSignupNoUI](#doormansignupnoui)
    - [DoormanVerifyEmailNoUI](#doormanverifyemailnoui)
    - [DoormanForgotPasswordNoUI](#doormanforgotpasswordnoui)
    - [DoormanSetPasswordNoUI](#doormansetpasswordnoui)
    - [DoormanResendCodeNoUI](#doormanresendcodenoui)
    - [DoormanChangePasswordNoUI](#doormanchangepasswordnoui)
    - [DoormanLogout](#doormanlogout)
    - [DoormanUserHasAnyPermission](#doormanuserhasanypermission)
    - [DoormanUserHasAllPermissions](#doormanuserhasallpermissions)
- [Conclusion](#conclusion)

## Installation

<a name="installation"></a>

You can install Doorman using npm:

`npm install @code_district/doorman`

## Configuration

<a name="configuration"></a>

Before using the authentication components, you need to configure Doorman. This involves setting up your authentication parameters using the DoormanConfigure function with a configuration object.

Usage:

```js
import { DoormanConfigure } from "@code_district/doorman";

// Configuration object
let config = {
	// Required
	userPoolId: "us-east-1_xxxxxxx",
	clientId: "jghjd2e23kAsa2342dAffg",
	cookieDomain: "localhost",
	apiGatewayUrl: "https://your-api-gateway-url.com",
	// Optional
	style: {
		inputStyle: {
			backgroundColor: "white",
			color: "black",
			fontStyle: "italic",
			fontSize: "14px",
		},
		buttonStyle: {
			backgroundColor: "darkslategray",
		},
		boxStyle: { backgroundColor: "gainsboro" },
		primaryColor: "blue",
	},
	//Add more configuration options as needed
};

// Use DoormanConfigure to set up your authentication
DoormanConfigure(config);
```

## Components

<a name="components"></a>

Doorman provides a versatile set of tools for handling user authentication. It includes UI components which offer ready-to-use interfaces for authentication and NoUI components which are designed for use with your own custom UI.
With UI components, you can quickly integrate secure user authentication with minimal effort. NoUI components, on the other hand will allow you to integrate authentication into your own UI by passing parameters in props and receiving callback functions for handling success or failure.

### UI Components

<a name="uicomponents"></a>

Doorman offers multiple UI components to handle user authentication with ready-to-use user interfaces:

### DoormanLogin

<a name="doormanlogin"></a>

The DoormanLogin component handles user authentication using the configured Cognito User Pool. It includes *"Forgot your password?"* link, which users can use to initiate the password recovery process. This will redirect them to the `/forgot-password` route, where the DoormanForgotPassword component can be implemented for password recovery. It also includes a *"Sign up"* link that redirect them to the `/signup` route. This is where the DoormanSignup component can be utilized for user registration. The visibility of this link is determined by the showSignupLink prop.

DoormanLogin supports two scenarios: the standard login flow and the admin-invite user flow.

#### Standard Login Flow:

In the standard login flow, users enter their email and password to authenticate. If authentication is successful, it returns '**accessToken**', '**idToken**', and '**refreshToken**' along with the user permissions. Additionally, it sets a cookie with the idToken, named "**doorman_user**" in case of success. In case of authentication failure, it returns an error message via the onFail prop.

#### Admin Invite User Flow:

For admin-invite users, the flow is slightly different. These users will receive an email with a temporary password. When they attempt to log in with their email and the temporary password they received, they will be prompted with a message to complete their account setup by setting a new password along with their temporary password.

In this scenario, users should enter the temporary password they received along with their new password. After setting the new password, the user's status in the Cognito User Pool will change from '**Force change password**' to '**Confirmed**'. These users will have their email verified by default.

Usage:

```js
import { DoormanLogin } from "@code_district/doorman";

// Implement success and failure callback functions
const onLoginSuccess = (tokens, permissions) => {
	// Handle successful authentication
	console.log("Tokens:", tokens);
	console.log("User Permissions:", permissions);
};

const onLoginFail = (error) => {
	// Handle authentication failure
	console.error("Authentication failed:", error);
};

// Use DoormanLogin in your component
<DoormanLogin onAuthSuccess={onLoginSuccess} onAuthFail={onLoginFail} showSignupLink={true}/>;
```

### DoormanSignup

<a name="doormansignup"></a>

The DoormanSignup component is responsible for creating a new user in the Cognito User Pool with an '**Unconfirmed**' confirmation status. The status will later be confirmed using the DoormanVerifyEmail component after email verification. DoormanSignup also includes a *"Sign In"* link, which upon clicking, redirects users to the `/login` route. Make sure to adjust the route for your DoormanLogin component accordingly to maintain a seamless user experience.

DoormanSignup has two props: onSuccess and onFail. The onSuccess prop will return "**SUCCESS**" in case the user is successfully created in the pool, and the onFail will trigger if the operation fails.

Usage:

```js
import { DoormanSignup } from "@code_district/doorman";

// Implement success and failure callback functions
const onSignupSuccess = (message) => {
	// Handle successful signup
	console.log("Signup successful:", message);
};

const onSignupFail = (error) => {
	// Handle signup failure
	console.error("Signup failed:", error);
};

// Use DoormanSignup in your component
<DoormanSignup onSuccess={onSignupSuccess} onFail={onSignupFail} />;
```

### DoormanVerifyEmail

<a name="doormanverifyemail"></a>

The DoormanVerifyEmail component handles user registration confirmation by entering a verification code received via email. It has a field for entering the verification code, a button for triggering code verification and a link to resend code. The Verify Code button verifies the code and, on success, changes the user's confirmation status in the Cognito User Pool to '**Confirmed**' The Resend Code link resends the verification code to the specified email.

DoormanVerifyEmail requires five props: onVerifySuccess, onResendSuccess, onVerifyFail, onResendFail, and email. The email prop should be the email of the user who has received the verification code.

Usage:

```js
import { DoormanVerifyEmail } from "@code_district/doorman";

// Implement success and failure callback functions for verification and resend
const onVerifySuccess = () => {
	// Handle successful verification
	console.log("Verification successful");
};

const onResendSuccess = () => {
	// Handle successful resend
	console.log("Code resend successful");
};

const onVerifyFail = (error) => {
	// Handle verification failure
	console.error("Verification failed:", error);
};

const onResendFail = (error) => {
	// Handle code resend failure
	console.error("Code resend failed:", error);
};

// Email of the user who received the verification code
const email = "test.user@example.com";

// Use DoormanVerifyEmail in your component
<DoormanVerifyEmail
	email={email}
	onVerifySuccess={onVerifySuccess}
	onResendSuccess={onResendSuccess}
	onVerifyFail={onVerifyFail}
	onResendFail={onResendFail}
/>;
```

### DoormanForgotPassword

<a name="doormanforgotpassword"></a>

The DoormanForgotPassword component allows users to initiate a password reset process by providing their email address. It also includes a *"Back to Sign In"* link, which upon clicking, redirects users back to the `/login` route. Ensure that you display the login component accordingly.

DoormanForgotPassword requires two props: onSuccess and onFail. Upon success, it sends a **Verification Code** to the user's email address, which can be used to reset the password. In case of failure, it returns an error message via the onFail prop.

Usage:

```js
import { DoormanForgotPassword } from "@code_district/doorman";

// Implement success and failure callback functions for password reset
const onSuccess = (message) => {
	// Handle successful password reset initiation
	console.log("Password reset initiated successfully:", message);
};

const onFail = (error) => {
	// Handle password reset initiation failure
	console.error("Password reset initiation failed:", error);
};

// Use DoormanForgotPassword in your component
<DoormanForgotPassword onSuccess={onSuccess} onFail={onFail} />;
```

### DoormanSetPassword

<a name="doormansetpassword"></a>

The DoormanSetPassword component allows the users to set a new password after receiving a verification code via email. It has three fields: Code for entering the verification code, Password for setting the new password, and Confirm Password for confirming the new password. Additionally, it provides a button **Set Password** to reset the password if the verification code is valid and the password and confirm password conform to the password policy, and **Resend Code** link to resend the verification code to the user's email.

DoormanSetPassword requires five props: onSuccess, onResendSuccess, onFail, onResendFail, and email. The email prop should be the email of the user who has received the verification code.

Usage:

```js
import { DoormanSetPassword } from "@code_district/doorman";

// Implement success and failure callback functions for password reset
const onSuccess = (message) => {
	// Handle successful password reset
	console.log("Password reset successful:", message);
	alert(message);
};

const onResendSuccess = () => {
	// Handle successful resend of the verification code
	console.log("Code resend successful");
};

const onFail = (error) => {
	// Handle password reset failure
	console.error("Password reset failed:", error);
};

const onResendFail = (error) => {
	// Handle code resend failure
	console.error("Code resend failed:", error);
};

// Email of the user who received the verification code
const email = "test.user@example.com";

// Use DoormanSetPassword in your component
<DoormanSetPassword
	onSuccess={onSuccess}
	onResendSuccess={onResendSuccess}
	onFail={onFail}
	onResendFail={onResendFail}
	email={email}
/>;
```

### DoormanChangePassword

<a name="doormanchangepassword"></a>

The DoormanChangePassword component enables users to update their password by entering their current password, a new password, and confirming the new password. It has three fields: Old Password for the existing password, New Password for the desired new password, and Confirm Password for verifying the new password.

Usage:

```js
import { DoormanChangePassword } from "@code_district/doorman";

// Implement success and failure callback functions for password change
const onChangePasswordSuccess = (message) => {
	// Handle successful password change
	console.log("Password change successful:", message);
};

const onChangePasswordFail = (error) => {
	// Handle password change failure
	console.error("Password change failed:", error);
};

// Use DoormanChangePassword in your component
<DoormanChangePassword
	onSuccess={onChangePasswordSuccess}
	onFail={onChangePasswordFail}
/>;
```

### No UI (SDK)

<a name="noui"></a>

Doorman also provides NoUI components for performing authentication actions with plain functions. Using these, you can seamlessly integrate authentication into your application's workflow while retaining full control over the user interface. These components take props for fields that were available in the UI components and return callback functions in case of success or failure.

### DoormanLoginNoUI

<a name="doormanloginnoui"></a>

The DoormanLoginNoUI allows you to perform user authentication without UI. It takes the following props: email, password, newPassword, onSuccess, and onFail. The component will handle the authentication process and invoke the appropriate callback functions based on the outcome.

#### Standard Login Flow:

In the standard login flow, users can pass their email and password as props to the DoormanLoginNoUI component. If authentication is successful, the component will call the onSuccess callback function, providing tokens and user permissions. In case of authentication failure, it will invoke the onFail callback function with an error message.

Usage:

```js
import { DoormanLoginNoUI } from "@code_district/doorman";

// Implement callback functions for standard login flow
const onLoginSuccess = (tokens, permissions) => {
	// Handle successful authentication
	console.log("Tokens:", tokens);
	console.log("User Permissions:", permissions);
};

const onLoginFail = (error) => {
	// Handle authentication failure
	console.error("Authentication failed:", error);
};

// Use DoormanLoginNoUI to authenticate without a UI
DoormanLoginNoUI({
	email: "test.user@example.com",
	password: "Userpassword@123",
	onAuthSuccess: onLoginSuccess,
	onAuthFail: onLoginFail,
});
```

#### Admin Invite User Flow:

For admin-invite users, the flow is slightly different. These users will receive an email with a temporary password. When they attempt to log in with their email and the temporary password they received, they will be prompted with a message to complete their account setup by setting a new password along with their temporary password.

Usage:

```js
import { DoormanLoginNoUI } from "@code_district/doorman";

// Implement callback functions for standard login flow
const onAuthSuccess = (tokens, permissions) => {
	// Handle successful authentication
	console.log("Tokens:", tokens);
	console.log("User Permissions:", permissions);
};

const onAuthFail = (error) => {
	// Handle authentication failure
	console.error("Authentication failed:", error);
};

DoormanLoginNoUI({
	email: "test.user@example.com",
	password: "Temporarypassword@123",
	newPassword: "Newpassword@123",
	onAuthSuccess,
	onAuthFail,
});
```

### DoormanSignupNoUI

<a name="doormansignupnoui"></a>

The DoormanSignupNoUI allows you to create a new user in the Cognito User Pool with an '**Unconfirmed**' confirmation status without UI. It takes the email, password, onSuccess, and onFail props. The component handles the user creation process and triggers the appropriate callback functions based on the outcome.

Usage:

```js
import { DoormanSignupNoUI } from "@code_district/doorman";

// Implement callback functions for signup
const onSignupSuccess = (message) => {
	// Handle successful signup
	console.log("Signup successful:", message);
};

const onSignupFail = (error) => {
	// Handle signup failure
	console.error("Signup failed:", error);
};

DoormanSignupNoUI({
	email: "test.email@example.com",
	password: "Password@123",
	onSuccess: onSignupSuccess,
	onFail: onSignupFail,
});
```

### DoormanVerifyEmailNoUI

<a name="doormanverifyemailnoui"></a>

The DoormanVerifyEmailNoUI is used to confirm a user's email with your own user interface. It takes the verification code, email, onSuccess and onFail props. The component handles the email verification process and on success, changes the user's confirmation status in the Cognito User Pool to '**Confirmed** and invokes the onFail callback function in case of failure.

Usage:

```js
import { DoormanVerifyEmailNoUI } from "@code_district/doorman";

// Implement callback functions for email verification
const onVerifySuccess = (res) => {
	// Handle successful email verification
	console.log("Email verification successful");
	console.log("Response:", res);
};

const onVerifyFail = (error) => {
	// Handle email verification failure
	console.error("Email verification failed:", error);
};

DoormanVerifyEmailNoUI({
	email: "test.email@example.com",
	verificationCode: "XXXXXX",
	onSuccess: onVerifySuccess,
	onFail: onVerifyFail,
});
```

### DoormanForgotPasswordNoUI

<a name="doormanforgotpasswordnoui"></a>

The DoormanForgotPasswordNoUI is used to initiate a password reset process. It takes the email, onSuccess, and onFail props. The component sends a **Verification Code** to the user's email address and triggers the appropriate callback functions based on the outcome.

Usage:

```js
import { DoormanForgotPasswordNoUI } from "@code_district/doorman";

// Implement callback functions for password reset initiation
const onSuccess = (message) => {
	// Handle successful password reset initiation
	console.log("Password reset successful:", message);
};

const onFail = (error) => {
	// Handle password reset initiation failure
	console.error("Password reset failed:", error);
};

DoormanForgotPasswordNoUI({
	email: "test.email@example.com",
	onSuccess,
	onFail,
});
```

### DoormanSetPasswordNoUI

<a name="doormansetpasswordnoui"></a>

The DoormanSetPasswordNoUI allows users to set a new password after receiving a verification code via email. It takes the verification code, email, password, onSuccess and onFail props. The component handles the password reset process and invokes the appropriate callback functions based on the outcome.

Usage:

```js
import { DoormanSetPasswordNoUI } from "@code_district/doorman";

// Implement callback functions for setting a new password
const onSuccess = (message) => {
	// Handle successful password reset
	console.log("Password reset successful:", message);
};

const onFail = (error) => {
	// Handle password reset failure
	console.error("Password reset failed:", error);
};

DoormanSetPasswordNoUI({
	email: "test.email@example.com",
	verificationCode: "XXXXXX",
	password: "Password@123",
	onSuccess,
	onFail,
});
```

### DoormanResendCodeNoUI

<a name="doormanresendcodenoui"></a>

The DoormanResendCodeNoUI is responsible for resending a verification code to the provided email address. It doesn't have a user interface and is useful when you want to implement a custom resend code functionality in your application.

Usage:

```js
import { DoormanResendCodeNoUI } from "@code_district/doorman";

// Implement callback functions for resend code
const onSuccess = (message) => {
	// Handle successful code resend
	console.log("Code resend successful:", message);
};

const onFail = (error) => {
	// Handle code resend failure
	console.error("Code resend failed:", error);
};

DoormanResendCodeNoUI({
	email: "test.email@example.com",
	onSuccess,
	onFail,
});
```

### DoormanChangePasswordNoUI

<a name="doormanchangepasswordnoui"></a>

The DoormanChangePasswordNoUI component allows users to change their password. It takes the oldPassword, newPassword, onSuccess, and onFail props. The component manages the process of changing the password and triggers the relevant callback functions depending on the result.

Usage:

```js
import { DoormanChangePasswordNoUI } from "@code_district/doorman";

// Implement callback functions for password change
const onSuccess = (message) => {
	// Handle successful password change
	console.log("Password change successful:", message);
};

const onFail = (error) => {
	// Handle password change failure
	console.error("Password change failed:", error);
};

// This will be used when the user is already logged in
DoormanChangePasswordNoUI({
	oldPassword: "Password@123", // Current password
	newPassword: "NewPassword@456", // New password
	onSuccess,
	onFail,
});
```

### DoormanLogout

<a name="doormanlogout"></a>

The DoormanLogout allows users to sign out, clearing the authentication cookie. When you call this function, it returns a message based on the user's sign-in status:

- If a user is currently signed in, it returns _"User signed out successfully"_ after successfully signing the user out and clearing the authentication cookie.

- If there is no user currently signed in (i.e., no user data in local storage), it returns _"No user is currently signed in"_.

Usage:

```js
import { DoormanLogout } from "@code_district/doorman";

// Use DoormanLogout in your component
const logoutMessage = DoormanLogout();

// Displays the logout message to the user
console.log(logoutMessage);
```

### DoormanUserHasAnyPermission

<a name="doormanuserhasanypermission"></a>

The DoormanUserHasAnyPermission allows you to check whether the currently logged-in user possesses any of the specified permissions. It accepts an array of permission strings and returns **true** if the user has at least one of those permissions. This component is useful for verifying whether a user has specific privileges within your application.

Usage:

```js
import { DoormanUserHasAnyPermission } from "@code_district/doorman";

// Example usage to check if the user has any of the specified permissions
const hasPermission = DoormanUserHasAnyPermission(["XYZ-123", "ABC-789"]);

if (hasPermission) {
	console.log("User has at least one of the specified permissions.");
} else {
	console.log("User does not have any of the specified permissions.");
}
```

### DoormanUserHasAllPermissions

<a name="doormanuserhasallpermissions"></a>

The DoormanUserHasAllPermissions allows you to verify whether the currently logged-in user possesses all of the specified permissions. It accepts an array of permission strings and returns **true** only if the user has all the specified permissions. This helps you ensure that a user has all the necessary privileges before granting access to specific actions or features within your application.

Usage:

```js
import { DoormanUserHasAllPermissions } from "@code_district/doorman";

// Example usage to check if the user has all of the specified permissions
const hasAllPermissions = DoormanUserHasAllPermissions(["XYZ-123", "ABC-789"]);

if (hasAllPermissions) {
	console.log("User has all of the specified permissions.");
} else {
	console.log("User does not have all of the specified permissions.");
}
```

## Conclusion

<a name="conclusion"></a>

Doorman simplifies authentication in your React applications by providing ready-to-use components for configuring and handling user authentication. With Doorman, you can save time and effort while ensuring secure and seamless authentication for your users.

If you have any questions or need further assistance, please feel free to [contact us](mailto:saim.ashfaq@codedistrict.com).

**Happy coding!** 🚀
