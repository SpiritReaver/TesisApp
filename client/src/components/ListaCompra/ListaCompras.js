import * as React from "react";
import Card from "@mui/material/Card";
import { useEffect, useState, useContext } from "react";
import { Button } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import ErrorIcon from "@mui/icons-material/Error";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import "../ListaCompra/ListaCompras.css";
import { Stack } from "@mui/system";
import axios from "axios";
import Context from "../../context/UserIdContext";
import DeleteListaCompra from "../../services/DeleteListaCompra";

export default function ListaCompras() {
  const navigate = useNavigate();

  const [listas, setListas] = useState([]);
  const [hidden, hiddenSet] = useState([]);
  const { UserId } = useContext(Context);

  function hideMe(id) {
    const newArray = hidden.concat(id);
    hiddenSet(newArray);
  }

  useEffect(() => {
    axios
      .get(
        "https://api-kgk5.onrender.com/api/users/" + UserId + "/listascompras"
      )
      .then((res) => {
        setListas(res.data.listasCompras);
      });
  }, [UserId]);

  const data = Object.values(listas);

  return data
    .filter((listasCompras) => {
      return hidden.indexOf(listasCompras.id) === -1;
    })
    .map((listasCompras) => (
      <React.Fragment key={listasCompras.id}>
        <Card className="searchItem" sx={{ maxWidth: 345 }}>
          <List sx={{ width: "100%", maxWidth: 360 }}>
            <ListItem alignItems="flex-start">
              <ListItemText
                className="namep"
                primary={listasCompras.nombre}
                component={"span"}
                secondary={
                  <>
                    {listasCompras.Productos.map((Productos) => {
                      return (
                        <React.Fragment key={Productos.id}>
                          <Typography
                            sx={{ display: "flex" }}
                            variant="h6"
                            component="span"
                            color="text.primary"
                          ></Typography>
                          <List component={"span"}>
                            <ListItem component={"span"}>
                              {Productos.producto}{" "}
                            </ListItem>
                          </List>
                        </React.Fragment>
                      );
                    })}
                  </>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem alignItems="flex-start">
              <ListItemText
                className="ola"
                variant="h3"
                component={"span"}
                primary="Precio total "
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "flex" }}
                      variant="h4"
                      component={"span"}
                      color="text.primary"
                    >
                      {listasCompras.precioTotal}
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </List>
          <>
            {listasCompras.completa ? (
              <CheckIcon
                sx={{ color: "green" }}
                variant="primary"
                fontSize="large"
              />
            ) : (
              <ErrorIcon sx={{ color: "red" }} fontSize="large" />
            )}
          </>
          <Stack spacing={10} direction="row">
            <Button
              className="btn1"
              variant="contained"
              onClick={(e) => {
                e.preventDefault();
                hideMe(listasCompras.id);
                setTimeout(() => {
                  DeleteListaCompra(listasCompras.id);
                }, 1000);
              }}
            >
              Eliminar
            </Button>
            <Button
              variant="contained"
              onClick={(e) => {
                e.preventDefault();
                navigate(
                  "/listaRecetas/listaRecetasTotal/" + listasCompras.id,
                  {
                    state: listasCompras.id,
                  }
                );
              }}
            >
              Ver más
            </Button>
          </Stack>
        </Card>
      </React.Fragment>
    ));
}
