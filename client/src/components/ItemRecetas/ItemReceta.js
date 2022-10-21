import "./ItemReceta.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
    const URL = "http://3.83.218.170:4000/api/recetas/";
    axios.get(URL + RecetaId).then((res) => {
      setReceta(res.data.lista);
      setProductos(res.data.lista.Productos);
      setTipoReceta(res.data.lista.Tiporeceta);
    });
  }, [RecetaId]);

  return (
    <div key={Receta.id}>
      <div className="flex">
        <Sidebarv2 />
        <div className="content">
          <div className="hotelContainer">
            <div className="hotelWrapper">
              <h1 className="hotelTitle">{Receta.titulo}</h1>
              <div className="hotelAddress">
                <FontAwesomeIcon icon="fa-solid fa-utensils" />
                <span className="TipoDieta">{TipoReceta.tipoReceta}</span>
              </div>
              <span className="hotelDistance">Ingredientes</span>
              <div className="hotelDetails">
                <span className="hotelPriceHighlight">
                  {Productos.map((Productos) => {
                    return (
                      <div key={Productos.id}>
                        <li>{Productos.producto}</li>
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
                    <b>${Receta.precioReceta}</b> (COP)
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
