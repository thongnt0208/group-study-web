const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  username: String,
  password: String,
  name: String,
  avatarLink: String,
  status: Boolean,
  role: String,
  groups: [mongoose.Schema.Types.ObjectId]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
