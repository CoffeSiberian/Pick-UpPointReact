import { GridColDef } from "@mui/x-data-grid";
import { Products as ProductsTypes } from "../../../../types/model";

interface Table {
	columns: GridColDef[];
	rows: ProductsTypes[];
}

interface modalConfirm {
	open: boolean;
	url: string;
	message: string;
}
