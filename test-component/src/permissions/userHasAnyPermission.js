import Singleton from "../singleton/singleton";

export const DoormanUserHasAnyPermission = (permissions) => {
	var instance = Singleton.getInstance();

	const userPermissions = instance?.configuration?.userPermissions;

	if (!userPermissions || userPermissions.length === 0) {
		return false;
	}

	// Check if the user has all the specified permissions
	const hasAnyPermission = permissions?.some((permission) =>
		userPermissions.some(
			(userPermission) => userPermission.permissionCode === permission
		)
	);

	return hasAnyPermission;
};
