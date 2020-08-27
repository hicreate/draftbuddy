const express = require("express");
const dotenv = require("dotenv");
const admin = require("firebase-admin");
const cors = require("cors");
const firebaseMiddleware = require("express-firebase-middleware");
const axios = require("axios");

dotenv.config();

const port = 3001;

// file system module to perform file operations
const fs = require("fs");

//create an axios instance
const fpClient = axios.create({
  baseURL: process.env.FP_API_BASE,
  withCredentials: false, // This is the default
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "x-api-key": process.env.FP_API_KEY,
  },
});

// Create a new Express app
const app = express();
app.use(cors());
app.use("/api", firebaseMiddleware.auth);

//create the cron job for fetching the FP data
var CronJob = require("cron").CronJob;
const job = new CronJob("00 00 00 * * *", function() {
  //do something here
  getFpPlayerData;
  getFpConData;
});
job.start();

//get all fp player data
fpClient.get("players");

function getFpPlayerData() {
  //get all fp player data
  fpClient
    .get("players")
    .then((response) => {
      //console.log("fp says", response.data);
      //parse the response from the FPO api
      if (response) {
        //let jsonObj = JSON.parse(response.data);

        // stringify JSON Object
        let jsonContent = JSON.stringify(response.data);

        //save the string JSON object to file
        fs.writeFile("fpData.json", jsonContent, "utf8", function(err) {
          if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
          }
          console.log("JSON file has been saved.");
        });
      }

      //log out that the cron job has run
      const d = new Date();
      console.log("cron job run successfully at:", d);
    })
    .catch((err) => {
      console.log("error getting fp data", err);
    });
}

function getFpConData() {
  const posList = ["QB", "RB", "WR", "TE", "DST", "K"];

  posList.forEach((position) => {
    //get all fp player data
    fpClient
      .get("2020/consensus-rankings?position=" + position)
      .then((response) => {
        //console.log("fp says", response.data);
        //parse the response from the FPO api
        if (response) {
          // stringify JSON Object
          let jsonContent = JSON.stringify(response.data);

          //save the string JSON object to file
          fs.writeFile(
            "fpConData-" + position + ".json",
            jsonContent,
            "utf8",
            function(err) {
              if (err) {
                console.log(
                  "An error occured while writing JSON Object to File."
                );
                return console.log(err);
              }
              console.log("JSON file has been saved.");
            }
          );
        }

        //log out that the cron job has run
        const d = new Date();
        console.log("cron job run successfully at:", d);
      })
      .catch((err) => {
        console.log("error getting fp data", err);
      });
  });
}

// Get a player
app.get("/api/player", (req, res) => {
  const data = JSON.parse(req.query.data);
  //do something in here
});
