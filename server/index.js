//Create REST API
const express = require('express'),
    http = require('http');
const hostname = 'localhost';
const port = 3000;
const cors = require('cors');

const app = express();
app.use(cors())

const chatRouter = require('./routers/chat');
const groupsRouter = require('./routers/groups');
const discussionRouter = require('./routers/discussion');
const groupCategoryRouter = require('./routers/groupCategory');
const usersRouter = require('./routers/users');
const questionAnswerRouter = require('./routers/questionAnswer');

app.use('/chat', chatRouter);
app.use('/groups', groupsRouter);
app.use('/discussion', discussionRouter);
app.use('/groupCategory', groupCategoryRouter);
app.use('/users', usersRouter);
app.use('/questionAnswer', questionAnswerRouter);
const server = http.createServer(app);

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});