# ADMS Server API

ADMS Server API adalah sebuah aplikasi RestAPI yang menggunakan Swagger untuk dokumentasi. Aplikasi ini menghubungkan database ADMS yang berbasis MySQL (yang telah terhubung dengan PhpMyAdmin XAMPP) dan menyediakan endpoint API untuk operasi CRUD (Create, Read, Update, Delete) pada tabel-tabel dalam database.

## Fitur

- Koneksi ke database MySQL
- Dokumentasi API menggunakan Swagger
- Endpoint untuk mendapatkan daftar semua tabel
- Endpoint untuk operasi CRUD pada setiap tabel

## Prasyarat

Sebelum menjalankan aplikasi ini, pastikan Anda telah menginstal:

- Node.js
- MySQL
- XAMPP (dengan PhpMyAdmin)

## Instalasi

1. Clone repositori ini ke komputer Anda
2. Buka terminal dan navigasi ke direktori proyek
3. Jalankan perintah `npm install` untuk menginstal semua dependensi

## Konfigurasi

Sesuaikan konfigurasi database di file `index.js`:

```javascript
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'adms_db',
  port: 3306
});
```

## Menjalankan Aplikasi

1. Pastikan server MySQL dan XAMPP berjalan
2. Jalankan aplikasi dengan perintah:
   ```
   node index.js
   ```
3. Server akan berjalan di `http://localhost:3000`
4. Akses dokumentasi Swagger di `http://localhost:3000/api-docs`

## Endpoint API

- `GET /tables`: Mendapatkan daftar semua tabel
- `GET /{table}`: Mendapatkan semua data dari tabel tertentu
- `POST /{table}`: Menambahkan data baru ke tabel tertentu
- `PUT /{table}/{id}`: Memperbarui data di tabel tertentu berdasarkan ID
- `DELETE /{table}/{id}`: Menghapus data dari tabel tertentu berdasarkan ID

## Teknologi yang Digunakan

- Express.js: Framework web untuk Node.js
- mysql2: Driver MySQL untuk Node.js
- Swagger: Untuk dokumentasi API
- swagger-jsdoc dan swagger-ui-express: Untuk mengintegrasikan Swagger dengan Express

## Kontribusi

Jika Anda ingin berkontribusi pada proyek ini, silakan buat pull request atau laporkan issues yang Anda temukan.

## Lisensi

[MIT License](https://opensource.org/licenses/MIT)
