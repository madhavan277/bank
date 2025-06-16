const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
  db.run(`CREATE TABLE accounts (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    balance REAL NOT NULL
  );`);

  db.run(`CREATE TABLE transfers (
    id INTEGER PRIMARY KEY,
    from_id INTEGER,
    to_id INTEGER,
    amount REAL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(from_id) REFERENCES accounts(id),
    FOREIGN KEY(to_id)   REFERENCES accounts(id)
  );`);

  const stmt = db.prepare('INSERT INTO accounts (name, balance) VALUES (?,?)');
  stmt.run('Alice', 5000);
  stmt.run('Bob', 3000);
  stmt.run('Charlie', 7000);
  stmt.finalize();
});

module.exports = db;
