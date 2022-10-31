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
import Usuario from "./pages/Usuario";
import { UserContext } from "./context/UserContext";
import { UserIdContext } from "./context/UserIdContext";
import { ParamContext } from "./context/ParamContext";
import { QueryContext } from "./context/QueryContext";
import ListaCompraTotal from "./components/ListaCompra/ListaCompraTotal";

export default function App() {
  return (
    <UserContext>
      <QueryContext>
        <ParamContext>
          <UserIdContext>
            <BrowserRouter>
              <Routes>
                <Route index element={<RegistroContainer />} />
              </Routes>
              <Routes suppressNoMatchWarning={true}>
                <Route path="/Busqueda" exact={true} element={<Busqueda />} />
                <Route path="/Inicio" exact={true} element={<Inicio />} />
                <Route path="/Historial" exact={true} element={<Historial />} />
                <Route
                  path="/Usuario/:usuarioId"
                  exact={true}
                  element={<Usuario />}
                />
                <Route
                  path="/ListaCompra"
                  exact={true}
                  element={<ListaCompra />}
                />
                <Route
                  path="/listaRecetas/listaRecetasTotal/:ListaId"
                  element={<ListaCompraTotal />}
                />

                <Route path="/Recetas" exact={true} element={<Recetas />} />
                <Route path="/Recetas/:RecetaId" element={<ItemReceta />} />
              </Routes>
            </BrowserRouter>
          </UserIdContext>
        </ParamContext>
      </QueryContext>
    </UserContext>
  );
}
