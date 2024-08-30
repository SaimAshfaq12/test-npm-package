import Singleton from "../singleton/singleton";

export const DoormanUserHasAllPermissions = (permissions) => {
	var instance = Singleton.getInstance();

	const userPermissions = instance?.configuration?.userPermissions;

	if (!userPermissions || userPermissions.length === 0) {
		return false;
	}

	// Check if the user has all the specified permissions
	const hasAllPermissions = permissions?.every((permission) =>
		userPermissions.some(
			(userPermission) => userPermission.permissionCode === permission
		)
	);

	return hasAllPermissions;
};
