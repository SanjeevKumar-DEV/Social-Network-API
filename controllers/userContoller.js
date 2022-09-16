const { User, Thought } = require('../models');

const userController = {
  // get all users
  getUsers(req, res) {
    User.find()
      .select('-__v')
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
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
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
    },
};

module.exports = userController;