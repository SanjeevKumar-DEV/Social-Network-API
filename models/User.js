const { Schema, model } = require('mongoose');

// User Schema

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, 'Please Enter Your Name'],
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
          'Enter valid Email address.'],
      required: [true, 'Please enter Email Address'],
      unique: true,
      lowercase: true,
  },
    // user having multiple thoughts
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
      },
    ],
    // User having multiple friends
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

const User = model('User', userSchema);

module.exports = User;
