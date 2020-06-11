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

// get restaurants table
app.get("/api/restaurants", (req, res) => {
  connection.query("SELECT * FROM restaurants", (err, datas) => {
    if (err) {
      console.log(err);
    }
    res.send(datas);
  });
});

// get menus table
app.get("/api/menus", (req, res) => {
  connection.query("SELECT * FROM menus", (err, menus, fields) => {
    if (err) {
      console.log(err);
    }
    res.send(menus);
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));

// get imgs table for infopage
/* 
구현
 */
