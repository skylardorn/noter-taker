const notes = require('express').Router();
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');

// GET Route for retrieving all the notes
notes.get('/', (req, res) => {
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// POST Route for a new UX/UI tip
notes.post('/', (req, res) => {
  console.log(req.body);

  const { title, text, notes_id } = req.body;

  if (req.body) {
    const newNotes = {
      title,
      text,
      notes_id: uuid(),
    };

    readAndAppend(newNotes, './db/db.json');
    res.json(`Notes added successfully 🚀`);
  } else {
    res.error('Error in adding notes');
  }
});

module.exports = notes;
