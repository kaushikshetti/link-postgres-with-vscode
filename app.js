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

  client.query("DROP TABLE csvdb", (err, drop) => {
    // Query to create table "sample"
    var createStatament ="CREATE TABLE csvdb(id int, " + "name char(50), description char(80))";

    // Creating table "sample"
    console.log("Table created successfuly")
    client.query(createStatament, (err, drop) => {
      if (err) console.log("ERROR: ", err);

  csvtojson()
  .fromFile("./bezkoder.csv")
  .then ((source) => {
    console.log("Source",source);
    for (var i = 0; i < source.length; i++) {
      var id = source[i]["id"],
          name = source[i]["name"],
          description = source[i]["description"];
          console.log(id,name,description);

    const insertSQL=`INSERT INTO csvdb (id,name,description) VALUES ('${id}','${name}','${description}')`;
         client.query(insertSQL); 
    }    
    console.log("All items stored into database successfully");
    });
   });
  });
});




 