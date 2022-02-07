const { User, Thought } = require('../models');

const getUsers = (req, res) => {
  User
    .find({})
    .populate({
      path: 'thoughts'
    })
    // .populate({
    //   path: 'friends'
    // })
    .then(dbData => res.json(dbData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
}

const getUserId = (req, res) => {
  User
    .findOne({
      _id: req.params.id
    })
    .populate({
      path: 'thoughts'
    })
    .populate({
      path: 'friends'
    })
    .then(dbData => res.json(dbData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
}

const makeUser = (req, res) => {
  User
    .create(req.body)
    .then(dbData => res.json(dbData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
}

const changeUser = (req, res) => {
  User
    .findOneAndUpdate({
      _id: req.params.id
    }, req.body, {
      new: true,
      runValidators: true
    })
    .then(dbData => res.json(dbData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
}

const removeUser = (req, res) => {
  User
    .findOneAndDelete({
      _id: req.params.id
    })
    .then(dbData => {
      User
        .updateMany({
          _id: {
            $in: dbData.friends
          }
        },
          {
            $pull: {
              friends: req.params.id
            }
          })
        .then(() => {
          Thought
            .deleteMany({
              username: dbData.username
            })
            .then(() => {
              res.json({ message: 'User Deleted' })
            })
            .catch(err => {
              console.log(err);
              res.status(500).json(err);
            })
        })
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        })
    })
}

const addFriend = (req, res) => {
  User
    .findOneAndUpdate({
      _id: req.params.id
    }, {
      $push: {
        friends: req.params.friendId
      }
    }, {
      new: true
    })
    .then(dbData => res.json(dbData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
}

const deleteFriend = (req, res) => {
  User
    .findOneAndUpdate({
      _id: req.params.id
    }, {
      $pull: { friends: req.params.friendId }
    }, {
      new: true
    })
    .then(dbData => res.json(dbData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
}

module.exports = {
  getUsers, getUserId, makeUser, changeUser, removeUser, addFriend, deleteFriend
}