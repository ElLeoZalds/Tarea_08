const express = require("express");
const router = express.Router();

const artistaController = require("../controllers/artistaController");

router.post("/", artistaController.crearArtista);
router.get("/", artistaController.obtenerArtista);
router.get("/id", artistaController.obtenerArtistaPorId);
router.put("/", artistaController.actualizarArtista);
router.delete("/", artistaController.eliminarArtista);

module.exports = router;

