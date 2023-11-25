import { FC } from "react";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import InputAdornment from "@mui/material/InputAdornment";
import FormControlLabel from "@mui/material/FormControlLabel";

// icons
import NumbersIcon from "@mui/icons-material/Numbers";
import AbcIcon from "@mui/icons-material/Abc";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import KeyIcon from "@mui/icons-material/Key";

const ShopForms: FC<ShopFormsProps> = ({ shopForm, handleChangeText }) => {
    return (
        <div className="flex flex-col gap-4 mt-2">
            <TextField
                fullWidth
                id="rut-user-add"
                autoComplete="off"
                color="info"
                label="RUT"
                type="text"
                helperText={shopForm.error.rut && "Rut invalido"}
                error={shopForm.error.rut}
                value={shopForm.payload.rut}
                onChange={(e) => handleChangeText(e.target.value, "rut")}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <NumbersIcon />
                        </InputAdornment>
                    ),
                }}
            />
            <TextField
                fullWidth
                autoComplete="off"
                id="name-user-add"
                color="info"
                label="Nombre"
                type="text"
                helperText={shopForm.error.name && "Nombre invalido"}
                error={shopForm.error.name}
                value={shopForm.payload.name}
                onChange={(e) => handleChangeText(e.target.value, "name")}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <AbcIcon />
                        </InputAdornment>
                    ),
                }}
            />
            <TextField
                fullWidth
                autoComplete="off"
                id="email-user-add"
                color="info"
                label="Email"
                type="text"
                helperText={shopForm.error.email && "Email invalido"}
                error={shopForm.error.email}
                value={shopForm.payload.email}
                onChange={(e) => handleChangeText(e.target.value, "email")}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <AlternateEmailIcon />
                        </InputAdornment>
                    ),
                }}
            />
            {shopForm.payload.isAdmin !== undefined && (
                <FormControlLabel
                    control={
                        <Checkbox
                            color="info"
                            checked={shopForm.payload.isAdmin}
                            onChange={(e) =>
                                handleChangeText(e.target.checked, "isAdmin")
                            }
                            inputProps={{ "aria-label": "Es Administrador" }}
                        />
                    }
                    label="Es administrador"
                />
            )}
            <TextField
                fullWidth
                id="password-user-add"
                autoComplete="off"
                color="info"
                label="Contraseña"
                type="password"
                helperText={shopForm.error.password && "Minimo de 5 caracteres"}
                error={shopForm.error.password}
                value={shopForm.payload.password}
                onChange={(e) => handleChangeText(e.target.value, "password")}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <KeyIcon />
                        </InputAdornment>
                    ),
                }}
            />
        </div>
    );
};

export default ShopForms;
