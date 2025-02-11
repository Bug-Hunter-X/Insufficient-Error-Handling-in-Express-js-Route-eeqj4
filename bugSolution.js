const express = require('express');
const app = express();

app.get('/users/:id', (req, res) => {
  const userId = req.params.id;

  // Basic input validation
  if (!userId || isNaN(parseInt(userId))) {
    return res.status(400).json({ error: 'Invalid user ID' });
  }

  db.getUser(userId, (err, user) => {
    if (err) {
      console.error('Database error:', err); // Log the error for debugging
      return res.status(500).json({ error: 'Failed to fetch user' });
    }
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  });
});

app.listen(3000, () => console.log('Server listening on port 3000'));