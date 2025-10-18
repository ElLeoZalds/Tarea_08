const express = require("express");

const router = express.Router();

const albumController = require("../controllers/albumController");

router.post("/", albumController.crearAlbum);
router.get("/", albumController.obtenerAlbum);
router.get("/:id", albumController.obtenerAlbumPorId);
router.put("/:id", albumController.actualizarAlbum);
router.delete("/:id", albumController.eliminarAlbum);

module.exports = router;
