import { useState, useContext, FC } from "react";

// Context and hooks
import { UserContex } from "../../../../hooks/UserContex";
import { API_URL } from "../../../../helpers/configs";
import useFetch from "../../../../hooks/useFetch";

// MUI
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

// modals
import ModalLoading from "../../../../components/ModalLoading";
import ModalError from "../../../../components/ModalError";
import SnakeBarInfo from "../../../../components/SnakeBarInfo";

// components
import UsersForms from "./UsersForms";

// icons
import SaveAsIcon from "@mui/icons-material/SaveAs";
import CancelIcon from "@mui/icons-material/Cancel";
import CloseIcon from "@mui/icons-material/Close";

// schemas
import {
	userSchema,
	userRutSchema,
	userNameSchema,
	userEmailSchema,
	userPasswordSchema,
} from "../../../../schemas/userSch";

// types
import { StandarResponse } from "../../../../types/responses/StandarResponse";
import { ResponseError } from "../../../../types/responses/ResponseError";

const UsersModalFormCreate: FC<UserModalFormCreateProps> = ({
	open,
	openUserModalForm,
	reloadPage,
}) => {
	const { UserInfo } = useContext(UserContex);
	const { loading, response, succes, setSucces } = useFetch(
		`${API_URL}/user`,
		"POST"
	);

	const [Error, setError] = useState<ResponseError>({
		status: 200,
		message: "",
		error: false,
	});
	const [userForm, setUserForm] = useState<UserDataPost | UserDataPut>({
		payload: {
			rut: "",
			name: "",
			email: "",
			password: "",
		},
		error: {
			rut: false,
			name: false,
			email: false,
			password: false,
		},
	});

	const validateForm = async (): Promise<boolean> => {
		const RutValid = await userRutSchema.isValid({
			rut: userForm.payload.rut,
		});
		const NameValid = await userNameSchema.isValid({
			name: userForm.payload.name,
		});
		const EmailValid = await userEmailSchema.isValid({
			email: userForm.payload.email,
		});
		const PasswordValid = await userPasswordSchema.isValid({
			password: userForm.payload.password,
		});

		setUserForm({
			...userForm,
			error: {
				rut: !RutValid,
				name: !NameValid,
				email: !EmailValid,
				password: !PasswordValid,
			},
		});

		return await userSchema.isValid(userForm.payload);
	};

	const sendData = async () => {
		const valid = await validateForm();
		if (!valid) return;
		if (UserInfo === null) return;

		const data: StandarResponse | null = await response(
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${UserInfo.token}`,
				},
			},
			JSON.stringify(userForm.payload)
		);

		if (data === null) {
			setError({
				status: 500,
				message: "Error, Intenta mas tarde",
				error: true,
			});
			return;
		}

		if (data.status === 200) {
			openUserModalForm(false);
			reloadPage();
		} else if (data.status === 400 || data.status === 401) {
			setError({
				status: data.status,
				message: "Error, Credenciales invalidas",
				error: true,
			});
		} else {
			setError({
				status: data.status,
				message: "Error, Intenta mas tarde",
				error: true,
			});
		}
	};

	return (
		<>
			<ModalLoading open={loading} />
			<SnakeBarInfo
				open={Error.error}
				message={Error.message}
				severity="error"
				handleClose={() => setError({ ...Error, error: false })}
			/>
			<SnakeBarInfo
				open={succes}
				message="Usuario creado con exito"
				severity="success"
				handleClose={() => setSucces(false)}
			/>
			<ModalError
				open={Error.error}
				message={Error.message}
				setError={() => setError({ ...Error, error: false })}
			/>
			<Dialog
				open={open}
				keepMounted={false}
				onClose={() => openUserModalForm(false)}
				aria-labelledby="child-modal-title"
				aria-describedby="child-modal-description"
				scroll="paper"
				fullWidth
			>
				<DialogTitle className="flex justify-between">
					Agregar Usuario
					<IconButton
						aria-label="Cerrar ventana"
						onClick={() => openUserModalForm(false)}
					>
						<CloseIcon />
					</IconButton>
				</DialogTitle>
				<DialogContent>
					<UsersForms userForm={userForm} setUserForm={setUserForm} />
				</DialogContent>
				<DialogActions>
					<Button
						color="success"
						size="small"
						variant="contained"
						endIcon={<SaveAsIcon />}
						onClick={sendData}
					>
						Crear
					</Button>
					<Button
						color="info"
						size="small"
						variant="contained"
						endIcon={<CancelIcon />}
						onClick={() => {
							openUserModalForm(false);
						}}
					>
						Cancelar
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default UsersModalFormCreate;
