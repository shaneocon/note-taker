const noteContents = require("../db/contents");

const fs = require("fs");
const util = require("util");
const contents = require("../db/contents");
const writeFileAsync = util.promisify(fs.writeFile);


const api = function(app) {

    app.get("/api/notes", function(req, res) {
        res.json(contents);
    })
}



module.exports = api;