import Context from "../context/UserContext";
import { useCallback, useContext } from "react";
import loginService from "../services/login.js";
import registerService from "../services/registro.js";

export default function useUser() {
  const { token, setToken } = useContext(Context);

  const login = useCallback(
    ({ correo, contraseña }) => {
      loginService({ correo, contraseña })
        .then((token) => {
          console.log(token);
          window.localStorage.setItem("token", token);
          setToken(token);
        })
        .catch((err) => console.log(err));
    },
    [setToken]
  );

  const register = useCallback(
    ({ nombre, correo, contraseña, telefono }) => {
      registerService({ nombre, correo, contraseña, telefono })
        .then((token) => {
          console.log(token);
          window.localStorage.setItem("token", token);
          setToken(token);
        })
        .catch((err) => console.log(err));
    },
    [setToken]
  );

  const logout = useCallback(() => {
    window.localStorage.removeItem("token");
    setToken(null);
  }, [setToken]);

  return { isLogged: Boolean(token), login, logout, register };
}
