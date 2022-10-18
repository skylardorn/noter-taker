const uuid = require('../helpers/uuid');

// GET Route for retrieving all the notes
notes.get('/', (req, res) => {
  readFromFile('./db/json').then((data) => res.json(JSON.parse(data)));
});

// POST Route for a new UX/UI tip
notes.post('/', (req, res) => {
  console.log(req.body);

  const { title, text } = req.body;

  if (req.body) {
    const newNotes = {
      username,
      tip,
      topic,
      tip_id: uuid(),
    };

    readAndAppend(newNotes, './db/notes.json');
    res.json(`Notes added successfully 🚀`);
  } else {
    res.error('Error in adding notes');
  }
});

module.exports = notes;
