import * as React from "react";
import { useEffect, useState } from "react";
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
import FavoriteIcon from "@mui/icons-material/Favorite";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router-dom";

import "./ItemReceta.css";

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

export default function ItemRecetav2() {
  const navigate = useNavigate();
  const [expanded, setExpanded] = React.useState(false);
  const [recetas, setRecetas] = useState([]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    const URL = "http://3.83.218.170:4000/api/recetas";
    axios.get(URL).then((res) => {
      setRecetas(res.data.RecetasAll);
    });
  }, []);

  function color(color) {
    const coloresTipoRecetas = {
      "Dieta para diabeticos": "#00d7f3f3",
      "Dieta Sana": "#51da5c",
      "Dieta Baja en calorias": "#fff000",
    };
    return coloresTipoRecetas[color];
  }

  const itemRecetas = recetas.map((RecetasAll) => {
    const handleSearch = () => {
      navigate("/Recetas/" + RecetasAll.id);
    };

    return (
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
          <span className="Calorias">{RecetasAll.informacionNutricional}</span>
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
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph>Preparacion:</Typography>

              <Typography paragraph>{RecetasAll.pasos}</Typography>
              <Button variant="contained" onClick={handleSearch}>
                Ver mas
              </Button>
            </CardContent>
          </Collapse>
        </Card>
      </React.Fragment>
    );
  });

  return <>{itemRecetas}</>;
}
