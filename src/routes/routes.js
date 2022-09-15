const { Router } = require("express");
const {
  getproductos,
  getprecios,
  POSTusuario,
  GETusuariobyemail,
  DELETEusuariobyemail,
  UPDATEusuariobyemail,
  Registro,
  Login,
} = require("../controllers/controllers");

const router = Router();

// login y registro METHODS

router.post("/postusuario", POSTusuario);
router.get("/getusuario/:correo", GETusuariobyemail);
router.delete("/deleteusuario/:correo", DELETEusuariobyemail);
router.put("/updateusuario/:correo", UPDATEusuariobyemail);

router.post("/registro", Registro);
router.post("/login", Login);

// productos METHODS
router.get("/productos", getproductos);
router.get("/precios", getprecios);

module.exports = router;
