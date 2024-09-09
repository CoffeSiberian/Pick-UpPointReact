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
        <div className="mt-auto mb-4">
            <Paper
                elevation={24}
                sx={{
                    backgroundColor: darkMode ? "#1f1f1f" : "#cfd3da",
                }}
            >
                <div className="flex flex-col items-center md:flex-row md:justify-center p-2 drop-shadow-md">
                    <img className="h-auto w-10 mr-2" src="x" alt="logo" />
                    <Typography variant="h4">
                        <b>{TITLE}</b>
                    </Typography>
                </div>
                <div className="flex justify-center p-2 gap-2">
                    <Typography>Created with love and passion</Typography>
                    <FavoriteIcon color="error" />
                </div>
                <div className="flex justify-center mb-3 mt-3">
                    <ul className="justify-end md:inline-flex">
                        {social.map((obj) => (
                            <li className="mr-3 ml-3" key={obj.name}>
                                <Link
                                    className="flex justify-start md:justify-center items-center p-2"
                                    color={darkMode ? "white" : "black"}
                                    href={obj.link}
                                    target="_blank"
                                    underline="none"
                                >
                                    {obj.logo}
                                    <Typography variant="subtitle2">
                                        {obj.name}
                                    </Typography>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="flex justify-center mb-2">
                    <Link
                        className="flex justify-center gap-1 items-center p-2"
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
