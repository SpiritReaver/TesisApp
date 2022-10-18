import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegistroContainer from "./container/Container";

import "./App.css";
import ListaCompra from "./pages/ListaCompra";
import Recetas from "./pages/Recetas";
import Busqueda from "./pages/Busqueda";
import Historial from "./pages/Historial";
import ItemReceta from "./components/ItemRecetas/ItemReceta";
import Inicio from "./pages/Inicio";
import { UserContext } from "./context/UserContext";
import { UserIdContext } from "./context/UserIdContext";

export default function App() {
  return (
    <UserContext>
      <BrowserRouter>
        <Routes>
          <Route index element={<RegistroContainer />} />
        </Routes>
        <UserIdContext>
          <Routes suppressNoMatchWarning={true}>
            <Route path="/Busqueda" exact={true} element={<Busqueda />} />
            <Route path="/Inicio" exact={true} element={<Inicio />} />
            <Route path="/Historial" exact={true} element={<Historial />} />
            <Route path="/ListaCompra" exact={true} element={<ListaCompra />} />
            <Route path="/Recetas" exact={true} element={<Recetas />} />
            <Route path="/Recetas/:RecetaId" element={<ItemReceta />} />
          </Routes>
        </UserIdContext>
      </BrowserRouter>
    </UserContext>
  );
}
