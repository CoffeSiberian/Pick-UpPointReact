import { GridColDef } from "@mui/x-data-grid";
import { PurchaseListResponseObject } from "../../../../types/responses/PurchaseList";

interface Table {
    columns: GridColDef[];
    rows: PurchaseListResponseObject[];
}
