const fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const data = fs.readFileSync("./database.json");
const conf = JSON.parse(data);
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: conf.host,
  user: conf.user,
  password: conf.password,
  port: conf.port,
  database: conf.database,
});
connection.connect();

app.get("/api/restaurants", (req, res) => {
  connection.query("SELECT * FROM restaurants", (err, rows, fields) => {
    console.log(rows);
    res.send(rows);
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));

// app.get("/api/customers", (req, res) => {
//   const customers = [
//     { id: 1, firstName: "John", lastName: "Doe" },
//     { id: 2, firstName: "saeki", lastName: "sibal" },
//     { id: 3, firstName: "hyeonguk", lastName: "ahn" },
//   ];

//   res.json(customers);
// });

// app.listen(port, () => {
//   console.log(`Server started on port ${port}`);
// });
