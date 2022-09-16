const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();
const routes = require("./routes/routes");

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use(routes);

app.use((error, req, res, next) => {
  return res.status(500).json({ message: error.message });
});

app.listen(4000);
console.log("server started on port 4000");
