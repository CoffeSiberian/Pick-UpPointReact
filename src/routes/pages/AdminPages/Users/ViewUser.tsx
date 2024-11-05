import { useContext } from "react";
// import { useParams } from "react-router-dom";
import { DarkModeContex } from "../../../../hooks/DarkModeContex";
import { Typography } from "@mui/material";
import Chip from "@mui/material/Chip";
import classNames from "classnames";

// icons
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import TagIcon from "@mui/icons-material/Tag";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";

const ViewUser = () => {
	const { themeTatailwind } = useContext(DarkModeContex);
	// const { id } = useParams();

	return (
		<div className="flex w-full justify-center">
			<div className="flex max-w-2xl justify-center">
				<div className="flex w-full items-center gap-3">
					<AccountCircleIcon sx={{ fontSize: 128 }} color="action" />
					<div className="mr-1 flex flex-col justify-center">
						<Typography variant="h4" color={themeTatailwind.primary.color}>
							<p className="font-semibold">Fernando Garrido</p>
						</Typography>
						<Typography>
							<p
								className={classNames(
									"flex gap-1 font-normal tracking-tight",
									themeTatailwind.secondary.text_color
								)}
							>
								<TagIcon />
								20.596.659-5
							</p>
						</Typography>
						<Typography>
							<p
								className={classNames(
									"flex gap-1 font-normal tracking-tight",
									themeTatailwind.secondary.text_color
								)}
							>
								<AlternateEmailIcon />
								siberiancoffe@outlook.cl
							</p>
						</Typography>
					</div>
					<Chip color="primary" label="Admin" />
				</div>
			</div>
		</div>
	);
};

export default ViewUser;
