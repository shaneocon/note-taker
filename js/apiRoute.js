const noteContents = require("../db/contents");

const fs = require("fs");
const util = require("util");
const contents = require("../db/contents");
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


        writeFileAsync("./db/noteContents.json", JSON.stringify(noteContents)).then(function() {
            console.log("noteContents.json updated");
        });

        res.json(newNote);
    });

    app.delete("/api/notes/:id", function(req,res) {

        console.log("Req.params:", req.params);
        let chosenId = parseInt(req.params.id);
        console.log(chosenId);
        
        for (let i = 0; i < contents.length; i++) { }

    })
}


module.exports = api;