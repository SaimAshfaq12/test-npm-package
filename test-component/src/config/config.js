import Singleton from "../singleton/singleton";
import { DoormanInitializeUserPermissions } from "../permissions/initializeUserPermissions";

export const DoormanConfigure = async (config) => {
	var instance = Singleton.getInstance();

	console.log("Config", config);

	if (
		!config ||
		!config.userPoolId ||
		!config.clientId ||
		!config.apiGatewayUrl ||
		!config.cookieDomain
	) {
		console.error(
			"DoormanConfigure Error: User Pool ID, Client ID, API Gateway URL and Cookie Domain are required. Make sure you are passing all these in your config object"
		);
		return;
	}

	instance.configuration = config;

	config?.style?.primaryColor &&
		document.documentElement.style.setProperty(
			"--dmPrimaryColor",
			config.style.primaryColor
		);

	await DoormanInitializeUserPermissions();
};
