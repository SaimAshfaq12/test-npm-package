import CryptoJS from "crypto-js";
import Cookies from "js-cookie";
import NetworkCall from "../network/networkCall";
import Request from "../network/request";
import { saveUserData } from "../redux/user/userSlice";
import K from "../utilities/constants";

export default class User {
	static awsLogin(email, remember, authTokens, dispatch) {
		const token = {
			accessToken: authTokens.accessToken.jwtToken,
			idToken: authTokens.idToken.jwtToken,
			email,
		};
		// console.log("user....", token);
		let encryptedUser = CryptoJS.AES.encrypt(
			JSON.stringify(token),
			K.Cookie.Key.EncryptionKey
		).toString();

		Cookies.set(K.Cookie.Key.User, encryptedUser, {
			path: "/",
			domain: "localhost",
			expires: remember ? 365 : "",
		});

		const body = {};
		const request = new Request(
			K.Network.URL.Auth.Login,
			K.Network.Method.POST,
			body,
			K.Network.Header.Type.Json,
			{
				Authorization: `Bearer ${token.idToken}`,
			},
			false,
			K.Network.ResponseType.Json,
			true
		);
		dispatch(saveUserData(token));
		return NetworkCall.fetch(request);

		// * here we can store loggedIn user date to redux store
	}

	static awsSignupCall(idToken) {
		const role = ["USER"];
		const body = { idToken, role };
		const request = new Request(
			K.Network.URL.Auth.SignUp,
			K.Network.Method.POST,
			body,
			K.Network.Header.Type.Json,
			{
				Authorization: `Bearer ${idToken}`,
			},
			false,
			K.Network.ResponseType.Json,
			true
		);
		return NetworkCall.fetch(request);
	}

	// * Helpers

	static getUserObjectFromCookies() {
		let cookieUser = Cookies.get(K.Cookie.Key.User);
		let bytes = cookieUser
			? CryptoJS.AES.decrypt(cookieUser, K.Cookie.Key.EncryptionKey)
			: "{}";

		try {
			let utfBytes = bytes.toString(CryptoJS.enc.Utf8);
			return JSON.parse(utfBytes);
		} catch (error) {
			console.log("error", error);
			return this.logoutCall("User unauthorized");
		}
	}

	static clearUserCookie() {
		Cookies.remove(K.Cookie.Key.User, {
			path: "/",
			domain: K.Network.URL.Client.BaseHost,
		});
	}

	static isTokenAvailable() {
		return this.getUserObjectFromCookies().accessToken ? true : false;
	}

	static getId() {
		return this.getUserObjectFromCookies().idToken ?? "";
	}

	static getToken() {
		return this.getUserObjectFromCookies().accessToken ?? "";
	}

	static getFullName() {
		const { firstName, lastName } = this.getUserObjectFromCookies();
		return firstName?.concat(" ", lastName) ?? "";
	}

	static getEmail() {
		return this.getUserObjectFromCookies().email ?? "";
	}

	static getTenant() {
		return this.getUserObjectFromCookies().tenant?.domainPrefix ?? "";
	}
	static isAdmin() {
		console.log("Cookie", this.getUserObjectFromCookies());
		return this.getUserObjectFromCookies()?.user?.role?.name === "ADMIN"
			? true
			: false;
	}
}
