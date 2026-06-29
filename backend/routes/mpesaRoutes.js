const express = require("express");
const router = express.Router();
const mpesaController = require("../controllers/mpesaController");

router.post("/stkpush", mpesaController.stkPush);

module.exports = router;