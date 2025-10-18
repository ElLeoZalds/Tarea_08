const db = require("../config/db");
const path = require("path");

//CREAR
exports.crearArtista = async (req, res) => {
  const { nombre, pais, premios } = req.body;

  if (!nombre || !pais || !premios) {
    return res.status(400).json({ mensaje: "Falta completar los campos" });
  }

  const sql = "INSERT INTO artistas (nombre, pais, premios) VALUES (?, ?, ?)";

  try {
    const [result] = await db.query(sql, [nombre, pais, premios]);
    res.status(201).json({
      id: result.insertId,
      mensaje: "Registrado correctamente",
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};

//LEER
exports.obtenerArtista = async (req, res) => {
  const sql = "SELECT id, nombre, pais, premios FROM artistas";

  try {
    const [artistas] = await db.query(sql);

    res.status(200).json(artistas);
  } catch (e) {
    console.error(e);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};

//LEER POR ID
exports.obtenerArtistaPorId = async (req, res) => {
  const { id } = req.params;

  const sql = "SELECT id, nombre, pais, premios FROM artistas WHERE id = ?";

  try {
    const [artistas] = await db.query(sql, [id]);

    if (artistas.length == 0) {
      return res.status(404).json({ mensaje: "No se ha encontrado el id" });
    }

    res.status(201).json(artistas[id]);
  } catch (e) {
    console.error(e);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};

//ACTUALIZAR
exports.actualizarArtista = async (req, res) => {
  const { id } = req.params;

  const { nombre, pais, premios } = req.body;

  if (!nombre || !pais || !premios) {
    return res.status(400).json({ mensaje: "Falta completar los campos" });
  }

  let sqlParts = [];
  let values = [];

  if (nombre) {
    sqlParts.push("nombre = ?");
    values.push(nombre);
  }

  if (pais) {
    sqlParts.push("pais = ?");
    values.push(nombre);
  }

  if (premios) {
    sqlParts.push("premios = ?");
    values.push(premios);
  }

  if (sqlParts.length == 0) {
    return res.status(400).json({ mensaje: "No hay datos para actualizar" });
  }

  values.push(id);
  const sql = `UPDATE artistas SET ${sqlParts.join(", ")} WHERE id = ?`;

  try {
    const [result] = await db.query(sql, values);

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ mensajes: "No encontramos el producto con el id" });
    }
    res.status(200).json({ mensaje: "Registro actualizado correctamente" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};

//ELIMINAR
exports.eliminarArtista = async (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM artistas WHERE id = ?";

  try {
    const [result] = await db.query(sql, [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ mensaje: "No se ha encontrado el id" });
    }

    res.status(200).json({ mensaje: "Registro eliminador correctamente" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};
