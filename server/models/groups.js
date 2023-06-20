const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  admin: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    require: true
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
  timestamps: true,
  collection: "Group"
});

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;
