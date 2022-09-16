const { Router } = require("express");
const { Registro, Login } = require("../controllers/auth.controllers");

const router = Router();

router.post("/registro", Registro);
router.post("/login", Login);

module.exports = router;
