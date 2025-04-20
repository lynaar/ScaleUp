import express from 'express';
import pool from './db.js'; 
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import authRoutes from './src/routes/authRoutes.js';
import profileRoutes from './src/routes/profileRoutes.js';
import cors from 'cors';
import multer from 'multer'; // pour lire FormData

dotenv.config({ path: './vrbl.env' });

const app = express();


const upload = multer(); // Multer sans upload de fichier (juste pour lire FormData)

app.use(express.json()); // pour lire JSON
app.use(express.urlencoded({ extended: true })); // pour lire formulaire simple

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Gestion pré-vol OPTIONS
app.options('*', cors());

app.use(express.json()); // n9raw le corps des requêtes JSN
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);

// hna ndirou des petits test de connextion

console.log('affiche le mdps  =', process.env.DB_PASSWORD);

pool.query('SELECT NOW() AS current_time', (err, res) => {
  if (err) {
    console.log(' NON connecté :', err.message);
  } else {
    console.log('Connecté ! Heure actuelle :', res.rows[0].current_time);
  }
});


const port = 8083; // Port d'écoute de l'application
// Lancer le serveur
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
app.listen(port, () => {
  console.log('started on port 8083');
});// il reste a faire la suite
