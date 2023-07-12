const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');


const userSchema = new Schema({
  username: String,
  password: String,
  email: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    default: ''
  },
  avatarLink: {
    type: String,
    default: 'https://cdn-icons-png.flaticon.com/512/3177/3177440.png'
  },
  status: {
    type: Boolean,
    default: true
  },
  role: {
    type: String,
    default: 'member'
  },
  createdGroups: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Group"
  }],
  joinedGroups: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Group"
  }],
  createdDiscussions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Discussion"
  }],
  createdQandAs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "QuestionAnswer"
  }]
}, {
  timestamps: true,
  collection: "User"
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', userSchema);

module.exports = User;
