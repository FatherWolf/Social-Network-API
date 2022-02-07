const router = require('express').Router();
const { getThoughts, getThoughtId, makeThought, changeThought, removeThought, addReaction, removeReaction } = require('../../controllers/thought-controller')


router
  .route('/')
  .get(getThoughts)
  .post(makeThought)

router
  .route('/:id')
  .get(getThoughtId)
  .put(changeThought)
  .delete(removeThought)

router
  .route('/:id/reactions')
  .post(addReaction)

router
  .route('/:id/reactions/:reactionId')
  .delete(removeReaction)

module.exports = router;
// update file paths
