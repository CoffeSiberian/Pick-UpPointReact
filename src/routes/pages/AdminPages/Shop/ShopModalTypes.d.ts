interface ShopModalFormCreateProps {
    open: boolean;
    openUserModalForm: (open: boolean) => void;
    reloadPage: () => void;
}

interface ShopModalFormUpdateProps {
    open: boolean;
    openUserModalForm: (open: boolean) => void;
    reloadPage: () => void;
    userToEdit: UserToEdit;
}

interface ShopModalFormUpdateState {
    open: boolean;
    userToEdit: UserToEdit;
}

interface ShopToEdit {
    id: string;
    rut: string;
    name: string;
    email: string;
    isAdmin: boolean;
}

interface ShopPayLoad {
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

interface ShopData {
    payload: ShopPayLoad;
    error: UserError;
}

interface ShopFormsProps {
    shopForm: ShopData;
    handleChangeText: (value: any, id: string) => void;
}
