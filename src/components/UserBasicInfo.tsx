import { FC, useContext } from "react";
import classNames from "classnames";

// Context and hooks
import { DarkModeContex } from "../hooks/DarkModeContex";

// MUI
import { Typography } from "@mui/material";
import Chip from "@mui/material/Chip";

// icons
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import TagIcon from "@mui/icons-material/Tag";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

interface UserBasicInfoProps {
	name: string;
	rut: string;
	email: string;
	totalPurchases: number;
	totalSpent: number;
	isAdmin: boolean;
}

const UserBasicInfo: FC<UserBasicInfoProps> = ({
	name,
	rut,
	email,
	totalPurchases,
	totalSpent,
	isAdmin,
}) => {
	const { themeTatailwind } = useContext(DarkModeContex);

	return (
		<div
			className={classNames(
				"flex flex-col items-center gap-2 rounded-lg p-5",
				themeTatailwind.secondary.main
			)}
		>
			<div className="flex w-full flex-col items-center gap-3 md:flex-row">
				<AccountCircleIcon sx={{ fontSize: 128 }} color="action" />
				<div className="mr-1 flex flex-col justify-center">
					<Typography
						component="h4"
						variant="h4"
						color={themeTatailwind.primary.color}
					>
						<p className="font-semibold">{name}</p>
					</Typography>
					<Typography component="a">
						<p
							className={classNames(
								"flex gap-1 font-normal tracking-wide",
								themeTatailwind.secondary.text_color
							)}
						>
							<TagIcon />
							{rut}
						</p>
					</Typography>
					<Typography component="a">
						<p
							className={classNames(
								"flex gap-1 font-normal tracking-wide",
								themeTatailwind.secondary.text_color
							)}
						>
							<AlternateEmailIcon />
							{email}
						</p>
					</Typography>
				</div>
				{isAdmin ? (
					<Chip color="primary" label="Admin" />
				) : (
					<Chip label="User" />
				)}
			</div>
			<div className="flex w-full justify-between">
				<div className="flex flex-row items-center">
					<Typography component="a" color={themeTatailwind.primary.color}>
						<ShoppingCartIcon className="mr-1" />
					</Typography>
					<Typography component="a" color={themeTatailwind.primary.color}>
						<p>Total de compras</p>
						<Typography variant="h5">
							<b>
								<p>{totalPurchases}</p>
							</b>
						</Typography>
					</Typography>
				</div>
				<div className="flex flex-row items-center">
					<Typography component="a" color={themeTatailwind.primary.color}>
						<AttachMoneyIcon />
					</Typography>
					<Typography component="a" color={themeTatailwind.primary.color}>
						<p>Total Gastado</p>
						<Typography variant="h5">
							<b>
								<p>{totalSpent}</p>
							</b>
						</Typography>
					</Typography>
				</div>
			</div>
		</div>
	);
};

export default UserBasicInfo;
