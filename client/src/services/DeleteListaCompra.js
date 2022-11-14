import axios from "axios";

export default async function DeleteListaCompra(ListaId) {
  const res = await axios.delete(
    "http://3.83.218.170:4050/api/listacompras/" + ListaId
  );
  return res.data;
}
