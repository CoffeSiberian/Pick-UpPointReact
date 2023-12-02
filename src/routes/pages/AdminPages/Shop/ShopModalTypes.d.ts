interface ProductModalFormCreateProps {
    open: boolean;
    openProductModalForm: (open: boolean) => void;
    reloadPage: () => void;
}

interface ProductModalFormUpdateProps {
    open: boolean;
    openProductModalForm: (open: boolean) => void;
    reloadPage: () => void;
    productToEdit: ProductToEdit;
}

interface ProductModalFormUpdateState {
    open: boolean;
    productToEdit: ProductToEdit;
}

interface ProductToEdit {
    id: string;
    name: string;
    description: string;
    price: number;
    fk_category: string;
}

interface ProductPayLoad {
    id?: string;
    name: string;
    description: string;
    price: number;
    fk_category: string;
}

interface ProductError {
    name: boolean;
    description: boolean;
    price: boolean;
    fk_category: boolean;
}

interface ProductData {
    payload: ProductPayLoad;
    error: ProductError;
}

interface ProductFormsProps {
    productForm: ProductData;
    handleChangeText: (value: any, id: string) => void;
}
