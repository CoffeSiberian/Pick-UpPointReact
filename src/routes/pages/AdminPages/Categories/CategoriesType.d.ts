import { GridColDef } from "@mui/x-data-grid";
import { Categories as CategoriesTypes } from "../../../../types/model";

interface Table {
	columns: GridColDef[];
	rows: CategoriesTypes[];
}

interface modalConfirm {
	open: boolean;
	url: string;
	message: string;
}
