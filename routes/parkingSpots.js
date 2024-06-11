const express = require('express');
const router = express.Router();
const pool = require('../database');

// Obtenir toutes les places de parking
router.get('/', (req, res) => {
  pool.query('SELECT * FROM parking_spots', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Mettre à jour une place de parking
router.put('/:id', (req, res) => {
  const { isOccupied } = req.body;
  pool.query(
    'UPDATE parking_spots SET is_occupied = ? WHERE id = ?',
    [isOccupied, req.params.id],
    (err, results) => {
      if (err) throw err;
      res.send('Parking spot updated successfully.');
    }
  );
});

module.exports = router;
