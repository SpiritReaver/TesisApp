import React from "react";
import Sidebarv2 from "../components/Navegacion/Sidebarv2";
import HistorialChart from "../components/Historial/HistorialChart";

export const Historial = () => {
  return (
    <div className="flex">
      <Sidebarv2 />
      <div className="content">
        <div className="texto"></div>
        <div>
          <HistorialChart />
        </div>
      </div>
    </div>
  );
};

export default Historial;
