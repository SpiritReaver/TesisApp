import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Button } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { useEffect, useState } from "react";
import Sidebarv2 from "../Navegacion/Sidebarv2";
import { Typography } from "@mui/material";
import "../ListaCompra/ListaCompraTotal.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  CheckProducto,
  UncheckProducto,
  CompleteList,
} from "../../services/CheckedProductos";

export default function ListaCompraTotal() {
  const [Productos, SetProductos] = useState([]);
  const { ListaId } = useParams();
  const [checked, setChecked] = useState([]);
  const navigate = useNavigate();

  function removeItemAll(arr, value) {
    var i = 0;
    while (i < arr.length) {
      if (arr[i] === value) {
        arr.splice(i, 1);
      } else {
        ++i;
      }
    }
    return arr;
  }

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(value);
      CheckProducto(value);
    } else {
      removeItemAll(newChecked, value);
      UncheckProducto(value);
    }
    setChecked(newChecked);
  };

  function isDisabled() {
    const compare = checked.filter(
      (item, index) => checked.indexOf(item) === index
    );
    return !(compare.length === Productos.length);
  }

  const HandleonClick = () => () => {
    CompleteList(ListaId);
    setTimeout(() => {
      navigate("/ListaCompra");
    }, 1000);
  };

  useEffect(() => {
    axios
      .get("https://api-kgk5.onrender.com/api/listacompras/" + ListaId)
      .then((res) => {
        SetProductos(res.data.Lista.Productos);
        if (res.data.Lista.Productos.length > 0) {
          res.data.Lista.Productos.forEach((producto) => {
            if (
              producto.completo === true &&
              checked.indexOf(producto.id) === -1
            ) {
              setChecked((prev) => [...prev, producto.id]);
            }
          });
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            {Productos.map((Productos) => {
              const labelId = `checkbox-list-secondary-label-${Productos.id}`;
              return (
                <ListItem
                  key={Productos.id}
                  secondaryAction={
                    <Checkbox
                      edge="end"
                      onChange={handleToggle(Productos.id)}
                      checked={checked.indexOf(Productos.id) !== -1}
                      inputProps={{ "aria-labelledby": labelId }}
                    />
                  }
                  disablePadding
                >
                  <ListItemButton>
                    <ListItemText
                      id={labelId}
                      primary={`${Productos.producto}`}
                    />
                    <ListItemText primary={`${Productos.precio}`} />
                    <ListItemText primary={`${Productos.cantidad}`} />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
          <div className="boton">
            {" "}
            <Button
              variant="contained"
              disabled={isDisabled()}
              onClick={HandleonClick()}
            >
              {" "}
              Confirmar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
