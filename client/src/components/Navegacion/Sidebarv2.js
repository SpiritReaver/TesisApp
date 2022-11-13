import * as React from "react";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { List } from "@mui/material";
import { NavLink } from "react-router-dom";
import Button from "@mui/material/Button";
import useUser from "../../hooks/useUser";
import { useNavigate } from "react-router-dom";
import getUserInfo from "../../services/gerUserInfo";
import userUserId from "../../hooks/userUserId";

import "./Sidebar.css";

const drawerWidth = 240;

export default function Sidebarv2() {
  const NavStyle = {
    marginBottom: "1rem",

    width: "100%",
    padding: "2px",
    display: "inline-block",
    textAlign: "center",
    textDecoration: "none",
    color: "white",
  };
  const { logout } = useUser();
  const navigate = useNavigate();
  const { getUserId } = userUserId();

  const [name, setName] = useState("");
  const [isReadyForInstall, setIsReadyForInstall] = React.useState(true);

  async function downloadApp() {
    console.log("👍", "butInstall-clicked");
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) {
      console.log("oops, no prompt event guardado en window");
      return;
    }
    promptEvent.prompt();
    const result = await promptEvent.userChoice;
    console.log("👍", "userChoice", result);
    window.deferredPrompt = null;
    setIsReadyForInstall(false);
  }

  useEffect(() => {
    getUserId();
    window.addEventListener("beforeinstallprompt", (event) => {
      event.preventDefault();
      console.log("👍", "beforeinstallprompt", event);
      window.deferredPrompt = event;
      setIsReadyForInstall(true);
      console.log(isReadyForInstall);
    });
    setTimeout(() => {
      getUserInfo().then((res) => {
        setName(res.nombre);
      });
    }, 500);
  }, [getUserId, isReadyForInstall]);

  const handleClick = (e) => {
    e.preventDefault();
    console.log("cerrar sesion");
    logout();
    navigate("/");
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: "rgb(99, 224, 126)",
          color: "black",
        }}
      >
        <Toolbar>
          <Typography variant="h4" noWrap component="div">
            BogoFood &nbsp;
          </Typography>

          <Typography variant="subtitle2" noWrap component="div">
            La app que te cuida
          </Typography>

          {isReadyForInstall && (
            <Button variant="contained" onClick={downloadApp}>
              DESCARGAR
            </Button>
          )}

          <Typography variant="subtitle1">Bienvenido {name}</Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box className="sidebarv2" sx={{ overflow: "auto" }}>
          <List>
            <div>
              <ListItem>
                <NavLink to="/Inicio" style={NavStyle}>
                  <ListItemText>Inicio</ListItemText>
                </NavLink>
              </ListItem>
              <ListItem>
                <NavLink to="/Recetas" style={NavStyle}>
                  <ListItemText>Recetas</ListItemText>
                </NavLink>
              </ListItem>
              <ListItem>
                <NavLink to="/Historial" style={NavStyle}>
                  <ListItemText>Historial</ListItemText>
                </NavLink>
              </ListItem>
              <ListItem>
                <NavLink to="/ListaCompra" style={NavStyle}>
                  <ListItemText>Lista de Compra</ListItemText>
                </NavLink>
              </ListItem>
              <ListItem>
                <NavLink
                  to="/Usuario/"
                  onClick={(e) => {
                    e.preventDefault();
                    // eslint-disable-next-line no-useless-concat
                    navigate("/Usuario/" + `${localStorage.getItem("UserId")}`);
                  }}
                  style={NavStyle}
                >
                  <ListItemText>Usuario</ListItemText>
                </NavLink>
              </ListItem>
              <div className="sidebarv2logout">
                <ListItem>
                  <Button variant="contained" onClick={handleClick}>
                    Cerrar sesión
                  </Button>
                </ListItem>
              </div>
            </div>
          </List>
        </Box>
      </Drawer>
    </Box>
  );
}
