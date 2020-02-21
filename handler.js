const env = require("./env");
const express = require("express");
const cors = require("cors");
const serverlessHttp = require("serverless-http");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const app = express();
app.use(cors());
app.use(bodyParser.json());

const connection = mysql.createConnection(env);
// User APIs
// get
// put 
// post 
// delete 

// ***** Visited APIs *****
// returns a list of visited countries for a user. 
app.get("/visited", function (request, response) {
  connection.query("SELECT * FROM visited_countries", function(err, data) {
    if (err){
      response.status(500).json({
        error: err
      });
    } else {
      response.status(200).json({
        visitedCountries: data
      });
    }
  });
});

// updates a visited country record
app.put("/visited", function(request, response) {
  const updated = request.body;

  if (!updated || !updated.id) {
    return response.status(500).json({error: "Empty request body!"});
  }

  connection.query(`UPDATE visited_countries SET notes=?, date_visited=? WHERE id=?`, [updated.notes, updated.dateVisited, updated.id], function(err) {
    if (err) {
      response.status(500).json({error: err});
    } else {
      response.status(200).json({
        message: `Successfully updated`
      });
    }
  });
});

// creates a new country visited record
app.post("/visited", function(request, response) {
  const newCountry = request.body;

  if (!newCountry || !newCountry.countryName || !newCountry.userId) {
    return response.status(500).json({error: "Please provide mandatory fields"});
  }

  connection.query(`INSERT INTO visited_countries VALUES (null, ?, ?, ?, ?)`, [newCountry.countryName, newCountry.notes, newCountry.dateVisited, newCountry.userId], function(err, data) {
    if (err) {
      response.status(500).json({error: err});
    } else {
      response.status(200).json({
        message: `Successfully added`
      });
    }
  });
});

// Deletes a visited country record 
app.delete("/visited/:id", function(request, response) {
  const id = parseInt(request.params.id);
  connection.query(`DELETE FROM visited_countries WHERE id=?`, [id], function(err){
    if (err){
      response.status(500).json({error: err});
    } else {
      response.status(200).json({
        message: `Successfully deleted`
      });
    }
  });
});

// ***** Bucketlist APIs *****
// returns a list of bucketlist countries for a user. 
app.get("/bucketlist", function (request, response) {
  connection.query("SELECT * FROM bucketlist_countries", function(err, data) {
    if (err){
      response.status(500).json({
        error: err
      });
    } else {
      response.status(200).json({
        bucketlistCountries: data
      });
    }
  });
});

// updates a visited country record
app.put("/bucketlist", function(request, response) {
  const updated = request.body;

  if (!updated || !updated.id) {
    return response.status(500).json({error: "Empty request body!"});
  }

  connection.query(`UPDATE bucketlist_countries SET facts=? WHERE id=?`, [updated.facts, updated.id], function(err) {
    if (err) {
      response.status(500).json({error: err});
    } else {
      response.status(200).json({
        message: `Successfully updated`
      });
    }
  });
});

// creates a new bucketlist country record
app.post("/bucketlist", function(request, response) {
  const newCountry = request.body;

  if (!newCountry || !newCountry.countryName || !newCountry.userId) {
    return response.status(500).json({error: "Please provide mandatory fields"});
  }

  connection.query(`INSERT INTO bucketlist_countries VALUES (null, ?, ?, ?)`, [newCountry.countryName, newCountry.facts, newCountry.userId], function(err, data) {
    if (err) {
      response.status(500).json({error: err});
    } else {
      response.status(200).json({
        message: `Successfully added`
      });
    }
  });
});

// Deletes a bucketlist country record 
app.delete("/bucketlist/:id", function(request, response) {
  const id = parseInt(request.params.id);
  connection.query(`DELETE FROM bucketlist_countries WHERE id=?`, [id], function(err){
    if (err){
      response.status(500).json({error: err});
    } else {
      response.status(200).json({
        message: `Successfully deleted`
      });
    }
  });
});

// comment below for production server
// app.listen(8080, () => {
//   console.log("Starting local server ...");
// });

module.exports.globeTrotterApp = serverlessHttp(app);