import RestaurantRoundedIcon from "@mui/icons-material/RestaurantRounded";
import MonitorWeightRoundedIcon from "@mui/icons-material/MonitorWeightRounded";
import * as React from "react";
import "./Busqueda.css";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import QueryContext from "../context/QueryContext";
import ParamContext from "../context/ParamContext";
import { useContext } from "react";

export const Busqueda = ({ type }) => {
  const { q, setQ } = useContext(QueryContext);
  const { filterParam, setFilterParam } = useContext(ParamContext);

  return (
    <div>
      <div className="header">
        <div
          className={
            type === "list" ? "headerContainer listMode" : "headerContainer"
          }
        >
          {type !== "list" && (
            <>
              <div className="headerSearch">
                <div className="headerSearchItem">
                  <RestaurantRoundedIcon color="primary" fontSize="large" />
                  <TextField
                    id="filled-required"
                    label="Selecciona un alimento"
                    variant="outlined"
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                  />
                </div>

                <div className="headerSearchItem">
                  <MonitorWeightRoundedIcon color="primary" fontSize="large" />
                  <Box sx={{ minWidth: 120 }}>
                    <FormControl
                      variant="standard"
                      sx={{ m: 1, minWidth: 140 }}
                    >
                      <InputLabel id="demo-simple-select-filled-label">
                        Tipo de dieta
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-filled-label"
                        id="demo-simple-select-filled"
                        value={filterParam}
                        onChange={(e) => setFilterParam(e.target.value)}
                        autoWidth
                      >
                        <MenuItem value={"All"} selected>
                          Todas
                        </MenuItem>
                        <MenuItem value={"Dieta para diabeticos"}>
                          Dieta para diabeticos
                        </MenuItem>
                        <MenuItem value={"Dieta Sana"}>Dieta Sana</MenuItem>
                        <MenuItem value={"Dieta Baja en calorias"}>
                          Dieta Baja en calorias
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Busqueda;
