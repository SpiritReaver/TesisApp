import axios from "axios";

export default function RecetasToList({ UserId, idreceta }) {
  return axios
    .post(
      "http://3.83.218.170:4050/api/recetas/" + idreceta + "/recetatolist",
      {
        userId: UserId,
      }
    )
    .then((res) => {
      return res;
    });
}
