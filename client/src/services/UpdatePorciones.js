import axios from "axios";

export default function UpdatePorciones({ porciones, idreceta }) {
  return axios
    .put("https://api-kgk5.onrender.com/api/recetas/" + idreceta, {
      porciones: porciones,
    })
    .then((res) => {
      return res;
    });
}
