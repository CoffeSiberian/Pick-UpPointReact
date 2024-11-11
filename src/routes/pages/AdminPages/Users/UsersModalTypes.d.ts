interface UserModalFormCreateProps {
	open: boolean;
	openUserModalForm: (open: boolean) => void;
	reloadPage: () => void;
}

interface UserModalFormUpdateProps {
	open: boolean;
	openUserModalForm: (open: boolean) => void;
	reloadPage: () => void;
	userToEdit: UserToEdit;
}

interface UserModalSalesProps {
	open: boolean;
	username: string;
	userId: string;
	openUserSalesProps: (open: boolean) => void;
}

interface UserModalFormUpdateState {
	open: boolean;
	userToEdit: UserToEdit;
}

interface UserToEdit {
	id: string;
	rut: string;
	name: string;
	email: string;
	isAdmin: boolean;
}

interface UserPayLoad {
	id?: string;
	rut: string;
	name: string;
	email: string;
	password: string;
	isAdmin?: boolean;
}

type UserPayLoadOptionalPassword = Omit<UserPayLoad, "password"> &
	Partial<Pick<UserPayLoad, "password">>;

interface UserError {
	rut: boolean;
	name: boolean;
	email: boolean;
	password: boolean;
}

interface UserDataPost {
	payload: UserPayLoad;
	error: UserError;
}

interface UserDataPut {
	payload: UserPayLoadOptionalPassword;
	error: UserError;
}

interface UsersFormsProps {
	userForm: UserData;
	setUserForm: (userForm: UserData) => void;
}
