const pool = require('../db');

const getProviders = async (req, res) => {
  try {
    const result = await pool.query('SELECT id, ltrim(rtrim(nombre)) nombre, ltrim(rtrim(contacto)) contacto, ltrim(rtrim(telefono)) telefono, ltrim(rtrim(direccion)) direccion, ltrim(rtrim(descripcion)) descripcion FROM proveedores');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const getProviderById = async (req, res) => { 
    const { id } = req.params;
    try {
      const result = await pool.query('SELECT id, ltrim(rtrim(nombre)) nombre, ltrim(rtrim(contacto)) contacto, ltrim(rtrim(telefono)) telefono, ltrim(rtrim(direccion)) direccion, ltrim(rtrim(descripcion)) descripcion FROM proveedores WHERE id = $1', [id]); 
      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'Categoría no encontrada' });
      }
      res.json(result.rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  

const createProvider = async (req, res) => {
  const { nombre, descripcion, contacto, telefono, direccion } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO proveedores (nombre, descripcion, contacto, telefono, direccion) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [nombre, descripcion, contacto, telefono, direccion]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateProvider = async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, contacto, telefono, direccion } = req.body;
  try {
    const result = await pool.query(
      'UPDATE proveedores SET nombre = $1, descripcion = $2, contacto = $3, telefono = $4, direccion = $5 WHERE id = $6 RETURNING *',
      [nombre, descripcion, contacto, telefono, direccion, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Proveedor no encontrado' });
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
