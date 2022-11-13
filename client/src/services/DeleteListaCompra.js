import axios from "axios";

export default async function DeleteListaCompra(ListaId) {
  const res = await axios.delete(
    "https://3.83.218.170:4000/api/listacompras/" + ListaId
  );
  return res.data;
}
