import React, { useContext, useEffect } from "react";
import UserContext from "../context/UserContext";
import Busqueda from "./Busqueda";
import { useNavigate } from "react-router-dom";
import Sidebarv2 from "../components/Navegacion/Sidebarv2";
import ItemRecetav2 from "../components/ItemRecetas/ItemRecetav2";

export const Recetas = () => {
  const { token } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) navigate("/");
  }, [token, navigate]);

  return (
    <div>
      <div>
        <div className="flex">
          <Sidebarv2 />
          <div className="content">
            <Busqueda />

            <ItemRecetav2 />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recetas;
