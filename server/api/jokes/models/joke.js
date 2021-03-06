const mongoose = require('mongoose')

const jokeSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
              return v !== undefined && v !== ""
            },
        }
    },
    categories: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Category' } ],
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
})

/**
 * Joke pagination
 * @param page return paginated records from this page
 */
jokeSchema.statics.getPage = function (params) {
    let page = params.page
    let perPage = 10 //TODO: dynamic limit from client
    let total = null
    let numPages = null
    let filter = {}
    if (params.filterBy && params.filter)
        filter[params.filterBy] = { $regex: params.filter, $options: 'i'}

    return this.countDocuments(filter).then(count => {
        total = count
        numPages = total/perPage
        if (numPages >= 1) numPages = total % perPage !== 0 ? parseInt(numPages) + 1 : numPages
        else numPages = 1
        page = page > numPages ? numPages: page
        page = page < 1 ? 1: page

        let query = {
            limit: perPage,
            skip: (page-1)*perPage,
            sort: {}
        }
        query.sort[params.sortBy] = params.sort === "ASC" ? 1 : -1

        return this.find(filter, null, query)
    })
    .then(jokes => {
        return {
            jokes: jokes,
            total: total,
            numPages: numPages,
            page: page
        }
    })
}

/**
 * Random Joke
 */
jokeSchema.statics.getRandom = function () {
    return this.countDocuments({}).then(count => {
        let random = Math.floor(Math.random() * count)
        return this.findOne().skip(random).exec()
    })
}


const Joke = mongoose.model('Joke', jokeSchema)

module.exports = Joke