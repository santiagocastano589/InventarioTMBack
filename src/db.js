const { Pool } = require('pg');
require('dotenv').config();

// const pool = new Pool({
//     connectionString: process.env.DATABASE_URL,
// });

const pool = new Pool({
  host: 'aws-0-us-east-1.pooler.supabase.com',
  database: 'postgres',
  user: 'postgres.wzlsmqeokcsiqoyxekfa',
  password: 'salomeYjacobo.3',
  port: 6543, 
  ssl: {
    rejectUnauthorized: false, // Necesario si Supabase requiere SSL
  },
});

module.exports = pool;

// Prueba de conexión
(async () => {
    try {
        await pool.query('SELECT NOW()');
        console.log('Conexión exitosa a la base de datos');
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
    }
})();

module.exports = {
    query: (text, params) => pool.query(text, params),
};



