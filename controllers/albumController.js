const db = require("../config/db");
const path = require("path");

//CREAR
exports.crearAlbum = async (req, res) => {
  const { titulo, lanzamiento, artista, venta, genero, productora, premios } =
    req.body;

  if (
    !titulo ||
    !lanzamiento ||
    !artista ||
    !venta ||
    !genero ||
    !productora ||
    !premios
  ) {
    return res.status(400).json({ mensaje: "Falta completar los campos" });
  }

  const sql =
    "INSERT INTO albumes (titulo, lanzamiento, artista, venta, genero, productora, premios) VALUES (?, ?, ?, ?, ?, ?, ?)";

  try {
    const [result] = await db.query(sql, [
      titulo,
      lanzamiento,
      artista,
      venta,
      genero,
      productora,
      premios,
    ]);

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
exports.obtenerAlbum = async (req, res) => {
  const sql =
    "SELECT id, titulo, lanzamiento, artista, venta, genero, productora, premios FROM albumes";

  try {
    const [albumes] = await db.query(sql);

    res.status(200).json(albumes);
  } catch (e) {
    console.error(e);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};

//LEER POR ID
exports.obtenerAlbumPorId = async (req, res) => {
  const { id } = req.params;

  const sql =
    "SELECT titulo, lanzamiento, artista, venta, genero, productora, premios FROM albumes WHERE id = ?";

  try {
    const [albumes] = await db.query(sql, [id]);

    if (albumes.length == 0) {
      res.status(404).json({ mensaje: "No se encontro el álbum con ese Id" });
    }

    res.status(200).json(albumes[0]);
  } catch (e) {
    console.error(e);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};

//ACTUALIZAR
exports.actualizarAlbum = async (req, res) => {
  const { id } = req.params;

  const { titulo, lanzamiento, artista, venta, genero, productora, premios } =
    req.body;

  if (
    !titulo &&
    !lanzamiento &&
    !artista &&
    !venta &&
    !genero &&
    !productora &&
    !premios
  ) {
    res.status(400).json({ mensaje: "Falta completar los campos" });
  }

  let sqlParts = [];
  let values = [];

  if (titulo) {
    sqlParts.push("titulo = ?");
    values.push(titulo);
  }
  if (lanzamiento) {
    sqlParts.push("lanzamiento = ?");
    values.push(lanzamiento);
  }
  if (artista) {
    sqlParts.push("artista = ?");
    values.push(artista);
  }
  if (venta) {
    sqlParts.push("venta = ?");
    values.push(venta);
  }
  if (genero) {
    sqlParts.push("genero = ?");
    values.push(genero);
  }
  if (productora) {
    sqlParts.push("productora = ?");
    values.push(productora);
  }
  if (premios) {
    sqlParts.push("premios = ?");
    values.push(premios);
  }

  if (sqlParts.length == 0) {
    return res.status(400).json({ mensaje: "No hay datos por actualizar " });
  }

  values.push(id);
  const sql = `UPDATE albumes SET ${sqlParts.join(", ")} WHERE id = ?`;

  try {
    const [result] = await db.query(sql, values);

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ mensaje: "No se encontro el álbum con ese Id" });
    }

    res.status(200).json({ mensaje: "Actualizado correctamente" });
  } catch (e) {
    const [result] = await db.query(sql, values);

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ mensaje: "No encontramos el álbum con ese Id" });
    }

    res.status(200).json({ mensaje: "Actualizado correctamente" });
    console.error(e);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};

//ELIMINAR
exports.eliminarAlbum = async (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM albumes WHERE id = ?";

  try {
    const [result] = await db.query(sql, [id]);

    if (result.length === 0) {
      res.status(404).json({ mensaje: "No se encontro el álbum con ese Id" });
    }
    res.status(200).json({ mensaje: "Eliminado correctamente" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};
