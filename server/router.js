const express = require('express')
const ObjectID = require('mongodb').ObjectID

const createRouter = function(collection) {
  const router = express.Router();

  router.get('/', (req, res) => {
    collection
      .find()
      .toArray()
      .then((docs) => res.json(docs))
      .catch((err) => {
        console.error(err);
        res.status(500);
        res.json({ status: 500, error: err });
      });
  });

  router.post('/', (req, res) =>{
    const newData = req.body;
    collection
    .insertOne(newData)
    .then((result) => {
      collection
      .find()
      .toArray()
      .then((docs) => res.json(docs));
    })
    .catch((err) => {
      console.error(err);
      res.status(500);
      res.json({status:500, error: console.error()})
    })
  })
  return router
}


module.exports = createRouter
