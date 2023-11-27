interface CategoriesModalFormCreateProps {
    open: boolean;
    openUserModalForm: (open: boolean) => void;
    reloadPage: () => void;
}

interface CategoriesModalFormUpdateProps {
    open: boolean;
    openUserModalForm: (open: boolean) => void;
    reloadPage: () => void;
    userToEdit: UserToEdit;
}

interface CategoriesModalFormUpdateState {
    open: boolean;
    userToEdit: UserToEdit;
}

interface CategoriesToEdit {
    id: string;
    rut: string;
    name: string;
    email: string;
    isAdmin: boolean;
}

interface CategoriesPayLoad {
    id?: string;
    rut: string;
    name: string;
    email: string;
    password: string;
    isAdmin?: boolean;
}
interface CategoriesError {
    rut: boolean;
    name: boolean;
    email: boolean;
    password: boolean;
}

interface CategoriesData {
    payload: CategoriesPayLoad;
    error: CategoriesError;
}

interface CategoriesFormsProps {
    CategoriesForm: CategoriesData;
    handleChangeText: (value: any, id: string) => void;
}
