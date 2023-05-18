const { Op } = require("sequelize");
const { User } = require("../db");
const sequelize = require('sequelize')
const bcrypt = require('bcrypt')

async function getAllUsers(){
    try {
        const users = await User.findAll()
        return users
    } catch (error) {
        console.error("ERROR: ",error.message)
        throw new Error(error.message)
    }
}
async function createUser({name, lName, email, phone, dni, password, picture, isAdmin}){
    try {
        const hashPass = await bcrypt.hash(password, 10)
        const newUser = await User.create({name, lName, email, phone, dni, password: hashPass, picture, isAdmin})
        return newUser
    } catch (error) {
        console.error("createUser controller ERROR: ",error.message)
        throw new Error(error)
    }
}

module.exports = {
    getAllUsers,
    createUser
}