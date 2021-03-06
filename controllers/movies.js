//=======CONFIGURATION=====//
const express = require('express')
const MOCKBUSTER = express.Router()
const Movies = require('../models/movie.js')



//CREATE
// curl -X POST -H "Content-Type: application/json" -d '{"title":"GA Week 9"}' 'http://localhost:3003/mockbuster'
MOCKBUSTER.post('/', async (req, res) => {
    console.log('we received a post request');
    Movies.create(req.body, (error, createdMovie) => {
      if (error) {
        res.status(400).json({ error: error.message })
      }
      res.status(200).send(createdMovie)
    })
})
//INDEX
// curl 'http://localhost:3003/mockbuster'
MOCKBUSTER.get('/', (req, res) => {
    Movies.find({}, (err, listedMovie) => {
      if (err) {
        res.status(400).json({ error: err.message })
      }
      res.status(200).json(listedMovie)
    })
})

//get info for one One movie
// curl 'http://localhost:3003/mockbuster/:id'
MOCKBUSTER.get('/:id', (req, res) => {
  Movies.findById(req.params.id, (err, foundMovie) => {
    if (err) {
      res.status(400).json({ error: err.message })
    }
    res.status(200).json(foundMovie)
  })
})

//UPDATE 

// curl -X PUT -H "Content-Type: application/json" -d '{"title":" Test Update "}' 'http://localhost:3003/mockbuster/:id'
MOCKBUSTER.put('/:id', (req, res) => {
  Movies.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedMovie) => {
    console.log(req.params.id)
    if (err) {
      res.status(400).json({ error: err.message })
    }
    res.status(200).json(updatedMovie)
  })
  console.log(req.params.id)
})
//DELETE
// curl -X DELETE 'http://localhost:3003/mockbuster/:id' 
MOCKBUSTER.delete('/:id', (req, res) => {
  Movies.findByIdAndRemove(req.params.id, (err, deletedMovie) => {
    if (err) {
      res.status(400).json({ error: err.message })
    }
    res.status(200).json(deletedMovie)
  })

})

module.exports = MOCKBUSTER

