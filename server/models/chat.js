const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatSchema = new Schema({
  _id: Schema.Types.ObjectId,
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
  timestamps: true
});

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;
