const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const {
  readFromFile,
  readAndAppend,
writeToFile,
  } = require('../helpers/fsUtils');

// GET Route for retrieving all 
notes.get('/', (req, res) => {
  console.info('${req.method} request received for notes');
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
});

//GET route 
notes.get('/:note_id',(req, res) => {
  const noteId = req.params.note_id;
  readFromFile('./db/db.json')
  .then((data)=> JSON.parse(data))
  .then((json)=> {
    const result = json.filter((note)=> note.tip_id === tipID);
    return result.length >0
    ? res.json(result)
    : res.json('No note with that ID');
  })
});

//DELETE route 
notes.delete('/:note_id',(req, res) => {
  const noteId = req.params.note_id;
  readFromFile('./db/db.json')
  .then((data)=> JSON.parse(data))
  .then((json)=> {
    //new array of allnotes except the one with UID
    const result = json.filter((note)=> note.id !== noteId);
    //save array to fs
    writeToFile('./db/db.json', result);
   //respond to DELTE request
    res.json('Item ${noteID} has been deleted.');
  })
});

// POST Route 
notes.post('/', (req, res) => {
  // Destructuring assignment for the items in req.body
  console.log(req.body);
  const { title,text } = req.body;

  // If all the required properties are present
  if (req.body) {
    // Variable for the object we will save
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };

    readAndAppend(newNote, './db/db.json');
    res.json('Note added successfully');
  } else {
    res.json('Error in adding Note');
  }
});

module.exports = notes;
