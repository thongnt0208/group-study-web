const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;
