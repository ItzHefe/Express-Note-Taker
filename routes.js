const fs = require('fs');
const path = require('path');
const router = require('express').Router();

function generateId() {
    let result = "";
    let hex = "abcdef123456";
    for (let i = 0; i < 20; i++) {
      let randomIndex = Math.floor(Math.random() * hex.length);
      result += hex[randomIndex];
    }
  
    return result;
  }

fs.readFile("db/db.json", "utf8", (err, data) => {

    if (err) throw err;

    var notes = JSON.parse(data);

    router.get("/api/notes", function (req, res) {
        res.json(notes);
    });

    router.post("/api/notes", function (req, res) {
        let newNote = req.body;
        req.body.id = generateId();
        notes.push(newNote);
        updateDb();
        res.json(notes);
        return console.log("Added new note: " + newNote.title);
    });

    router.get("/api/notes/:id", function (req, res) {
        res.json(notes[req.params.id]);
    });


    router.delete("/api/notes/:id", function (req, res) {
        notes.splice(req.params.id, 1);
        updateDb();
        res.json(notes);
        console.log("Deleted note with id " + req.params.id);
    });

    router.get('/notes', function (req, res) {
        res.sendFile(path.join(__dirname, "./public/notes.html"));
    });

    router.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, "./public/index.html"));
    });

    function updateDb() {
        fs.writeFile("db/db.json", JSON.stringify(notes, '\t'), err => {
            if (err) throw err;
            return true;
        });
    }

});

module.exports =router;