const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const discussionSchema = new Schema({
  _id: Schema.Types.ObjectId,
  adminName: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  imageLink: {
    type: String
  },
  document: {
    type: String
  },
  qAndAs: [
    {
      type: Schema.Types.ObjectId,
      ref: 'QAndA'
    }
  ]
}, {
  timestamps: true
});

const Discussion = mongoose.model('Discussion', discussionSchema);

module.exports = Discussion;
