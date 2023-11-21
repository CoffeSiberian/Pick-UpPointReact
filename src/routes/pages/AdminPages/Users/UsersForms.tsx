import { FC } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

// icons
import NumbersIcon from "@mui/icons-material/Numbers";
import AbcIcon from "@mui/icons-material/Abc";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import KeyIcon from "@mui/icons-material/Key";

const UsersForms: FC<UsersFormsProps> = ({ userForm, handleChangeText }) => {
    return (
        <div className="flex flex-col gap-4 mt-2">
            <TextField
                fullWidth
                id="rut-user-add"
                autoComplete="off"
                color="info"
                label="RUT"
                type="text"
                helperText={userForm.error.rut && "Rut invalido"}
                error={userForm.error.rut}
                value={userForm.payload.rut}
                onChange={(e) => handleChangeText(e, "rut")}
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
                helperText={userForm.error.name && "Nombre invalido"}
                error={userForm.error.name}
                value={userForm.payload.name}
                onChange={(e) => handleChangeText(e, "name")}
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
                helperText={userForm.error.email && "Email invalido"}
                error={userForm.error.email}
                value={userForm.payload.email}
                onChange={(e) => handleChangeText(e, "email")}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <AlternateEmailIcon />
                        </InputAdornment>
                    ),
                }}
            />
            <TextField
                fullWidth
                id="password-user-add"
                autoComplete="off"
                color="info"
                label="Contraseña"
                type="password"
                helperText={userForm.error.password && "Minimo de 5 caracteres"}
                error={userForm.error.password}
                value={userForm.payload.password}
                onChange={(e) => handleChangeText(e, "password")}
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

export default UsersForms;
