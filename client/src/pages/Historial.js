import React from "react";
import Sidebarv2 from "../components/Navegacion/Sidebarv2";
import Typography from "@mui/material/Typography";
import HistorialChart from "../components/Historial/HistorialChart";

export const Historial = () => {
  return (
    <div className="flex">
      <Sidebarv2 />
      <div className="content">
        <div className="texto">
          <Typography variant="h4" noWrap component="div">
            Historial de precios
          </Typography>
        </div>
        <div>
          <HistorialChart />
        </div>
      </div>
    </div>
  );
};

export default Historial;
