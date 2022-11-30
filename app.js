const express = require("express");
const app = express();
const port = 3000;
const fs = require("fs");
app.use(express.json());
const { parse } = require("csv-parse");
const csvtojson = require("csvtojson");

const { Client } = require("pg");
const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "csvdb",
  password: "pgadmin",
  port: 5432,
});

client.connect((err) => {
    if (err) return console.error("error: " + err.message);
      var createStatament ="CREATE TABLE csvdb(id int, " + "name char(50), description char(80))";
    console.log("Table created successfuly")
    client.query(createStatament, (err, drop) => {
      if (err) console.log("ERROR: ", err);
     var copy="COPY csvdb FROM 'C:/Users/kshet/OneDrive/Desktop/kloopify-api/bezkoder.csv' DELIMITER ',' CSV HEADER";
     client.query(copy);
    })
})





 
