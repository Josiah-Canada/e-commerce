const express = require('express');
const routes = require('./routes');
const mysql = require('mysql2');
const { ConnectionError } = require('sequelize/types');
// import sequelize connection

const db = mysql.createConnection(
  {
    host: 'localhost',
    // Your MySQL username,
    user: 'root',
    // Your MySQL password
    password: 'Newsqlwhodis!97',
    database: 'ecommerce_db'
  },
  console.log('Connected to e-commerce database')
);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// sync sequelize models to the database, then turn on the server
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});

const Category ={
  id:1,
  name: "category_name",
  init: function() {
    connection.query(`CREATE TABLE CATEGORY(
      id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(10),
    )`, function(error, data) {
      // data is an array with table info
    });
  },
  gather: function() {
    connection.query(`SELECT * FROM Category
    )`, function(error, data) {
      // print everything
    });
  },


}
