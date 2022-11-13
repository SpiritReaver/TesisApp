import "./ItemReceta.css";
import Sidebarv2 from "../Navegacion/Sidebarv2";
import BootstrapDialogTitle from "../ItemRecetas/Modal/Modal";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ItemReceta = () => {
  const [Receta, setReceta] = useState([]);
  const [Productos, setProductos] = useState([]);
  const [TipoReceta, setTipoReceta] = useState([]);

  const { RecetaId } = useParams();

  useEffect(() => {
    const URL = "https://3.83.218.170:4000/api/recetas/";
    axios.get(URL + RecetaId).then((res) => {
      setReceta(res.data.lista);
      setProductos(res.data.lista.Productos);
      setTipoReceta(res.data.lista.Tiporeceta);
    });
  }, [RecetaId]);

  function color(color) {
    const coloresTipoRecetas = {
      "Dieta para diabeticos": "#00d7f3f3",
      "Dieta Sana": "#51da5c",
      "Dieta Baja en calorias": "#fff000",
    };
    return coloresTipoRecetas[color];
  }
  var valor = Math.trunc(Receta.precioReceta / 2).toLocaleString("en");
  return (
    <div key={Receta.id}>
      <div className="flex">
        <Sidebarv2 />
        <div className="content">
          <div className="hotelContainer">
            <div className="hotelWrapper">
              <h1 className="hotelTitle">{Receta.titulo}</h1>
              <div className="hotelAddress">
                <span
                  className="TipoDieta"
                  style={{
                    backgroundColor: color(TipoReceta.tipoReceta),
                  }}
                >
                  {TipoReceta.tipoReceta}
                </span>
              </div>
              <span className="hotelDistance">Ingredientes</span>
              <div className="hotelDetails">
                <span className="hotelPriceHighlight">
                  {Productos.map((Productos) => {
                    return (
                      <div key={Productos.id}>
                        <li>
                          {Productos.producto}:{Productos.cantidad / 2}Lb
                        </li>
                      </div>
                    );
                  })}
                </span>
                <div className="hotelImages">
                  <div className="hotelImgWrapper">
                    <img src={Receta.imagen} alt="" className="hotelImg" />
                  </div>
                </div>
              </div>
              <div className="hotelDetails">
                <div className="hotelDetailsTexts">
                  <h1 className="hotelTitle">Instrucciones</h1>
                  <p className="hotelDesc">{Receta.pasos}</p>
                </div>
                <div className="hotelDetailsPrice">
                  <span>{Receta.informacionNutricional}</span>
                  <h2>
                    <b>${valor}</b> (COP)
                  </h2>
                  <BootstrapDialogTitle />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemReceta;
