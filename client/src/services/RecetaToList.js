import axios from "axios";

export default function RecetasToList({ UserId, idreceta }) {
  return axios
    .post(
      "https://3.83.218.170:4000/api/recetas/" + idreceta + "/recetatolist",
      {
        userId: UserId,
      }
    )
    .then((res) => {
      return res;
    });
}
