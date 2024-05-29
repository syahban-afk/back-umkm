const mysql = require('mysql');
require('dotenv').config();

// Buat koneksi ke database
const connection = mysql.createConnection({
    host: process.env.DB_HOSTNAME,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Fungsi untuk menambahkan admin ke database
function addAdmin(name, email, password) {
    const query = `INSERT INTO admins (name, email, password) VALUES (?, ?, ?)`;
    const values = [name, email, password];

    connection.query(query, values, (error, results, fields) => {
        if (error) {
            console.error('Error:', error);
            return;
        }
        console.log('Admin berhasil ditambahkan!');
    });
}

// Fungsi untuk melakukan login
function login() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    // Kirim data login ke backend
    console.log('Login dengan email:', email, 'dan password:', password);
}

// Fungsi untuk melakukan registrasi
function register() {
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;

    // Kirim data registrasi ke backend
    addAdmin(name, email, password);
}
