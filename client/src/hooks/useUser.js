import Context from "../context/UserContext";
import { useCallback, useContext } from "react";
import loginService from "../services/login.js";
import registerService from "../services/registro.js";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export default function useUser() {
  const { token, setToken } = useContext(Context);

  const login = useCallback(
    ({ correo, contraseña }) => {
      loginService({ correo, contraseña })
        .then((token) => {
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
          window.localStorage.setItem("token", token);
          setToken(token);
        })
        .catch((err) => console.log(err));
    },
    [setToken]
  );

  const logout = useCallback(() => {
    cookies.remove("token", { path: "/" });
    cookies.remove("ID", { path: "/" });
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("UserId");
    setToken(null);
  }, [setToken]);

  return { isLogged: Boolean(token), login, logout, register };
}
