const mongoose = require('mongoose');
const User = mongoose.model('User');

const userController = {
  getOne(req, res) {
    const id = req.params.id;
    if (mongoose.Types.ObjectId.isValid(id)) {
      User.findById(id)
        .then(doc => res.status(200).json(doc))
        .catch(err => next(err))
    } else {
      res.status(404).json(null)
    }
  },
  getAll(req, res, next) {
    User.find({})
      .then(docs => res.status(200).json(docs))
      .catch(err => next(err))
  },
  register(req, res, next) {
    User.register(new User({email: req.body.email}), req.body.password)
      .then(doc => res.status(201).json(doc))
      .catch(err => next(err))
  }
}

module.exports = userController