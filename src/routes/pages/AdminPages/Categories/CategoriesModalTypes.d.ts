interface CategoriesModalFormCreateProps {
    open: boolean;
    openUserModalForm: (open: boolean) => void;
    reloadPage: () => void;
}

interface CategoriesModalFormUpdateProps {
    open: boolean;
    openCategoriesModalForm: (open: boolean) => void;
    reloadPage: () => void;
    categoriesToEdit: CategoriesToEdit;
}

interface CategoriesModalFormUpdateState {
    open: boolean;
    categoriesToEdit: CategoriesToEdit;
}

interface CategoriesToEdit {
    id: string;
    name: string;
}

interface CategoriesPayLoad {
    id?: string;
    name: string;
}

interface CategoriesError {
    name: boolean;
}

interface CategoriesData {
    payload: CategoriesPayLoad;
    error: CategoriesError;
}

interface CategoriesFormsProps {
    categoriesForm: CategoriesData;
    setCategoriesForm: (categoriesForm: CategoriesData) => void;
}
