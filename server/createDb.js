require('dotenv').config();
const mongoose = require("mongoose");

// Import the models
const Group = require("./models/groups");
const Discussion = require("./models/discussion");
const Chat = require("./models/chat");
const QuestionAnswer = require("./models/questionAnswer");
const User = require("./models/users");

const url = process.env.DB_CONNECTION_STRING;
// Connect to MongoDB
mongoose
    .connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Successfully connected to MongoDB."))
    .catch((err) => console.error("Connection error", err));

// Function to create a group
const createGroup = async function (groupData) {
    try {
        const group = await Group.create(groupData);
        console.log("Group created:", group);
        return group;
    } catch (error) {
        console.error("Error creating group:", error);
    }
};

// Function to create a discussion
const createDiscussion = async function (groupId, discussionData) {
    try {
        const discussion = await Discussion.create(discussionData);
        const group = await Group.findByIdAndUpdate(
            groupId,
            { $push: { discussions: discussion._id } },
            { new: true, useFindAndModify: false }
        );
        console.log("Discussion created:", discussion);
        console.log("Group updated:", group);
        return discussion;
    } catch (error) {
        console.error("Error creating discussion:", error);
    }
};

// Function to create a chat
const createChat = async function (groupId, chatData) {
    try {
        // Parse the date string and create a Date object
        const time = new Date(chatData.time.$date);

        const chat = await Chat.create({
            ...chatData,
            time: time,
        });

        const group = await Group.findByIdAndUpdate(
            groupId,
            { $push: { chat: chat._id } },
            { new: true, useFindAndModify: false }
        );

        console.log("Chat created:", chat);
        console.log("Group updated:", group);
        return chat;
    } catch (error) {
        console.error("Error creating chat:", error);
    }
};


// Function to create a question answer
const createQuestionAnswer = async function (discussionId, questionAnswerData) {
    try {
        const questionAnswer = await QuestionAnswer.create(questionAnswerData);
        const discussion = await Discussion.findByIdAndUpdate(
            discussionId,
            { $push: { qAndAs: questionAnswer._id } },
            { new: true, useFindAndModify: false }
        );
        console.log("QuestionAnswer created:", questionAnswer);
        console.log("Discussion updated:", discussion);
        return questionAnswer;
    } catch (error) {
        console.error("Error creating QuestionAnswer:", error);
    }
};

// Function to create a user
const createUser = async function (userData) {
    try {
        const user = await User.create(userData);
        console.log("User created:", user);
        return user;
    } catch (error) {
        console.error("Error creating user:", error);
    }
};

// Add Chat to Group
const addChatToGroup = (groupId, chatId) => {
    return Group.findByIdAndUpdate(groupId, {
        $push: { chat: chatId }
    },
        { new: true, useFindAndModify: false })
}

// Add Group to User.createdGroups
const addGroupToUserCreated = (groupId, userId) => {
    return User.findByIdAndUpdate(userId,
        { $push: { createdGroups: groupId } },
        { new: true, useFindAndModify: false })
}

// Add Group to User.joinedGroups
const addGroupToJoinedGroups = (groupId, userId) => {
    return User.findByIdAndUpdate(userId,
        { $push: { joinedGroups: groupId } },
        {
            new: true,
            useFindAndModify: false
        });
};

// Add Discussion to Group
const addDiscussionToGroup = (discussionId, groupId) => {
    return Group.findByIdAndUpdate(
        groupId,
        { $push: { discussions: discussionId } },
        { new: true, useFindAndModify: false }
    );
};

// Add Discussion to User.createdDiscussions
const addDiscussionToUser = (discussionId, userId) => {
    return User.findByIdAndUpdate(
        userId,
        { $push: { createdDiscussions: discussionId } },
        { new: true, useFindAndModify: false }
    );
};

// Add User to Discussion.admin
const addUserToDiscussionAdmin = (userId, discussionId) => {
    return Discussion.findByIdAndUpdate(
        discussionId,
        { admin: userId },
        { new: true, useFindAndModify: false }
    );
};

// Add QuestionAnswer to Discussion.qAndAs
const addQuestionAnswerToDiscussion = (questionAnswerId, discussionId) => {
    return Discussion.findByIdAndUpdate(
        discussionId,
        { $push: { qAndAs: questionAnswerId } },
        { new: true, useFindAndModify: false }
    );
};

// Add User to Group Admin
const addUserToGroupAdmin = (userId, groupId) => {
    return Group.findByIdAndUpdate(
        groupId, { admin: userId }
    )
}

// Add User to Group Members
const addUserToGroupMembers = (userId, groupId) => {
    return Group.findByIdAndUpdate(
        groupId, { $push: { members: userId } }
    )
}

