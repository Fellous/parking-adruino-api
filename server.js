const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Importer les routeurs
const usersRouter = require('./routes/users');
const parkingSpotsRouter = require('./routes/parkingSpots');

// Middleware
app.use(bodyParser.json());

// Utiliser les routeurs
app.use('/users', usersRouter);
app.use('/parking_spots', parkingSpotsRouter); // Assurez-vous que cette ligne est présente

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
