const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost', // sql110.infinityfree.com
  user: 'root',//if0_35063265
  password: '', // LM0jrTMtuB
  database: 'test',//if0_35063265_reactdb
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to database');
});

app.post('/register', (req, res) => {
  const { name, email, number, password, gender, languagesKnown } = req.body;
  console.log('Received registration request:', req.body);

  const sql =
    'INSERT INTO login1 (`Username`, `email`, `number`, `Password`, `gender`, `languagesknown`) VALUES (?, ?, ?, ?, ?, ?)';
  const values = [name, email, number, password, gender, languagesKnown];
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      return res.status(500).json({ error: 'Internal server error', message: err.message });
    }
    console.log('Registration successful');
    return res.json({ message: 'Registration successful' });
  });
});

app.post('/login1', (req, res) => {
  const { email, password } = req.body;
  console.log('Received login request:', req.body);

  const sql = 'SELECT * FROM login1 WHERE `email` = ? AND `Password` = ?';
  db.query(sql, [email, password], (err, result) => {
    if (err) {
      console.error('Error querying data:', err);
      return res.status(500).json({ error: 'Internal server error', message: err.message });
    }
    if (result.length === 0) {
      return res.status(401).json({ error: 'Unauthorized', message: 'Login failed' });
    }
    console.log('Login successful');
    return res.json({ message: 'Login successfully!!' });
  });
});




app.get('/', (req, res) => {
  return res.json('hii machii');
});

app.listen(7787, () => {
  console.log('Server is listening on port 8081');
});

app.get('/login1', (req, res) => {
  const sql = 'SELECT * from login1';
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.put('/login1/:id', (req, res) => {
  const id = req.params.id;
  const { Username, Password, email, number } = req.body;
  const sql =
    'UPDATE login1 SET `Username`=?, `Password`=?, `email`=?, `number`=? WHERE `id`=?';
  const values = [Username, Password, email, number, id];
  db.query(sql, values, (err, data) => {
    if (err) {
      console.error('Error updating data:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    return res.json(data);
  });
});

app.delete('/login1/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'DELETE FROM login1 WHERE `id`=?';
  db.query(sql, [id], (err, data) => {
    if (err) {
      console.error('Error deleting data:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    return res.json(data);
  });
});
