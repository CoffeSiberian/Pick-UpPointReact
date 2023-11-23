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
interface UserError {
    rut: boolean;
    name: boolean;
    email: boolean;
    password: boolean;
}

interface UserData {
    payload: UserPayLoad;
    error: UserError;
}

interface UsersFormsProps {
    userForm: UserData;
    handleChangeText: (value: any, id: string) => void;
}
