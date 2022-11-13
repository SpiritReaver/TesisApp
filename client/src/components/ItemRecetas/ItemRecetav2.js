/* eslint-disable array-callback-return */
/* eslint-disable eqeqeq */
import * as React from "react";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router-dom";
import QueryContext from "../../context/QueryContext";
import ParamContext from "../../context/ParamContext";
import UpdatePorciones from "../../services/UpdatePorciones";

import "./ItemRecetav2.css";

export default function ItemRecetav2() {
  const [items, setItems] = useState([]);
  const [searchParam] = useState(["titulo", "Productos"]);
  const { filterParam } = useContext(ParamContext);
  const [expandedIds, setExpandedIds] = useState([]);
  const { q } = useContext(QueryContext);
  const navigate = useNavigate();

  function color(color) {
    const coloresTipoRecetas = {
      "Dieta para diabeticos": "#00d7f3f3",
      "Dieta Sana": "#51da5c",
      "Dieta Baja en calorias": "#fff000",
    };
    return coloresTipoRecetas[color];
  }

  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  }));

  const toggleExpanded = (id) => {
    setExpandedIds((prevExpandedIds) => {
      if (prevExpandedIds.includes(id))
        return prevExpandedIds.filter((i) => i !== id);
      return [...prevExpandedIds, id];
    });
  };

  useEffect(() => {
    axios.get("http://3.83.218.170:4000/api/recetas").then((res) => {
      setItems(res.data.RecetasAll);
      res.data.RecetasAll.forEach((rec) =>
        UpdatePorciones({ porciones: 1, idreceta: rec.id }).then((res) =>
          console.log(res.data)
        )
      );
    });
  }, []);

  const data = Object.values(items);

  function search(Recetas) {
    return Recetas.filter((receta) => {
      if (receta.Tiporeceta.tipoReceta == filterParam) {
        return searchParam.some((newReceta) => {
          return (
            receta[newReceta]
              .toString()
              .toLowerCase()
              .indexOf(q.toLowerCase()) > -1
          );
        });
      } else if (filterParam == "All") {
        return searchParam.some((newReceta) => {
          return (
            receta[newReceta]
              .toString()
              .toLowerCase()
              .indexOf(q.toLowerCase()) > -1
          );
        });
      }
    });
  }

  return (
    <div className="wrapper">
      {search(data).map((RecetasAll) => (
        <React.Fragment key={RecetasAll.id}>
          <Card className="searchItem" sx={{ maxWidth: 345 }}>
            <CardHeader
              action={<IconButton aria-label="settings"></IconButton>}
              title={RecetasAll.titulo}
            />
            <h4
              className="Dieta"
              style={{
                backgroundColor: color(RecetasAll.Tiporeceta.tipoReceta),
              }}
            >
              {RecetasAll.Tiporeceta.tipoReceta}
            </h4>
            <span className="Calorias">
              {RecetasAll.informacionNutricional}
            </span>
            <CardMedia
              component="img"
              height="194"
              image={RecetasAll.imagen}
              alt="Paella dish"
            />
            <CardContent>
              {RecetasAll.Productos.map((Productos) => {
                return (
                  <React.Fragment key={Productos.id}>
                    <Typography variant="body2" color="text.secondary">
                      {Productos.producto}
                    </Typography>
                  </React.Fragment>
                );
              })}
            </CardContent>
            <CardActions disableSpacing>
              <ExpandMore
                expand={expandedIds.includes(RecetasAll.id)}
                onClick={() => toggleExpanded(RecetasAll.id)}
                aria-expanded={expandedIds.includes(RecetasAll.id)}
              >
                <ExpandMoreIcon />
              </ExpandMore>
            </CardActions>
            <Collapse
              in={expandedIds.includes(RecetasAll.id)}
              timeout="auto"
              unmountOnExit
            >
              <CardContent expanded={RecetasAll.id}>
                <Typography paragraph>Preparacion:</Typography>

                <Typography paragraph>{RecetasAll.pasos}</Typography>
                <Button
                  href="#contained-buttons"
                  variant="contained"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/Recetas/" + RecetasAll.id, {
                      state: RecetasAll.id,
                    });
                  }}
                >
                  Ver mas
                </Button>
              </CardContent>
            </Collapse>
          </Card>
        </React.Fragment>
      ))}
    </div>
  );
}
