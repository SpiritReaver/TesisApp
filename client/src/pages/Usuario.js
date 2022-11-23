import React from "react";
import Box from "@mui/material/Box";
import Sidebarv2 from "../components/Navegacion/Sidebarv2";
import getUserInfo from "../services/gerUserInfo";
import userUserId from "../hooks/userUserId";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import useUser from "../hooks/useUser";
import { useParams } from "react-router-dom";
import "./Usuario.css";
import axios from "axios";

export default function Usuario() {
  const navigate = useNavigate();
  const { getUserId } = userUserId();
  const { logout } = useUser();
  const { usuarioId } = useParams();

  const [name, setName] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");

  useEffect(() => {
    getUserId();
    setTimeout(() => {
      getUserInfo(usuarioId).then((res) => {
        setName(res.nombre);
        setCorreo(res.correo);
        setTelefono(res.telefono);
      });
    }, 500);
  }, [getUserId, usuarioId]);

  const handleClick = (e) => {
    e.preventDefault();
    axios
      .put("https://api-kgk5.onrender.com/api/users/" + usuarioId, {
        nombre: name,
        correo: correo,
        telefono: telefono,
      })
      .then((res) => {
        console.log(res.data);
        window.location.reload();
      });
  };

  const handleClick2 = (e) => {
    e.preventDefault();
    axios
      .delete("https://api-kgk5.onrender.com/api/users/" + usuarioId)
      .then((res) => {
        console.log(res.data);
        logout();
        navigate("/");
      });
  };

  return (
    <div className="flex">
      <Sidebarv2 />
      <div className="content">
        <div className="OwO">
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
            }}
          >
            <input
              type="text"
              name="Nombre"
              label="Nombre"
              variant="filled"
              defaultValue={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="email"
              name="Correo"
              label="Correo"
              variant="filled"
              defaultValue={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />

            <input
              type="number"
              name="Correo"
              label="Telefono"
              variant="filled"
              defaultValue={telefono}
              onChange={(e) => setTelefono(e.target.value)}
            />

            <Button variant="contained" onClick={handleClick}>
              Editar
            </Button>
            <Button variant="contained" onClick={handleClick2}>
              Eliminar usuario
            </Button>
          </Box>
        </div>
      </div>
    </div>
  );
}
