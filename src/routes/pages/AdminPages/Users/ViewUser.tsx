import { useContext, useEffect, useRef, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../../../../helpers/configs";

// Context and hooks
import useFetch from "../../../../hooks/useFetch";
import { UserContex } from "../../../../hooks/UserContex";

// components
import UserBasicInfo from "../../../../components/UserBasicInfo";

// types
import { UserAllInfoResponse } from "../../../../types/responses/UserList";

const ViewUser = () => {
	const loaded = useRef(false);
	const { UserInfo } = useContext(UserContex);
	const [user, setUser] = useState<UserAllInfoResponse | null>(null);
	const { id } = useParams();

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
		<div className="flex w-full justify-center p-3">
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
	);
};

export default ViewUser;
