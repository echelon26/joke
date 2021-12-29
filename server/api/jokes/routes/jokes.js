const express = require('express')
const router = express.Router()

module.exports = ({ get, insert, update, remove }) => {
    /**
     * CRUD on a joke
     */
    router
        .get('/random', (req, res, next) => {
            get({random: true})
            .then(joke => res.status(200).json(joke))
            .catch(err => res.status(500).json({message: "Bad request!"}))
        })
        .get('/:id', (req, res) => {
            get({id: req.params.id})
            .then(joke => {
                if (joke)  res.status(200).json(joke)
                else res.status(404).json({message: "No joke found"})
            })
            .catch(err => res.status(500).json({message: "Bad request!"}))
        })
        .put('/:id', (req, res) => {
            update(req.params.id, req.body.joke)
            .then(updatedJoke => res.status(200).json(updatedJoke))
            .catch(err => res.status(500).json({message: "Bad request!"}))
        })
        .delete('/:id', (req, res) => {
            remove(req.params.id)
            .then(result => res.status(200).json({message: "Joke removed successfully"}))
            .catch(err => res.status(500).json({message: "Bad request!"}))
        })
        .post('/', (req, res) => {
            insert(req.body.joke)
            .then(insertedJoke => res.status(200).json(insertedJoke))
            .catch(err => res.status(500).json({message: "Bad request!"}))
        })

    /**
     * Jokes filtering
     */
    router
        .get('/', (req, res) => {
            let params = {
                page: req.query.page || 1, //default pagination
                sortBy: req.query.sortBy || 'created_at',
                sort: req.query.sort || 'DESC',
                filterBy: req.query.filterBy || 'content',
                filter: req.query.filter || ''
            }

            get(params).then(response => {
                res.status(200).json(response)
            })
            .catch(err => res.status(500).json({message: err}))
        })

    return router
}