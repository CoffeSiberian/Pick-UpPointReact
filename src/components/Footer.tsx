import { useContext } from "react";
import { DarkModeContex } from "../hooks/DarkModeContex";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import Link from "@mui/material/Link";
import { TITLE } from "../helpers/configs";

// icons
import FavoriteIcon from "@mui/icons-material/Favorite";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import GitHubIcon from "@mui/icons-material/GitHub";

const Footer = () => {
	const { darkMode } = useContext(DarkModeContex);
	const social = [
		{
			name: "Instagram",
			logo: <InstagramIcon />,
			link: "https://www.instagram.com/siberiancoffe/",
		},
		{
			name: "YouTube",
			logo: <YouTubeIcon />,
			link: "https://www.youtube.com/channel/UC2Ngs234UMfebl9GeCfwDWw",
		},
	];

	return (
		<div className="mb-4 mt-auto">
			<Paper
				elevation={24}
				sx={{
					backgroundColor: darkMode ? "#1f1f1f" : "#cfd3da",
				}}
			>
				<div className="flex flex-col items-center p-2 drop-shadow-md md:flex-row md:justify-center">
					<img className="mr-2 h-auto w-10" src="x" alt="logo" />
					<Typography variant="h4">
						<b>{TITLE}</b>
					</Typography>
				</div>
				<div className="flex justify-center gap-2 p-2">
					<Typography>Created with love and passion</Typography>
					<FavoriteIcon color="error" />
				</div>
				<div className="mb-3 mt-3 flex justify-center">
					<ul className="justify-end md:inline-flex">
						{social.map((obj) => (
							<li className="ml-3 mr-3" key={obj.name}>
								<Link
									className="flex items-center justify-start p-2 md:justify-center"
									color={darkMode ? "white" : "black"}
									href={obj.link}
									target="_blank"
									underline="none"
								>
									{obj.logo}
									<Typography variant="subtitle2">{obj.name}</Typography>
								</Link>
							</li>
						))}
					</ul>
				</div>

				<div className="mb-2 flex justify-center">
					<Link
						className="flex items-center justify-center gap-1 p-2"
						color={darkMode ? "white" : "black"}
						href="https://github.com/CoffeSiberian"
						target="_blank"
						underline="none"
					>
						<Typography variant="caption">
							by: <b>SiberianCoffe</b>
						</Typography>
						<GitHubIcon />
					</Link>
				</div>
			</Paper>
		</div>
	);
};

export default Footer;
