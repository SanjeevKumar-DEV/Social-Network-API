const { Thought, User } = require('../models');

const thoughtController = {
    // get thoughts
    getThoughts(req, res) {
      Thought.find()
        .sort({ createdAt: -1 })
        .then((data) => {
          res.json(data);
        })
        .catch((error) => {
          console.log(error);
          res.status(500).json(error);
        });
    },
    // create thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((data) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: data._id } },
          { new: true }
        );
      })
      .then((data) => {
        if (!data) {
          return res.status(404).json(
            { message: 'No user with this id, but thought created.' });
        }

        res.json({ message: 'Thought created!' });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json(error);
      });
  },
  // Get single thought
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .then((data) => {
        if (!data) {
          return res.status(404).json({ message: 'No thought exist' });
        }
        res.json(data);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json(error);
      });
  },
};

module.exports = thoughtController;
