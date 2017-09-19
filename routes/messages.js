const express = require('express');
const router = express.Router();

const queries = require('../db/queries.js');

router.get('/', (req, res) => {
  queries
    .getAllMessages()
    .then(messages => {
      res.json(messages);
    })
});

router.get('/viewrooms', (req, res) => {
  queries
  .getAllViewrooms()
  .then(viewrooms => {
    res.json(viewrooms);
  })
})

router.get('/viewrooms/:id', (req, res) => {
  queries
    .getMessagesByRoom(req.params.id)
    .then(messages => {
      res.json(messages);
    })
});

router.get('/viewers', (req, res) => {
  queries
    .getAllViewers()
    .then(messages => {
      res.json(messages);
    })
});

router.get('/viewers/:name', (req, res) => {
  queries
    .getViewerByName(req.params.name)
    .then(viewer => {
      res.json(viewer);
    })
});

router.get('/viewrooms/:name', (req, res) => {
  queries
    .getViewRoomByName(req.params.name)
    .then(viewroom => {
      res.json(viewroom)
    })
})

router.post('/viewrooms', (req,res) => {
  queries
  .createViewRoom(req.body)
  .then(viewroom => {
    res.json(viewroom)
  })
})

router.post('/', (req, res) => {
  queries
    .create(req.body)
    .then(messages => {
      res.json(messages);
    })
})

module.exports = router;
