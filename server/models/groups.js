const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: {
    type: String,
    required: true
  },
  status: {
    type: Boolean,
    default: false
  },
  cover_link: {
    type: String
  },
  discussions: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Discussion'
    }
  ],
  members: [
    {
      name: {
        type: String
      },
      userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    }
  ],
  chat: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Chat'
    }
  ],
  reports: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Report'
    }
  ]
}, {
  timestamps: true
});

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;
