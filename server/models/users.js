const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  name: String,
  avatarLink: String,
  status: Boolean,
  role: String,
  createdGroups: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Group"
  }],
  joinedGroups: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Group"
  }]
}, {
  timestamps: true,
  collection: "User"
});

const User = mongoose.model('User', userSchema);

module.exports = User;
