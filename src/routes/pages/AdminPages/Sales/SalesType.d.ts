import { GridColDef } from "@mui/x-data-grid";
import { PurchaseListResponseObject } from "../../../../types/responses/PurchaseList";

export interface Table {
	columns: GridColDef[];
	rows: PurchaseListResponseObject[];
}
