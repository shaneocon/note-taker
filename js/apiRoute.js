const fs = require("fs");
const util = require("util");
var contents = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
const writeFileAsync = util.promisify(fs.writeFile);


const api = function(app) {

    app.get("/api/notes", function(req, res) {
        res.json(contents);
    });

    app.post("/api/notes", function(req, res) {

        let newNote = req.body;

        let lastId = contents[contents.length - 1]["id"];
        let newId = lastId + 1;
        newNote["id"] = newId

        console.log("Req.body:", req.body);
        contents.push(newNote);


        writeFileAsync("./db/db.json", JSON.stringify(contents)).then(function() {
            console.log("db.json updated");
        });

        res.json(newNote);
    });

    app.delete("/api/notes/:id", function(req, res) {
        let noteId = req.params.id;
        let newId = 0;
       
        console.log(`Deleting note with ID ${noteId}`);
        
        contents = contents.filter(currentNote => {
           return currentNote.id != noteId;
        });
       
        for (currentNote of contents) {
            currentNote.id = newId.toString();
            newId++;
        }
        
        fs.writeFileSync("./db/db.json", JSON.stringify(contents));
        res.json(contents);
    });
};


module.exports = api;
