import { FC } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

// icons
import AbcIcon from "@mui/icons-material/Abc";

const CategoriesForms: FC<CategoriesFormsProps> = ({
	categoriesForm,
	setCategoriesForm,
}) => {
	return (
		<div className="mt-2 flex flex-col gap-4">
			<TextField
				fullWidth
				autoComplete="off"
				id="name-user-add"
				color="info"
				label="Nombre Categoria"
				type="text"
				helperText={categoriesForm.error.name && "Nombre invalido"}
				error={categoriesForm.error.name}
				value={categoriesForm.payload.name}
				onChange={(e) =>
					setCategoriesForm({
						...categoriesForm,
						payload: {
							...categoriesForm.payload,
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

export default CategoriesForms;
