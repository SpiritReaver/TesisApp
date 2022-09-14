const { Router } = require("express");
const { getproductos, getprecios } = require("../controllers/task.controllers");

const router = Router();

router.get("/productos", getproductos);

router.get("/precios", getprecios);

module.exports = router;
