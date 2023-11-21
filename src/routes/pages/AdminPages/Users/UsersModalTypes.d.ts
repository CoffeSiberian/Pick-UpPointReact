interface UserModalFormProps {
    open: boolean;
    openUserModalForm: (open: boolean) => void;
    reloadPage: () => void;
}

interface UserToEdit {
    id: string;
    rut: string;
    name: string;
    email: string;
}

interface UserPayLoad {
    rut: string;
    name: string;
    email: string;
    password: string;
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
    handleChangeText: (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        id: string
    ) => void;
}
