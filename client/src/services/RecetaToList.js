import axios from "axios";

export default function RecetasToList({ UserId, idreceta }) {
  return axios
    .post(
      "https://api-kgk5.onrender.com/api/recetas/" + idreceta + "/recetatolist",
      {
        userId: UserId,
      }
    )
    .then((res) => {
      return res;
    });
}
