import * as React from "react";
import Card from "@mui/material/Card";

import { Button } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import ErrorIcon from "@mui/icons-material/Error";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import "../ListaCompra/ListaCompras.css";
import { Stack } from "@mui/system";

export default function ListaCompras() {
  const navigate = useNavigate();
  const handleSearch = () => {
    navigate("/listaRecetas/listaRecetasTotal/" + 1);
  };

  const completa = false;
  return (
    <Card className="searchItem" sx={{ maxWidth: 345 }}>
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        <ListItem alignItems="flex-start">
          <ListItemAvatar></ListItemAvatar>
          <ListItemText
            className="namep"
            primary="Ensalada de papa"
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: "flex" }}
                  component="span"
                  variant="h6"
                  color="text.primary"
                >
                  <List>
                    <ListItem>Producto 1 </ListItem>
                    <ListItem>Producto 2 </ListItem>
                    <ListItem>Producto 3 </ListItem>
                    <ListItem>Producto 4 </ListItem>
                    <ListItem>Producto 5 </ListItem>
                  </List>
                </Typography>
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem alignItems="flex-start">
          <ListItemText
            className="ola"
            variant="h3"
            primary="Precio total "
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: "flex" }}
                  variant="h4"
                  color="text.primary"
                >
                  $10000
                </Typography>
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider variant="inset" component="li" />
      </List>
      {completa ? (
        <CheckIcon sx={{ color: "green" }} variant="primary" fontSize="large" />
      ) : (
        <ErrorIcon sx={{ color: "red" }} fontSize="large" />
      )}
      <Stack spacing={10} direction="row">
        <Button className="btn1" variant="contained">
          Eliminar
        </Button>
        <Button variant="contained" onClick={handleSearch}>
          Ver más
        </Button>
      </Stack>
    </Card>
  );
}
