import axios from "axios";

export default function UpdatePorciones({ porciones, idreceta }) {
  return axios
    .put("http://3.83.218.170:4050/api/recetas/" + idreceta, {
      porciones: porciones,
    })
    .then((res) => {
      return res;
    });
}
