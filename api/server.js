// BUILD YOUR SERVER HERE
const express = require('express');
const Users = require('./users/model')

const server = express();

// global middleware
server.use(express.json());

server.get('/api/users', (req, res) => {
  Users.find()
    .then(users => {
      res.status(200).json(users)
    })
    .catch(() => {
      res.status(500).json({ message: 'something funky just happened'})
    })
});

server.get('/api/users/:id', (req, res) => {
  Users.findById(req.params.id)
    .then(result => {
      if (result == null) {
        res.status(404).json({ message: "The user with the specified ID does not exist" })
      } else {
        res.status(200).json(result)
      }
    })
    .catch(() => {
      res.status(500).json({ message: "The user information could not be retrieved" })
    })
})

server.post('/api/users', (req, res) => {

  if(req.body.name && req.body.bio) {
    Users.insert(req.body)
      .then(result => {
        res.status(201).json(result)
      })
      .catch(() => {
        res.status(500).json({ message: "There was an error while saving the user to the database" })
      })
  } else {
    res.status(400).json({ message: "Please provide name and bio for the user" })
  }
});

server.put('/api/users/:id', (req, res) => {
  const { name, bio } = req.body;
  if (name && bio) {
    Users.update(req.params.id, {name, bio})
      .then(result => {
        if (result == null) {
          res.status(404).json({ message: "The user with the specified ID does not exist" })
        } else {
          res.status(200).json(result)
        }
      })
      .catch(() => {
        res.status(500).json({ message: "The user information could not be modified" })
      })
  } else {
    res.status(400).json({ message: "Please provide name and bio for the user" })
  }

});

server.delete('/api/users/:id', (req, res) => {

  Users.remove(req.params.id)
   .then(result => {
    if(result == null) {
      res.status(404).json({ message: "The user with the specified ID does not exist" })
    } else {
      res.json(result)
    }
   })
})




module.exports = server; // EXPORT YOUR SERVER instead of {}
