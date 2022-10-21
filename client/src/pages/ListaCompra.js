import React from "react";
import Sidebarv2 from "../components/Navegacion/Sidebarv2";
import ListaRecetas from "../components/ListaCompra/ListaCompras";
import Typography from "@mui/material/Typography";

export const ListaCompra = () => {
  return (
    <div className="flex">
      <Sidebarv2 />
      <div className="content">
        <div className="texto">
          <Typography variant="h4" noWrap component="div">
            Lista de compras
          </Typography>
          <h3>
            Acá aparecerán todas las listas de compras creadas recientemente
          </h3>
        </div>
        <ListaRecetas />
        <ListaRecetas />
        <ListaRecetas />
      </div>
    </div>
  );
};

export default ListaCompra;
