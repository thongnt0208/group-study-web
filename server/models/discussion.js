const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');


const discussionSchema = new Schema({
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
      ref: 'QuestionAnswer'
    }
  ],
  admin: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    require: true
  }
}, {
  timestamps: true,
  collection: "Discussion"
});

discussionSchema.plugin(passportLocalMongoose);

const Discussion = mongoose.model('Discussion', discussionSchema);

module.exports = Discussion;
