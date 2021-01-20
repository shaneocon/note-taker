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
        // Console logging deleted note ID for reference
        console.log(`Deleting note with ID ${noteId}`);
        // Filter data of current note, and return current note ID when note equal to noteId (required params ID)
        contents = contents.filter(currentNote => {
           return currentNote.id != noteId;
        });
        // For current note data, change note ID to string and add to newId (originally 0)
        for (currentNote of contents) {
            currentNote.id = newId.toString();
            newId++;
        }
        // Write to files with updated json data
        fs.writeFileSync("./db/db.json", JSON.stringify(contents));
        res.json(contents);
    });
};


module.exports = api;
