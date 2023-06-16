const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupCategorySchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: {
    type: String,
    required: true
  },
  groups: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Group'
    }
  ]
}, {
  timestamps: true
});

const GroupCategory = mongoose.model('GroupCategory', groupCategorySchema);

module.exports = GroupCategory;
