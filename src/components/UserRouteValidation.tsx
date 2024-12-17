import { ComponentType, useContext } from "react";
import { UserContex } from "../hooks/UserContex";
import ErrorPage from "./ErrorPage";

interface UserRouteValidationProps {
	element: ComponentType<unknown>;
	[key: string]: unknown;
}

const UserRouteValidation = ({
	element: Component,
	...rest
}: UserRouteValidationProps) => {
	const { UserInfo } = useContext(UserContex);

	return UserInfo !== null && UserInfo.isAdmin ? (
		<Component {...rest} />
	) : (
		<ErrorPage
			title="Acceso denegado"
			message="No tienes permisos para acceder a esta sección"
			footer="Si crees que esto es un error, contacta con el administrador"
		/>
	);
};

export default UserRouteValidation;