// Function to get a group with populated data
const getGroupWithPopulate = async function (groupId) {
    try {
        const group = await Group.findById(groupId)
            .populate({
                path: 'admin'
            })
            .populate({
                path: 'members',
                select: ' _id'
            })
            .populate({
                path: 'discussions',
                // populate: {
                //     path: 'qAndAs',
                //     populate: {
                //         path: 'userId',
                //         select: '_id', // Select the fields you want to populate
                //     },
                // },
            })
            .populate({
                path: 'discussions',
                populate: {
                    path: 'admin'
                },
            })
            .populate({
                path: 'chat'
            });
        console.log("Group with populated data:", group);
        return group;
    } catch (error) {
        console.error("Error getting group with populated data:", error);
    }
};

// Function to get a discussion with populated data
const getDiscussionWithPopulate = async function (discussionId) {
    try {
        const discussion = await Discussion.findById(discussionId)
            .populate({
                path: 'admin',
                select: '_id username email'
            })
            .populate({
                path: 'qAndAs'
            });
        console.log("Discussion with populated data:", discussion);
        return discussion;
    } catch (error) {
        console.error("Error getting discussion with populated data:", error);
    }
};

// Function to get a question answer with populated data
const getQuestionAnswerWithPopulate = async function (questionAnswerId) {
    try {
        const questionAnswer = await QuestionAnswer.findById(questionAnswerId)
            .populate({
                path: 'userId',
                select: 'username email _id',
            })
            .populate({
                path: 'answers.userId',
                select: 'username email _id',
            })
            .populate({
                path: 'answers.comments.userId',
                select: 'username email _id',
            });
        console.log("QuestionAnswer with populated data:", questionAnswer);
        return questionAnswer;
    } catch (error) {
        console.error("Error getting question answer with populated data:", error);
    }
};

// Function to get a user with populated data
const getUserWithPopulate = async function (userId) {
    try {
        const user = await User.findById(userId)
            .populate('createdGroups')
            .populate('joinedGroups');
        console.log("User with populated data:", user);
        return user;
    } catch (error) {
        console.error("Error getting user with populated data:", error);
    }
};

// --------------------------------------------
// Run the population process
const run = async function () {
    try {
        // CREATE COLLECTIONS
        let group = await createGroup({
            name: "Software Enhancement Team",
            status: true,
            cover_link: "https://example.com/group1_cover.png",
        });

        let discussion = await createDiscussion(group._id, {
            "content": "I have uploaded the meeting agenda. Please review it before the meeting.",
            "imageLink": null,
            "document": "https://example.com/agenda.pdf"
        });

        let chat = await createChat(group._id, {
            names: [
                "LyHN",
                "BaoNT"
            ],
            time: {
                "$date": "2023-06-20T05:08:42.241Z"
            }
        });

        let questionAnswer = await createQuestionAnswer(discussion._id, {
            status: true,
            content: "What is the meaning of life?",
            contentImage: "https://example.com/image.png",
            name: "John Doe",
            avatarLink: "https://example.com/avatar.png",
        });

        let userAdmin = await createUser({
            "username": "ThongNT91",
            "password": "password123",
            "email": "thongntse160850@fpt.edu.vn",
            "name": "Nguyen Trung Thong",
            "avatarLink": "https://example.com/avatar/thongnt91.png",
            "status": true,
            "role": "admin"
        });

        let userMem1 = await createUser({
            "username": "AnhTD",
            "password": "password123",
            "email": "thongntse160850@fpt.edu.vn",
            "name": "Nguyen Anh Ha",
            "avatarLink": "https://example.com/avatar/ha12.png",
            "status": true,
            "role": "member"
        });

        let userMem2 = await createUser({
            "username": "BaoHD",
            "password": "password123",
            "email": "baohaga@fpt.edu.vn",
            "name": "Nguyen Anh Bao",
            "avatarLink": "https://example.com/avatar/bao01.png",
            "status": true,
            "role": "member"
        });


        //  ADD COLLECTIONS RELATIONSHIPS
        let groupToUserCreated = await addGroupToUserCreated(group._id, userAdmin.id);
        let groupToJoinedGroups = await addGroupToJoinedGroups(group._id, userAdmin.id);
        let chatToGroup = await addChatToGroup(group._id, chat._id);
        let discussionToGroup = await addDiscussionToGroup(discussion._id, group._id);
        let discussionToUser = await addDiscussionToUser(discussion._id, userAdmin.id);
        let userToDiscussionAdmin = await addUserToDiscussionAdmin(userAdmin.id, discussion._id);
        let questionAnswerToDiscussion = await addQuestionAnswerToDiscussion(questionAnswer._id, discussion._id);
        let userToGroupAdmin = await addUserToGroupAdmin(userAdmin.id, group._id);
        let userToGroupMember1 = await addUserToGroupMembers(userMem1._id, group._id);
        let userToGroupMember2 = await addUserToGroupMembers(userMem2._id, group._id);

        // GET COLLECTIONS WITH POPULATED DATA
        group = await getGroupWithPopulate(group._id);

        userAdmin = await getUserWithPopulate(userAdmin.id);

        discussion = await getDiscussionWithPopulate(discussion._id);

        questionAnswer = await getQuestionAnswerWithPopulate(questionAnswer._id);

    } catch (error) {
        console.error("Error:", error);
    }
};

// Run the population process
run();
