import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Button } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";

import Sidebarv2 from "../Navegacion/Sidebarv2";
import { Typography } from "@mui/material";
import "../ListaCompra/ListaCompraTotal.css";

export default function ListaCompraTotal() {
  const [checked, setChecked] = React.useState([1]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <div className="flex">
      <Sidebarv2 />
      <div className="content">
        <div className="texto">
          <Typography variant="h4" noWrap component="div">
            Lista de compras total
          </Typography>
          <h3>
            Esta es la lista de compras necesarias para la preparación de los
            productos escogidos, los ingredientes necesarios aparecerán a
            continuación
          </h3>
        </div>

        <div className="lista">
          <List
            dense
            sx={{ width: "100%", maxWidth: 700, bgcolor: "background.paper" }}
          >
            {[0, 1, 2, 3, 4].map((value) => {
              const labelId = `checkbox-list-secondary-label-${value}`;
              return (
                <ListItem
                  key={value}
                  secondaryAction={
                    <Checkbox
                      edge="end"
                      onChange={handleToggle(value)}
                      checked={checked.indexOf(value) !== -1}
                      inputProps={{ "aria-labelledby": labelId }}
                    />
                  }
                  disablePadding
                >
                  <ListItemButton>
                    <ListItemText
                      id={labelId}
                      primary={`Producto ${value + 1}`}
                    />
                    <ListItemText primary="precio $$$" />
                    <ListItemText primary="cantidad" />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
          <div className="boton">
            {" "}
            <Button variant="contained"> Confirmar</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
