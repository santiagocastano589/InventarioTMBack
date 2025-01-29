const pool = require('../db');


const getCategorias = async (req, res) => {
  try {
    const categorias = await pool.query(
      'SELECT id, ltrim(rtrim(nombre)) nombre, ltrim(rtrim(descripcion)) descripcion, estado FROM categorias where estado = 1'
    );

    const categoriasConProductos = await Promise.all(
      categorias.rows.map(async (categoria) => {
        const productos = await pool.query(
          'SELECT serial, ltrim(rtrim(nombre)) nombre, ltrim(rtrim(descripcion)) descripcion FROM productos WHERE categoria_id = $1',
          [categoria.id]
        );
        return {
          ...categoria,
          productos: productos.rows,
        };
      })
    );

    res.json(categoriasConProductos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



const getCategoriaById = async (req, res) => { 
    const { id } = req.params;
    try {
      const result = await pool.query('SELECT id, ltrim(rtrim(nombre)) nombre, ltrim(rtrim(descripcion)) descripcion FROM categorias WHERE id = $1', [id]); 
      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'Categoría no encontrada' });
      }
      res.json(result.rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  

const createCategoria = async (req, res) => {
  const { nombre, descripcion } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO categorias (nombre, descripcion) VALUES ($1, $2) RETURNING *',
      [nombre, descripcion]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateCategoria = async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion } = req.body;
  try {
    const result = await pool.query(
      'UPDATE categorias SET nombre = $1, descripcion = $2 WHERE id = $3 RETURNING *',
      [nombre, descripcion, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Categoría no encontrada' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const updateCategoryState = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      'UPDATE categorias SET estado = 0 WHERE id = $1',
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Categoría no encontrada' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getCategorias,
  getCategoriaById,
  createCategoria,
  updateCategoria,
  updateCategoryState,
};
