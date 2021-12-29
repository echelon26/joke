//Glues together the api parts
const db = require('./../../core/db')
const Joke = require('./models/joke')
const Category = require('./models/category')
db.init(Joke) //import initial jokes

const jokesRouter = require('./routes/jokes')({
    get: (params) => {
        if (params.id)
            return Joke.findById(params.id)
            .populate('category')
        else if (params.random)
            return Joke.getRandom()
        else //paginate jokes
            return Joke.getPage(params)
    },
    insert: (payload) => Joke.create(payload),
    update: (id, payload) => {
        return Joke.findById(id)
        .then(joke => Object.assign(joke, payload))
        .then(joke => joke.save())
    },
    remove: (id) => Joke.findOneAndRemove({_id: id})
})

//TODO
const categoriesRouter = require('./routes/categories')({
    get: (id) => {},
    update: (id) => {},
    remove: (id) => {}
})

module.exports = {
    jokesRouter: jokesRouter,
    categoriesRouter: categoriesRouter
}