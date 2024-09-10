import { GridColDef } from "@mui/x-data-grid";
import { Users as UsersTypes } from "../../../../types/model";

interface Table {
	columns: GridColDef[];
	rows: UsersTypes[];
}

interface modalConfirm {
	open: boolean;
	url: string;
	message: string;
}
