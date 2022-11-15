import axios from "axios";

export default async function DeleteListaCompra(ListaId) {
  const res = await axios.delete(
    "https://api-kgk5.onrender.com/api/listacompras/" + ListaId
  );
  return res.data;
}
