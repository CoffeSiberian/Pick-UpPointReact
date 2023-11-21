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
    rut: string;
    name: string;
    email: string;
    password: string;
}

interface UserPayLoadUpdate {
    id: string;
    rut: string;
    name: string;
    email: string;
    password: string;
    isAdmin: boolean;
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

interface UserDataUpdate {
    payload: UserPayLoadUpdate;
    error: UserError;
}

interface UsersFormsProps {
    userForm: UserData;
    handleChangeText: (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        id: string
    ) => void;
}
