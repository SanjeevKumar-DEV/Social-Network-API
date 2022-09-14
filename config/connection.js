const mongoose = require("mongoose");

mongoose.connect(
  // Connection Properties
  process.env.MONGODB_URI || "mongodb://localhost:27017/socialmedia",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Export connection object

module.exports = mongoose.connection;
