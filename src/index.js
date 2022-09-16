const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const usuarioRoute = require("./routes/usuarios.routes");
const authRoute = require("./routes/auth.routes");

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(cookieParser());

app.use("/api/usuarios", usuarioRoute);
app.use("/api/auth", authRoute);

app.use((error, req, res, next) => {
  return res.status(500).json({ message: error.message });
});

app.listen(4000);
console.log("server started on port 4000");
