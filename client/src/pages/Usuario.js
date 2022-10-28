import React from "react";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Sidebarv2 from "../components/Navegacion/Sidebarv2";
import "./Usuario.css";

export default function Usuario() {
  const [values, setValues] = React.useState({
    nombre: "",
    corre: "",
    telefono: "",
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  return (
    <div className="flex">
      <Sidebarv2 />
      <div className="content">
        <div className="OwO">
          <Box sx={{ display: "flex", flexWrap: "wrap" }}>
            <div>
              <TextField
                label="Nombre"
                id="filled-start-adornment"
                sx={{ m: 1, width: "25ch" }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">Nombre</InputAdornment>
                  ),
                }}
                variant="filled"
              />
              <TextField
                label="Correo"
                id="filled-start-adornment"
                sx={{ m: 1, width: "25ch" }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start"></InputAdornment>
                  ),
                }}
                variant="filled"
              />
              <TextField
                label="Teléfono"
                id="filled-start-adornment"
                sx={{ m: 1, width: "25ch" }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start"> </InputAdornment>
                  ),
                }}
                variant="filled"
              />
            </div>
          </Box>
        </div>
      </div>
    </div>
  );
}
