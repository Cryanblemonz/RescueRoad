import * as React from "react";
import { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import PetsOutlinedIcon from "@mui/icons-material/PetsOutlined";
import { Link } from "react-router-dom";
import axios from "axios";

const styleforButton = {
    display: "block",
    background: "#e093ff",
    color: "black",
    border: "1px solid black",
    position: "absolute",
    right: "30px",
    top: "10px",
};

const styleForSmallScreenButton = {
    display: "block",
    background: "#e093ff",
    color: "black",
    border: "1px solid black",
};

function ResponsiveAppBar() {
    const signout = () => {
        axios.post("/api/signout");
    };

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    useEffect(() => {
        axios
            .get("/api/checkLogin", { withCredentials: true })
            .then((res) => {
                setIsLoggedIn(res.data.isLoggedIn);
            })
            .catch((err) => {
                console.error(err);
                setIsLoggedIn(false);
            });
    }, []);

    const pages = !isLoggedIn ? ["Signup"] : ["Upload"];
    const settings = ["Profile", "Account", "Dashboard", "Logout"];

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <PetsOutlinedIcon
                        style={{ transform: "rotate(-10deg)" }}
                        sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
                    />
                    <Typography
                        variant="h4"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: "none", md: "flex" },
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            color: "inherit",
                            textDecoration: "none",
                        }}>
                        RescueRoad
                    </Typography>

                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "flex", md: "none" },
                        }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit">
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: "block", md: "none" },
                            }}>
                            {isLoggedIn ? (
                                <MenuItem component={Link} to={"/upload"}>
                                    <Typography textAlign="center">
                                        Upload
                                    </Typography>
                                </MenuItem>
                            ) : (
                                <MenuItem component={Link} to={"/signup"}>
                                    <Typography textAlign="center">
                                        Sign in
                                    </Typography>
                                </MenuItem>
                            )}
                            <MenuItem component={Link} to={"/LikedPets"}>
                                <Typography textAlign="center">
                                    Liked Pets
                                </Typography>
                            </MenuItem>
                            <MenuItem>
                                {isLoggedIn && (
                                    <form onSubmit={signout}>
                                        <Button
                                            type="submit"
                                            style={styleForSmallScreenButton}>
                                            Signout
                                        </Button>
                                    </form>
                                )}
                            </MenuItem>
                        </Menu>
                    </Box>
                    <PetsOutlinedIcon
                        sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
                    />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: "flex", md: "none" },
                            flexGrow: 1,
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            color: "inherit",
                            textDecoration: "none",
                        }}></Typography>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "none", md: "flex" },
                        }}>
{isLoggedIn ? (
                                <MenuItem component={Link} to={"/upload"}>
                                    <Typography textAlign="center">
                                        Upload
                                    </Typography>
                                </MenuItem>
                            ) : (
                                <MenuItem component={Link} to={"/signup"}>
                                    <Typography textAlign="center">
                                        Sign in
                                    </Typography>
                                </MenuItem>
                            )}
                            <MenuItem component={Link} to={"/LikedPets"}>
                                <Typography textAlign="center">
                                    Liked Pets
                                </Typography>
                            </MenuItem>

                        {isLoggedIn && (
                            <form onSubmit={signout}>
                                <Button
                                    id="signout-button"
                                    type="submit"
                                    style={styleforButton}>
                                    Signout
                                </Button>
                            </form>
                        )}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton
                                onClick={handleOpenUserMenu}
                                sx={{ p: 0 }}></IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: "45px" }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}>
                            {settings.map((setting) => (
                                <MenuItem
                                    key={setting}
                                    onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center">
                                        {setting}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default ResponsiveAppBar;
