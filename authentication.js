const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const sessionStore = new MySQLStore({
  host: 'localhost',
  user: 'root',
  password: 'hydrogen@1',
  database: 'carbon_emission',
});


app.use(
  session({
    secret: 'hydrogen@1',
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
  })
);


const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'hydrogen@1',
  database: 'carbon_emission',
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to the database');
});


// Serve static HTML files from the 'public' directory
app.use(express.static('public'));

// Define API endpoints for sign-up and login

// Sign-up endpoint
app.post('/sighup', (req, res) => {
  const { username, password } = req.body;
  const user = { username, password };

  db.query('INSERT INTO users SET ?', user, (err, result) => {
    if (err) {
      res.status(500).json({ message: 'Error signing up' });
    } else {
      res.status(200).json({ message: 'User signed up successfully', redirectUrl: 'radial_menu.html' });
    }
  });
});

// Login endpoint
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  db.query(
    'SELECT id, username, password  FROM users WHERE username = ?',
    [username],
    (err, results) => {
      if (err) {
        res.status(500).json({ message: 'Error during login' });
      } else {
        if (results.length === 0) {
          res.status(401).json({ message: 'User not found' });
        } else {
          const user = results[0];
          if (user.password === password) {
            res.status(200).json({ message: 'Login successful', redirectUrl: '/radial_menu.html' });
            console.log("Login successfull");
            req.session.user_name = user.username;
            console.log("User ID stored in session:", req.session.user_name); // Add this line

          } else {
            res.status(401).json({ message: 'Incorrect password' });
          }
        }
      }
    }
  );
});

app.post('/store-emission-values', (req, res) => {
  const user_name = req.session.user_name; // Retrieve the user ID from the session
  const emission_value = req.body.emission_value // Replace with your calculated emission values

  // Insert the received data into the database
  db.query('INSERT INTO emissions_data (username, transportation_emission) VALUES (?, ?)', [user_name, emission_value], (err, result) => {
    if (err) {
      console.error('Error inserting emission record into the database:', err);
      res.status(500).json({ message: 'Error storing emission values' });
    } else {
      console.log('Emission record inserted into the database successfully.');
      res.status(200).json({ message: 'Emission values stored successfully' });
    }
  });
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
