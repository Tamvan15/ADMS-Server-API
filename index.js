const express = require('express');
const mysql = require('mysql2');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const app = express();
const port = 3000; // Port untuk server Express

// Konfigurasi koneksi database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'adms_db',
  port: 3306
});

// Menghubungkan ke database
connection.connect((err) => {
  if (err) {
    console.error('Kesalahan koneksi ke database:', err);
    return;
  }
  console.log('Terhubung ke database MySQL');
});

// Middleware untuk parsing JSON
app.use(express.json());

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API ADMS',
      version: '1.0.0',
      description: 'Dokumentasi API untuk ADMS',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./index.js'], // path ke file yang berisi rute API
};

const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

/**
 * @swagger
 * /tables:
 *   get:
 *     summary: Mendapatkan daftar semua tabel
 *     responses:
 *       200:
 *         description: Daftar tabel berhasil diambil
 *       500:
 *         description: Kesalahan server
 */
app.get('/tables', (req, res) => {
  const query = 'SHOW TABLES';
  connection.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Kesalahan saat mengambil daftar tabel' });
      return;
    }
    const tables = results.map(row => Object.values(row)[0]);
    res.json(tables);
  });
});

/**
 * @swagger
 * /{table}:
 *   get:
 *     summary: Mendapatkan data dari tabel
 *     parameters:
 *       - name: table
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Data berhasil diambil
 *       500:
 *         description: Kesalahan server
 */
app.get('/:table', (req, res) => {
  const tableName = req.params.table;
  const query = `SELECT * FROM ${tableName}`;
  connection.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ error: `Kesalahan saat mengambil data dari tabel ${tableName}` });
      return;
    }
    res.json(results);
  });
});

/**
 * @swagger
 * /{table}:
 *   post:
 *     summary: Menambahkan data ke tabel
 *     parameters:
 *       - name: table
 *         in: path
 *         required: true
 *         type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Data berhasil ditambahkan
 *       500:
 *         description: Kesalahan server
 */
app.post('/:table', (req, res) => {
  const tableName = req.params.table;
  const data = req.body;
  const query = `INSERT INTO ${tableName} SET ?`;
  connection.query(query, data, (err, result) => {
    if (err) {
      res.status(500).json({ error: `Kesalahan saat menambahkan data ke tabel ${tableName}` });
      return;
    }
    res.json({ message: 'Data berhasil ditambahkan', id: result.insertId });
  });
});

/**
 * @swagger
 * /{table}/{id}:
 *   put:
 *     summary: Memperbarui data di tabel
 *     parameters:
 *       - name: table
 *         in: path
 *         required: true
 *         type: string
 *       - name: id
 *         in: path
 *         required: true
 *         type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Data berhasil diperbarui
 *       500:
 *         description: Kesalahan server
 */
app.put('/:table/:id', (req, res) => {
  const tableName = req.params.table;
  const id = req.params.id;
  const data = req.body;
  const query = `UPDATE ${tableName} SET ? WHERE id = ?`;
  connection.query(query, [data, id], (err, result) => {
    if (err) {
      res.status(500).json({ error: `Kesalahan saat memperbarui data di tabel ${tableName}` });
      return;
    }
    res.json({ message: 'Data berhasil diperbarui', affectedRows: result.affectedRows });
  });
});

/**
 * @swagger
 * /{table}/{id}:
 *   delete:
 *     summary: Menghapus data dari tabel
 *     parameters:
 *       - name: table
 *         in: path
 *         required: true
 *         type: string
 *       - name: id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Data berhasil dihapus
 *       500:
 *         description: Kesalahan server
 */
app.delete('/:table/:id', (req, res) => {
  const tableName = req.params.table;
  const id = req.params.id;
  const query = `DELETE FROM ${tableName} WHERE id = ?`;
  connection.query(query, [id], (err, result) => {
    if (err) {
      res.status(500).json({ error: `Kesalahan saat menghapus data dari tabel ${tableName}` });
      return;
    }
    res.json({ message: 'Data berhasil dihapus', affectedRows: result.affectedRows });
  });
});

// Menjalankan server
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
