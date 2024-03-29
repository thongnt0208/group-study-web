const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');


const groupCategorySchema = new Schema({
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
  timestamps: true,
  collection: "GroupCategory"
});

groupCategorySchema.plugin(passportLocalMongoose);

const GroupCategory = mongoose.model('GroupCategory', groupCategorySchema);

module.exports = GroupCategory;
