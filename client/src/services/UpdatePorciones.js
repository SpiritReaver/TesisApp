import axios from "axios";

export default function UpdatePorciones({ porciones, idreceta }) {
  return axios
    .put("https://3.83.218.170:4000/api/recetas/" + idreceta, {
      porciones: porciones,
    })
    .then((res) => {
      return res;
    });
}
