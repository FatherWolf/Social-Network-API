const router = require('express').Router();
const {
  getUsers, getUserId, makeUser, changeUser, removeUser, addFriend, deleteFriend
} = require('../../controllers/user-controller')

router
  .route('/')
  .get(getUsers)
  .post(makeUser)

router
  .route('/:id')
  .get(getUserId)
  .put(changeUser)
  .delete(removeUser)

router
  .route('/:id/friends/:friendId')
  .post(addFriend)
  .delete(deleteFriend)

module.exports = router;

// add in file locations 