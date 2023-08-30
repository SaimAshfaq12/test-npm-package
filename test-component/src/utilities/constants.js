const K = {
	Network: {
		URL: {
			Base: "http://localhost:8080",
			BaseAPI: "http://localhost:8080",
			AwsAPI:
				"https://uv71v862e8.execute-api.us-east-1.amazonaws.com/dev-08-01",
			DomainName: "localhost",
			Timeout: 1000,
			Protocol: "http",
			IsMultiTenant: false, // * Converting into boolean
			TenantURL: (domainPrefix = "") => {
				return http + "://" + domainPrefix + ".localhost.com:8080";
			},
			Client: {
				BaseHost: "localhost",
				BasePort: 8000,
			},

			Auth: {
				Login: "/auth/signin",
				SignUp: "/auth/signup",
				ResetPassword: "/auth/reset-password",
				ForgotPassword: "/auth/forget-password",
				ChangePassword: "/auth/change-password",
			},
			// Users: {
			// 	GetUser: "/user/get-all",
			// 	LoggedInUserDetails: "/user/me",
			// 	UpdateProfileData: "/user/update-profile",
			// 	DeleteUser: "user/delete-user",
			// },
			// Roles: {
			// 	GetAllRoles: "/role/get-all",
			// 	GetRole: "/role",
			// 	CreateRole: "/role",
			// 	UpdateRole: "/role/update",
			// 	DeleteRole: "/role",
			// },
			// Permission: {
			// 	GetAllPermissions: "/permission/get-all",
			// 	CreatePermissions: "",
			// 	UpdatePermissions: "",
			// },
		},
		Method: {
			GET: "GET",
			PUT: "PUT",
			POST: "POST",
			PATCH: "PATCH",
			DELETE: "DELETE",
		},
		Header: {
			ContentType: "Content-Type",
			ApplicationJson: "application/json",
			Default: (token = "") => ({
				"Content-Type": "application/json",
				Accept: "application/json",
				Authorization: "Bearer " + token,
			}),
			Authorization: (token = "") => ({
				Authorization: "Bearer " + token,
			}),
			Type: {
				Json: "json",
				File: "file",
			},
		},
		ResponseType: { Blob: "blob", Json: "json" },
		StatusCode: {
			NotModified: 304,
			Unauthorized: 401,
			Forbidden: 403,
			NotFound: 404,
			InternalServerError: 500,
		},
	},
	Cookie: {
		Key: {
			User: "user",
			EncryptionKey: "logged_in_user",
		},
	},
	Permissions: {
		Admin: "Admin",
		User: "User",
	},
};
export default K;
