import * as React from "react";
import Card from "@mui/material/Card";

import { Button } from "@mui/material";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

import "../ListaCompra/ListaCompras.css";
import { Stack } from "@mui/system";

export default function ListaCompras() {
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate("/listaRecetas/listaRecetasTotal/" + 1);
  };

  return (
    <Card className="searchItem" sx={{ maxWidth: 345 }}>
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar
              alt="Receta1"
              src="https://www.annarecetasfaciles.com/files/patatas-feria-1-2-815x458.jpg"
            />
          </ListItemAvatar>
          <ListItemText
            primary="Receta 1"
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: "flex" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  Ensalada de papa
                </Typography>
                {"Producto 1"}
                {"Producto 2"}
                {"Producto 3"}
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar
              alt="Receta2"
              src="https://www.annarecetasfaciles.com/files/patatas-feria-1-2-815x458.jpg"
            />
          </ListItemAvatar>
          <ListItemText
            primary="Receta 2"
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: "flex" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  Ensalada de col
                </Typography>
                <List>
                  {"Producto 1 "}
                  {"Producto 2 "}
                  {"Producto 3 "}
                </List>
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar
              alt="Receta2"
              src="https://www.annarecetasfaciles.com/files/patatas-feria-1-2-815x458.jpg"
            />
          </ListItemAvatar>
          <ListItemText
            primary="Receta 3"
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: "flex" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  Ensalada de pasta
                </Typography>
                <List>
                  {"Producto 1 "}
                  {"Producto 2 "}
                  {"Producto 3 "}
                </List>
              </React.Fragment>
            }
          />
        </ListItem>
      </List>
      <Stack spacing={10} direction="row">
        <Button className="btn1" variant="contained">
          Editar
        </Button>
        <Button variant="contained" onClick={handleSearch}>
          Confirmar
        </Button>
      </Stack>
    </Card>
  );
}
