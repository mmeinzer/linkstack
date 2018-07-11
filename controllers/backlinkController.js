const mongoose = require('mongoose');
const Backlink = mongoose.model('Backlink');

const backlinkController = {
  getOne(req, res) {
    const id = req.params.id;
    if (mongoose.Types.ObjectId.isValid(id)) {
      Backlink.findById(id)
        .then(doc => res.status(200).json(doc))
    } else {
      res.status(404).json(null)
    }
  },
  getAll(req, res, next) {
    Backlink.find({})
      .then(docs => res.status(200).json(docs))
      .catch(err => next(err))
  },
  createOne(req, res, next) {
    Backlink.create(req.body)
      .then(doc => res.status(201).json(doc))
      .catch(err => next(err))
  }
}

module.exports = backlinkController