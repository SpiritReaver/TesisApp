import Context from "../context/UserIdContext";
import { useCallback, useContext } from "react";
import getUserIdService from "../services/UserId.js";

export default function useUserId() {
  const { UserId, setUserId } = useContext(Context);

  const getUserId = useCallback(() => {
    getUserIdService()
      .then((UserId) => {
        window.localStorage.setItem("UserId", JSON.stringify(UserId.data));
        setUserId(JSON.stringify(UserId.data));
      })
      .catch((err) => console.log(err));
  }, [setUserId]);

  return { UserId: Boolean(UserId), getUserId };
}
