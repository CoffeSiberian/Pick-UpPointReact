import { FC } from "react";

// MUI
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

// icons
import AbcIcon from "@mui/icons-material/Abc";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import KeyIcon from "@mui/icons-material/Key";

// types
import { UserForm, UserPayLoad } from "./UpdateUserTypes";

const UsersForms: FC<UserForm> = ({ userForm, setUserForm }) => {
	const setValuePassword = (value: string) => {
		if (value.length === 0) {
			const newUserForm: UserPayLoad = {
				name: userForm.payload.name,
				email: userForm.payload.email,
			};

			setUserForm({
				...userForm,
				payload: newUserForm,
			});
		} else {
			setUserForm({
				...userForm,
				payload: {
					...userForm.payload,
					password: value,
				},
			});
		}
	};

	return (
		<div className="mt-2 flex flex-col gap-4">
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
				onChange={(e) =>
					setUserForm({
						...userForm,
						payload: {
							...userForm.payload,
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
				onChange={(e) =>
					setUserForm({
						...userForm,
						payload: {
							...userForm.payload,
							email: e.target.value,
						},
					})
				}
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
				value={userForm.payload.password || ""}
				onChange={(e) => setValuePassword(e.target.value)}
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
