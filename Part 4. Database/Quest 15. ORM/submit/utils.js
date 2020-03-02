
const path = require('path'),
    fs = require('fs'),
    notepadPath = path.join(__dirname, 'notepad'),
    userInfoPath = path.join(__dirname, 'users'),
    { User, Post, UserWorkingState } = require('./models');

const utils = {}

utils.readFileAll = async (userId) => {
    try {
        const res = await Post.findAll({ where: { userId }})
        return res.map(post => post.dataValues);
    } catch (e) {
        console.error(e);
        return [];
    }
};

utils.postFile = async (title, text, userId) => {
    try {
        const res = await Post.create({
            title,
            text,
            userId,
            createdAt: new Date(),
            updatedAt: new Date()
        })
        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
};

utils.putFile = async (title, text, userId) => {
    try {
        const res = await Post.update({
            title, text, userId, updatedAt: new Date()
        });
        return true;
    } catch (e) {
        return false;
    }
};

utils.saveUserdata = async (userId, tabs, selectedTab, cursor) => {
    const sTabs = JSON.stringify(tabs);
    const sstdTab = JSON.stringify(selectedTab);
    const sCursor = JSON.stringify(cursor);
    try {
        await UserWorkingState.create({
            tabs: sTabs,
            selectedTab: sstdTab,
            cursorLen: sCursor,
            createdAt: new Date(),
            updatedAt: new Date(),
            userId
        });
        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
};

utils.putUserdata = async (userId, tabs, selectedTab, cursor) => {
    const sTabs = JSON.stringify(tabs);
    const sstdTab = JSON.stringify(selectedTab);
    const sCursor = JSON.stringify(cursor);
    try {
        await UserWorkingState.update({
            tabs: sTabs,
            selectedTab: sstdTab,
            cursorLen: sCursor,
            updatedAt: new Date(),
        }, { where : { userId }});
        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
};

utils.readUserData = async (userId) => {
    try {
        return await UserWorkingState.findOne({ where: { userId } })
    } catch (e) {
        console.error(e);
        return false;
    }
}

utils.login = async (userId, password) => {
    const user = await User.findOne({ where: { id: userId } });
    if (user == null || user.dataValues.password !== password) {
        return {
            isLogin: false,
            result: true
        }
    } else {
        return {
            userId: user.dataValues.id,
            nickname: user.dataValues.nickname,
            isLogin: true,
            result: true
        }
    }
};

module.exports = utils;