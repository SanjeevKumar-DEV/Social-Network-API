const { Thought, User, Reaction } = require('../models');

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
  // update an existing thought
  updateThought(req, res) {
    Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $set: req.body }, { runValidators: true, new: true })
      .then((data) => {
        if (!data) {
          return res.status(404).json({ message: 'Thought does not exist' });
        }
        res.json(data);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json(error);
      });
  },
  // delete a thought
  removeThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
      .then((data) => {
        if (!data) {
          return res.status(404).json({ message: 'No thought with this id exist' });
        }

        // remove thought id from user
        return User.findOneAndUpdate(
          { thoughts: req.params.thoughtId },
          { $pull: { thoughts: req.params.thoughtId } },
          { new: true }
        );
      })
      .then((data) => {
        if (!data) {
            // Thought deleted but no associated user existed.
          return res.status(404).json({ message: 'Thought deleted but no user with this thought id!' });
        }
        res.json({ message: 'Thought deleted' });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json(error);
      });
  },
  // Add reaction
  addReaction(req, res) {
    Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $addToSet: { reactions: req.body } }, { runValidators: true, new: true })
      .then((data) => {
        if (!data) {
          return res.status(404).json({ message: 'This thought does not exist' });
        }
        res.json(data);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json(error);
      });
  },
  // Remove reaction
  removeReaction(req, res) {
    Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $pull: { reactions: { reactionId: req.params.reactionId } } }, { runValidators: true, new: true })
      .then((data) => {
        if (!data) {
          return res.status(404).json({ message: 'This thought does not exist' });
        }
        res.json(data);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json(error);
      });
  },
//Remove reaction
// removeReaction(req, res) {
//     Reaction.findOneAndRemove({ _id: req.params.reactionId })
//       .then((data) => {
//         if (!data) {
//           return res.status(404).json({ message: 'No Reaction with this id exist' });
//         }

//         // remove thought id from user
//         return Thought.findOneAndUpdate(
//           { reactions: req.params.reactionId },
//           { $pull: { reactions: req.params.reactionId } },
//           { new: true }
//         );
//       })
//       .then((data) => {
//         if (!data) {
//             // Thought deleted but no associated user existed.
//           return res.status(404).json({ message: 'Reaction ID deleted but no reaction associated with this thought id!' });
//         }
//         res.json({ message: 'Reaction deleted' });
//       })
//       .catch((error) => {
//         console.log(error);
//         res.status(500).json(error);
//       });
//   },
};

module.exports = thoughtController;
