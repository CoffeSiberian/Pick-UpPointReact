import { useContext, useEffect, useRef, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_URL } from "../../../../helpers/configs";
import classNames from "classnames";

// Context and hooks
import useFetch from "../../../../hooks/useFetch";
import { UserContex } from "../../../../hooks/UserContex";
import { DarkModeContex } from "../../../../hooks/DarkModeContex";

// MUI
import { Typography } from "@mui/material";
import { Portal } from "@mui/material";
import Button from "@mui/material/Button";

// modals
import UsersModalFormUpdate from "./UsersModalFormUpdate";
import ModalLoading from "../../../../components/ModalLoading";

// components
import UserBasicInfo from "../../../../components/UserBasicInfo";
import UserPurchaseList from "../../../../components/UserPurchaseList";
import ErrorPage from "../../../../components/ErrorPage";

// types
import { UserAllInfoResponse } from "../../../../types/responses/UserList";

// icons
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import EditIcon from "@mui/icons-material/Edit";

const ViewUser = () => {
	const loaded = useRef(false);
	const { UserInfo } = useContext(UserContex);
	const { themeTatailwind } = useContext(DarkModeContex);

	const [user, setUser] = useState<UserAllInfoResponse | null>(null);
	const [userModalUpdate, setuserModalUpdate] =
		useState<UserModalFormUpdateState>({
			open: false,
			userToEdit: {
				id: "",
				rut: "",
				name: "",
				email: "",
				isAdmin: false,
			},
		});

	const { id } = useParams();
	const navigate = useNavigate();

	const { response, loading, error } = useFetch(
		`${API_URL}/user/info/?id=${id}`,
		"GET"
	);

	const getUserInfo = useCallback(async () => {
		if (!UserInfo) return;

		const data: UserAllInfoResponse | null = await response({
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${UserInfo.token}`,
			},
		});

		if (!data) return;
		if (data.status === 200) {
			setUser(data);
		}
	}, [UserInfo, response]);

	useEffect(() => {
		if (!loaded.current && id) {
			getUserInfo();
			loaded.current = true;
		}
	}, [getUserInfo, id]);

	return (
		<>
			<Portal>
				<UsersModalFormUpdate
					open={userModalUpdate.open}
					openUserModalForm={(open) =>
						setuserModalUpdate({ ...userModalUpdate, open })
					}
					reloadPage={() => getUserInfo()}
					userToEdit={userModalUpdate.userToEdit}
				/>
				<ModalLoading open={loading} />
			</Portal>
			<div className="flex w-full justify-center">
				<div className="flex w-full max-w-4xl flex-col gap-3 p-3">
					<div
						className={classNames(
							"flex w-full justify-between",
							loading ? "hidden" : ""
						)}
					>
						<Button
							color="info"
							variant="contained"
							startIcon={<ArrowBackIosNewIcon />}
							onClick={() => navigate("/admin/users/")}
						>
							Atras
						</Button>
						<Button
							disabled={!user}
							color="primary"
							variant="contained"
							endIcon={<EditIcon />}
							onClick={() => {
								setuserModalUpdate({
									open: true,
									userToEdit: {
										id: user?.data.user.id || "",
										rut: user?.data.user.rut || "",
										name: user?.data.user.name || "",
										email: user?.data.user.email || "",
										isAdmin: user?.data.user.isAdmin || false,
									},
								});
							}}
						>
							Editar Usuario
						</Button>
					</div>
					<div className="flex flex-col justify-center gap-5">
						{user && (
							<>
								<UserBasicInfo
									name={user.data.user.name}
									rut={user.data.user.rut}
									email={user.data.user.email}
									totalPurchases={user.data.totalPurchases}
									totalSpent={user.data.totalSpent}
									isAdmin={user.data.user.isAdmin}
								/>
								<Typography
									className="flex justify-center"
									component="h4"
									variant="h4"
									color={themeTatailwind.primary.color}
								>
									<b>Compras</b>
								</Typography>
								<UserPurchaseList userId={user.data.user.id} />
							</>
						)}
						{error && (
							<ErrorPage
								title="Error"
								message="No se pudo cargar la información del usuario"
								footer="Intenta recargar la página"
							/>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default ViewUser;
