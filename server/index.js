//Create REST API
const express = require('express'),
    http = require('http');
const hostname = 'localhost';
const port = 3000;
const cors = require('cors');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const app = express();
app.use(cors())

// Import router
const chatRouter = require('./routers/chat');
const groupsRouter = require('./routers/groups');
const discussionRouter = require('./routers/discussion');
const groupCategoryRouter = require('./routers/groupCategory');
const usersRouter = require('./routers/users');
const questionAnswerRouter = require('./routers/questionAnswer');

// Import models
const Chat = require('./models/chat');
const Group = require('./models/groups');
const Discussion = require('./models/discussion');
const GroupCategory = require('./models/groupCategory');
const User = require('./models/users');
const QuestionAnswer = require('./models/questionAnswer');

// Use routers
app.use('/chats', chatRouter);
app.use('/groups', groupsRouter);
app.use('/discussions', discussionRouter);
app.use('/groups-categories', groupCategoryRouter);
app.use('/users', usersRouter);
app.use('/questions-answers', questionAnswerRouter);

// passport config
app.use(passport.initialize());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


const server = http.createServer(app);

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});