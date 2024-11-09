import { useContext, useEffect, useRef, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_URL } from "../../../../helpers/configs";

// Context and hooks
import useFetch from "../../../../hooks/useFetch";
import { UserContex } from "../../../../hooks/UserContex";

// MUI
import { Portal } from "@mui/material";
import Button from "@mui/material/Button";

// modals
import UsersModalFormUpdate from "./UsersModalFormUpdate";

// components
import UserBasicInfo from "../../../../components/UserBasicInfo";

// types
import { UserAllInfoResponse } from "../../../../types/responses/UserList";

// icons
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import EditIcon from "@mui/icons-material/Edit";

const ViewUser = () => {
	const loaded = useRef(false);
	const { UserInfo } = useContext(UserContex);

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

	const { response } = useFetch(`${API_URL}/user/info/?id=${id}`, "GET");

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
			</Portal>
			<div className="flex w-full justify-center">
				<div className="flex max-w-4xl flex-col gap-3 p-3">
					<div className="flex w-full justify-between">
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
					<div className="flex max-w-2xl justify-center">
						{user && (
							<UserBasicInfo
								name={user.data.user.name}
								rut={user.data.user.rut}
								email={user.data.user.email}
								totalPurchases={user.data.totalPurchases}
								totalSpent={user.data.totalSpent}
								isAdmin={user.data.user.isAdmin}
							/>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default ViewUser;
