import { FC } from "react";

// MUI
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

// icons
import AbcIcon from "@mui/icons-material/Abc";

// actualmente sin utilizar
const SalesForms: FC<SalesFormsProps> = ({ salesForm, setSalesForm }) => {
	return (
		<div className="mt-2 flex flex-col gap-4">
			<TextField
				fullWidth
				autoComplete="off"
				id="name-user-add"
				color="info"
				label="Nombre Categoria"
				type="text"
				helperText={salesForm.error.name && "Nombre invalido"}
				error={salesForm.error.name}
				value={salesForm.payload.name}
				onChange={(e) =>
					setSalesForm({
						...salesForm,
						payload: {
							...salesForm.payload,
							name: e.target.value,
						},
					})
				}
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							<AbcIcon />
						</InputAdornment>
					),
				}}
			/>
		</div>
	);
};

export default SalesForms;
