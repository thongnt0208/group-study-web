const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const chatSchema = new Schema({
  names: [
    {
      type: String
    }
  ],
  time: {
    type: Date,
    required: true
  }
}, {
  timestamps: true,
  collection: "Chat"
});

chatSchema.plugin(passportLocalMongoose);

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;
