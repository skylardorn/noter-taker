const express = require("express");
const router = express.Router();
const db = require('../db/db.json');
const fs = require('fs')

const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );

const readAndAppend = (content, file) => {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      } else {
        const parsedData = JSON.parse(data);
        parsedData.push(content);
        writeToFile(file, parsedData);
      }
    });
  };

// Home page route.
router.get("/", function (req, res) {
  res.send("Wiki home page");
});

// About page route.
router.get("/notes", (req, res) => {
    console.info(`${req.method} request received for /api/notes`);
    res.send(db)
});

router.post("/notes", (req, res) => {
    console.info(`${req.method} request received for /api/notes`);
    const { title, text } = req.body;

    if (req.body) {
      const newNote = {
        title,
        text,
      };
  
      readAndAppend(newNote, './db/db.json');
      res.json(`note added successfully 🚀`);
    } else {
      res.error('Error in adding note');
    }
});

module.exports = router;
