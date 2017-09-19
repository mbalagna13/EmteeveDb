const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const router = express.Router();
const Viewer = require('../db/queries')

require('dotenv').config();

router.get('/', (req, res) => {
  res.json({
    message:'WORKING'
  })
})

function validViewer(viewer) {
  const vaildViewerName = true
  const validPassword = true

  return vaildViewerName && validPassword;
}

router.post('/signup', (req, res, next) => {
  if(validViewer(req.body)) {
    Viewer
    .getViewerByName(req.body.viewer_name)
    .then(viewer => {
      console.log(viewer)
      if(viewer) {
        bcrypt.hash(req.body.password, 10)
        .then((hash) => {
          console.log(hash);
          const viewer = {
            viewer_name: req.body.viewer_name,
            password: hash
          }
          Viewer
          .createNewViewer(viewer)
          .then(data => {
            res.json(data)
          })
        })
      } else {
        next(new Error('UserName already taken'))
      }
    })
  } else {
    next(new Error('Invalid UserName'))
  }
});

router.post('/login', (req, res, next) => {
  if(validViewer(req.body)) {
    Viewer
    .getViewerByName(req.body.viewer_name)
    .then(viewer => {
      if (viewer) {
        bcrypt.compare(req.body.password, viewer[0].password)
          .then((id) => {
            console.log(viewer);
            if (id) {
              jwt.sign({
                id: viewer[0]._id
              }, process.env.TOKEN_SECRET, {expiresIn: '3hr'}, (err, token) => {
                console.log('err', err);
                console.log('token', token);
                res.json({
                  viewer,
                  id,
                  token,
                  message: 'coolio'
                })
                alert('Sign in Successful')
              })
            } else {
              next( new Error('Invalid user'))
            }
          })
      } else {
        next( new Error('Invalid user'))
      }
    })
  } else {
    next(new Error('INvalid Password or Username'))
  }
})


module.exports = router;
