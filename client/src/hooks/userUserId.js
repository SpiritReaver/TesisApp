import Context from "../context/UserIdContext";
import { useCallback, useContext } from "react";
import getUserIdService from "../services/UserId.js";
import Cookies from "universal-cookie";

export default function useUserId() {
  const { UserId, setUserId } = useContext(Context);

  const getUserId = useCallback(() => {
    const cookies = new Cookies();

    getUserIdService()
      .then((UserId) => {
        window.localStorage.setItem("UserId", JSON.stringify(UserId.data));
        cookies.set("ID", localStorage.getItem("UserId"), { path: "/" });
        setUserId(JSON.stringify(UserId.data));
      })
      .catch((err) => console.log(err));
  }, [setUserId]);

  return { UserId: Boolean(UserId), getUserId };
}
