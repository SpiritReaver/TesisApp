const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();
const taskroutes = require("./routes/task.routes");

app.use(cors());
app.use(morgan("dev"));
app.use(taskroutes);
app.use(express.json());

app.listen(4000);
console.log("server started on port 4000");
