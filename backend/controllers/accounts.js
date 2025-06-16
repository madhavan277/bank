const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/accounts', (req, res) => {
  db.all('SELECT * FROM accounts', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

router.post('/accounts', (req, res) => {
  const { name, balance } = req.body;
  db.run(
    'INSERT INTO accounts (name, balance) VALUES (?, ?)',
    [name, balance],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID, name, balance });
    }
  );
});

router.post('/transfer', (req, res) => {
  const { from_id, to_id, amount } = req.body;

  db.serialize(() => {
    db.get('SELECT balance FROM accounts WHERE id = ?', from_id, (err, row) => {
      if (err || !row) return res.status(400).json({ error: 'Invalid sender' });
      if (row.balance < amount) return res.status(400).json({ error: 'Insufficient funds' });

      db.run('UPDATE accounts SET balance = balance - ? WHERE id = ?', [amount, from_id]);
      db.run('UPDATE accounts SET balance = balance + ? WHERE id = ?', [amount, to_id]);
      db.run(
        'INSERT INTO transfers (from_id, to_id, amount) VALUES (?,?,?)',
        [from_id, to_id, amount],
        function(err) {
          if (err) return res.status(500).json({ error: err.message });
          res.json({ id: this.lastID });
        }
      );
    });
  });
});

module.exports = router;
