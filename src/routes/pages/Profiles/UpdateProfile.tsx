import { useState, FC, useEffect, useContext } from "react";

// Context and hooks
import { UserContex } from "../../../hooks/UserContex";
import { API_URL } from "../../../helpers/configs";
import useFetch from "../../../hooks/useFetch";

// MUI
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

// modals
import ModalLoading from "../../../components/ModalLoading";
import ModalError from "../../../components/ModalError";

// components
import SnakeBarInfo from "../../../components/SnakeBarInfo";
import UsersForms from "./UsersForms";

// icons
import SaveAsIcon from "@mui/icons-material/SaveAs";
import CancelIcon from "@mui/icons-material/Cancel";
import CloseIcon from "@mui/icons-material/Close";

// schemas
import {
	userSchemaProfile,
	userNameSchema,
	userEmailSchema,
	userPasswordSchema,
} from "../../../schemas/userSch";

// types
import { StandarResponse } from "../../../types/responses/StandarResponse";
import { ResponseError } from "../../../types/responses/ResponseError";
import { UserDataPut, UserPayLoad } from "./UpdateUserTypes";

interface UpdateProfileProps {
	open: boolean;
	openUserModalForm: (open: boolean) => void;
	reloadPage: () => void;
	userToEdit: UserPayLoad;
}

const UpdateProfile: FC<UpdateProfileProps> = ({
	open,
	openUserModalForm,
	reloadPage,
	userToEdit,
}) => {
	const { UserInfo } = useContext(UserContex);
	const { loading, response, succes, setSucces } = useFetch(
		`${API_URL}/user/profile`,
		"PUT"
	);

	const [Error, setError] = useState<ResponseError>({
		status: 200,
		message: "",
		error: false,
	});
	const [userForm, setUserForm] = useState<UserDataPut>({
		payload: {
			name: "",
			email: "",
			password: "",
		},
		error: {
			name: false,
			email: false,
			password: false,
		},
	});

	const validateForm = async (): Promise<boolean> => {
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
				name: !NameValid,
				email: !EmailValid,
				password: !PasswordValid,
			},
		});

		return await userSchemaProfile.isValid(userForm.payload);
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

	useEffect(() => {
		if (!userToEdit) return;
		if (!open) return;

		setUserForm({
			payload: {
				name: userToEdit.name,
				email: userToEdit.email,
			},
			error: {
				name: false,
				email: false,
				password: false,
			},
		});
	}, [userToEdit, open]);

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
				message="Usuario actualizado con exito"
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
					Actualizar Usuario
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
						Actualizar
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

export default UpdateProfile;
