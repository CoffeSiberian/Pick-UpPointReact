interface UserPayLoad {
	name: string;
	email: string;
	password?: string;
}

interface UserError {
	name: boolean;
	email: boolean;
	password: boolean;
}

interface UserDataPut {
	payload: UserPayLoad;
	error: UserError;
}

export interface UserForm {
	userForm: UserDataPut;
	setUserForm: (userForm: UserDataPut) => void;
}
