import { FC } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

// icons
import AbcIcon from "@mui/icons-material/Abc";

const SalesForms: FC<CategoriesFormsProps> = ({
    categoriesForm,
    handleChangeText,
}) => {
    return (
        <div className="flex flex-col gap-4 mt-2">
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
                onChange={(e) => handleChangeText(e.target.value, "name")}
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
