import axios from "axios";

export async function CheckProducto(ProductoListaId) {
  const res = await axios.put(
    "https://api-kgk5.onrender.com/api/productoslista/" + ProductoListaId,
    {
      completo: true,
    }
  );
  return res.data;
}

export async function UncheckProducto(ProductoListaId) {
  const res = await axios.put(
    "https://api-kgk5.onrender.com/api/productoslista/" + ProductoListaId,
    {
      completo: false,
    }
  );
  return res.data;
}

export async function CompleteList(ListaId) {
  const res = await axios.put(
    "https://api-kgk5.onrender.com/api/listacompras/" + ListaId,
    {
      completa: true,
    }
  );
  return res.data;
}
