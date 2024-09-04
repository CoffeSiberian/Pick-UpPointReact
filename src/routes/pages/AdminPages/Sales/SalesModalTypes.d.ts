interface SalesModalFormUpdateProps {
    open: boolean;
    openSalesModalForm: (open: boolean) => void;
    reloadPage: () => void;
    categoriesToEdit: SalesToEdit;
}

interface SalesModalFormUpdateState {
    open: boolean;
    categoriesToEdit: SalesToEdit;
}

interface SalesToEdit {
    id: string;
    name: string;
}

interface SalesPayLoad {
    id?: string;
    name: string;
}
interface SalesError {
    name: boolean;
}

interface SalesData {
    payload: SalesPayLoad;
    error: SalesError;
}

interface SalesFormsProps {
    SalesForm: SalesData;
    handleChangeText: (value: string, id: string) => void;
}
