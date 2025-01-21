const pool = require('../db');

const getProviders = async (req, res) => {
  try {
    const result = await pool.query('SELECT id, ltrim(rtrim(nombre)) nombre, ltrim(rtrim(contacto)) contacto, ltrim(rtrim(telefono)) telefono, ltrim(rtrim(direccion)) direccion FROM proveedores');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getProviderById = async (req, res) => { 
    const { id } = req.params;
    try {
      const result = await pool.query('SELECT id, ltrim(rtrim(nombre)) nombre, ltrim(rtrim(contacto)) contacto, ltrim(rtrim(telefono)) telefono, ltrim(rtrim(direccion)) direccion FROM proveedores WHERE id = $1', [id]); 
      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'Categoría no encontrada' });
      }
      res.json(result.rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  

const createProvider = async (req, res) => {
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

const updateProvider = async (req, res) => {
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

const deleteProvider = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM categorias WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Categoría no encontrada' });
    }
    res.json({ message: 'Categoría eliminada correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getProviders,
  getProviderById,
  createProvider,
  updateProvider,
  deleteProvider,
};
