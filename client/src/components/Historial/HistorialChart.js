import { useState, useEffect, React } from "react";
import axios from "axios";
import LineChart from "./LineChart";

const HistorialChart = () => {
  const [userData, setUserData] = useState({});
  const [searchParam] = useState(["producto"]);
  const [q, setQ] = useState("Acelga");
  const [loading, setLoading] = useState(false);
  const [productos, setProductos] = useState([]);

  function search(producto) {
    return producto.filter((producto) => {
      return searchParam.some((newProducto) => {
        return (
          producto[newProducto]
            .toString()
            .toLowerCase()
            .indexOf(q.toLowerCase()) > -1
        );
      });
    });
  }

  const handleChange = (event) => {
    setQ(event.target.value);
  };

  function duplicates(arr) {
    var obj = {};
    var ret_arr = [];
    for (var i = 0; i < arr.length; i++) {
      obj[arr[i]] = true;
    }
    for (var key in obj) {
      ret_arr.push(key);
    }
    return ret_arr;
  }

  useEffect(() => {
    const getProductos = async () => {
      const productosInfo = await axios.get(
        "http://3.83.218.170:4000/api/productos/"
      );
      setProductos(
        duplicates(
          productosInfo.data.ProductosAll.map((producto) => producto.producto)
        )
      );
      setUserData({
        labels: search(productosInfo.data.ProductosAll).map(
          (producto) => producto.fechaCaptura
        ),
        datasets: [
          {
            label: q,
            data: search(productosInfo.data.ProductosAll).map(
              (producto) => producto.precio
            ),
            backgroundColor: [
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 3,
            fill: {
              above: "rgba(54, 162, 235, 0.2)",
              target: "origin",
            },
          },
        ],
      });
    };
    getProductos();

    setTimeout(() => setLoading(true), 2000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q]);

  return (
    <div className="App">
      <div>
        <select onChange={handleChange}>
          {productos.map((producto) => (
            <option value={producto}>{producto}</option>
          ))}
        </select>
      </div>
      <div style={{ position: "relative", height: "40vh", width: "80vw" }}>
        {loading ? (
          <LineChart chartData={userData} />
        ) : (
          <h1 style={{ position: "absolute" }}>Cargando...</h1>
        )}
      </div>
    </div>
  );
};

export default HistorialChart;
