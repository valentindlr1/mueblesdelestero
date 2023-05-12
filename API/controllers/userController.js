const { Op } = require("sequelize");
const { User } = require("../db");
const sequelize = require('sequelize')

async function getAllUsers(){
    try {
        const users = await User.findAll()
        return users
    } catch (error) {
        console.error("ERROR: ",error.message)
        throw new Error(error.message)
    }
}

module.exports = {
    getAllUsers
}