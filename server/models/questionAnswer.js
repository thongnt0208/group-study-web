const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');


const commentSchema = new Schema({
  status: Boolean,
  name: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  content: String
});

const answerSchema = new Schema({
  status: Boolean,
  name: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  content: String,
  contentImage: String,
  rate: Number,
  comments: [commentSchema]
});

const questionAnswerSchema = new Schema({
  status: Boolean,
  content: String,
  contentImage: String,
  name: String,
  avatarLink: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  answers: [answerSchema]
}, {
  timestamps: true,
  collection: "QuestionAnswer"
});

questionAnswerSchema.plugin(passportLocalMongoose);

const QuestionAnswer = mongoose.model('QuestionAnswer', questionAnswerSchema);

module.exports = QuestionAnswer;
