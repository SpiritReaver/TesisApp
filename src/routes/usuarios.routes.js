const { Router } = require("express");
const pool = require("../postgres");
const {
  POSTusuario,
  GETusuariobyemail,
  DELETEusuariobyemail,
  UPDATEusuariobyemail,
  compareUserid,
  getInfo,
} = require("../controllers/usuarios.controllers");
const { verifyToken, verifyUser } = require("../Validators/tokenVerifier");

const router = Router();

//Verify token
router.get("/checkauth", verifyToken, (req, res, next) => {
  res.json(true);
});

router.get("/checkuser/:usuariosid", verifyUser, compareUserid);

//CRUD
router.post("/", POSTusuario);
router.get("/get/:correo", GETusuariobyemail);
router.delete("/delete/:correo", DELETEusuariobyemail);
router.put("/update/:correo", verifyUser, UPDATEusuariobyemail);
router.get("/infoUser", verifyToken, verifyUser, getInfo);

module.exports = router;
