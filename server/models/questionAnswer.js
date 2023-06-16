const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  status: Boolean,
  name: String,
  userId: mongoose.Schema.Types.ObjectId,
  content: String
});

const answerSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  status: Boolean,
  name: String,
  userId: mongoose.Schema.Types.ObjectId,
  content: String,
  contentImage: String,
  rate: Number,
  comments: [commentSchema]
});

const questionAnswerSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  status: Boolean,
  content: String,
  contentImage: String,
  name: String,
  avatarLink: String,
  answers: [answerSchema]
}, {
  timestamps: true
});

const QuestionAnswer = mongoose.model('questionanswers', questionAnswerSchema);

module.exports = QuestionAnswer;
