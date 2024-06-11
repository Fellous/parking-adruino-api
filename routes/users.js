const express = require('express');
const router = express.Router();
const pool = require('../database');

// Inscription d'un nouvel utilisateur
router.post('/register', (req, res) => {
  const { username, password, email } = req.body;
  pool.query(
    'INSERT INTO users (username, password, email) VALUES (?, ?, ?)',
    [username, password, email],
    (error, results) => {
      if (error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(201).json({ message: "Utilisateur enregistré avec succès!" });
      }
    }
  );
});

// Connexion d'un utilisateur et mise à jour des places de parking
router.post('/login', (req, res) => {
  console.log('Received body:', req.body); // Ajoutez ceci pour voir le corps de la requête
  const { username, password, data } = req.body;
  pool.query(
    'SELECT * FROM users WHERE username = ? AND password = ?',
    [username, password],
    (error, results) => {
      if (error) {
        res.status(500).json({ error: error.message });
      } else if (results.length > 0) {
        // Mise à jour des places de parking en fonction des données reçues
        if (data) {
          const [spot, status] = data.split(',');
          if (!spot || !status) {
            return res.status(400).json({ message: 'Invalid data format' });
          }
          const query = 'UPDATE parking_spots SET is_occupied = ? WHERE spot_number = ?';
          pool.query(query, [parseInt(status), spot], (err) => {
            if (err) {
              return res.status(500).json({ message: 'Database update failed' });
            }
            res.json({ message: `Mise à jour réussie pour la place ${spot} avec le statut ${status === '1' ? 'occupée' : 'libre'}` });
          });
        } else {
          res.json({ message: "Connexion réussie, mais aucune donnée de mise à jour fournie" });
        }
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    }
  );
});

// Lister tous les utilisateurs
router.get('/', (req, res) => {
  pool.query('SELECT * FROM users', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

module.exports = router;
