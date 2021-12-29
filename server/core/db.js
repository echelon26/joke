const config = require('../config')
const mongoose = require('mongoose')
const fs = require('fs')
const parse = require('csv-parse')
const {promisify} = require('util')
const parser = promisify(parse)
mongoose.connect(`mongodb://localhost:27017/${config.dbname}`, {useNewUrlParser: true})

const importCSV = (file) => {
    csv = fs.readFileSync(file, "utf8")
    return parser(csv, {})
}

const init = (Joke) => {
    Joke.deleteMany({}) //start by cleaning jokes collection
    .then(res => importCSV(config.csv))
    .then(jokes => jokes.map(joke => Joke.create({content: joke[0]})))
    .then(jokesPromises => Promise.all(jokesPromises))
    .then(res => console.log(`Imported ${res.length} jokes into db!`))
    .catch(err => console.error(err))
}

module.exports = {
    init: init
}