const { Thought, User } = require("../models");

const getThoughts = (req, res) => {
  Thought.find({})
    .then((dbData) => res.json(dbData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
};

const getThoughtId = (req, res) => {
  Thought.findOne({
    _id: req.params.id,
  })
    .then((dbData) => res.json(dbData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
};

const makeThought = (req, res) => {
  Thought.create(req.body)
    .then((thoughtData) => {
      return User.findOneAndUpdate(
        {
          _id: req.body.userId,
        },
        {
          $addToSet: {
            thoughts: thoughtData._id
          },
        },
        {
          new: true,
        }
      );
    })
    .then((dbData) => res.json(dbData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
};

const changeThought = (req, res) => {
  Thought.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    {
      $set: req.body,
    },
    {
      runValidators: true,
      new: true,
    }
  )
    .then((dbData) => res.json(dbData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
};

const removeThought = (req, res) => {
  Thought.findOneAndDelete({
    _id: req.params.id,
  })
    .then((dbData) => res.json(dbData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
};

const addReaction = (req, res) => {
  Thought.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    {
      $push: {
        reactions: req.body,
      },
    },
    {
      new: true,
      runValidators: true,
    }
  )
    .then((dbData) => res.json(dbData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
};

const removeReaction = (req, res) => {
  Thought.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    {
      $pull: {
        reactions: {
          reactionId: req.params.reactionId,
        },
      },
    },
    {
      new: true,
    }
  )
    .then((dbData) => res.json(dbData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
};

module.exports = {
  getThoughts,
  getThoughtId,
  makeThought,
  changeThought,
  removeThought,
  addReaction,
  removeReaction,
};
