const { Schema, model, Types } = require('mongoose');
const ReactionSchema = require('./Reaction');

const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280
    },


    createdAt: {
      type: Date,
      default: Date.now,
      get: Date => Date.toLocaleString('en-US'),
    },


    username: {
      type: String,
      required: true
    },

    reactions: [ReactionSchema]
  },

  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
);

ThoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

const Thought = model('thought', ThoughtSchema)
module.exports = Thought;