const { User, Thought } = require('../models');

const userController = {
  // get all users
  getUsers(req, res) {
    User.find()
      .select('-__v')
      .then((data) => {
        res.json(data);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json(error);
      });
  },
  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((data) => {
        res.json(data);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json(error);
      });
  },
  // get user by id
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v').populate('friends').populate('thoughts')
      .then((data) => {
        if (!data) {
          return res.status(404).json({ message: 'User not found with this id!' });
        }
        res.json(data);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json(error);
      });
    },
    // update user
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      {
        $set: req.body,
      },
      {
        runValidators: true,
        new: true,
      }
    )
      .then((data) => {
        if (!data) {
          return res.status(404).json({ message: 'User not present with this ID.' });
        }
        res.json(data);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json(error);
      });
  },
  // delete user
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((data) => {
        if (!data) {
          return res.status(404).json({ message: 'User id not present' });
        }
        return Thought.deleteMany({ _id: { $in: data.thoughts } });
      })
      .then(() => {
        res.json({ message: 'User and thoughts deleted' });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json(error);
      });
  },

  // Add friends
  addFriend(req, res) {
    User.findOneAndUpdate({ _id: req.params.userId }, { $addToSet: { friends: req.body.friendId } }, { new: true })
      .then((data) => {
        if (!data) {
          return res.status(404).json({ message: 'User ID does not exist.' });
        }
        res.json(data);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json(error);
      });
  },
};

module.exports = userController;