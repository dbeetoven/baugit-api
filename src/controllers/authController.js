const Auth = require('../models/auth.model')
const express =require('express');

const router =express.Router();

const signUp = async(req, res)=>{
    try {
        const user = new Auth(req.body)
        await user.save()
        const token = await user.generateAuthToken()
        console.log(user);
        
        res.status(201).send({ user, token })
    } catch (error) {
        res.status(400).send(error)
    }
}

const login=async (req,res)=>{
    try {
        const { email, password } = req.body
        const user = await User.findByCredentials(email, password)
        // const user = await User.findOne({ email} ).exec()
        if (!user) {
            return res.status(401).send({error: 'Login failed! Check authentication credentials'})
        }
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (error) {
        res.status(400).send(error)
    }
}

const logout =async(req,res)=>{
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send(error)
    }
}

const logoutAll= async (req,res)=>{
    try {
        req.user.tokens.splice(0, req.user.tokens.length)
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send(error)
    }
}
module.exports = {
  signUp,
  login,
  logout,
  logoutAll
};
