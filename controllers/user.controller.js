const User = require('../models/user.model');   
const bcyrpt = require('bcryptjs');
const createError = require('http-errors');
const {signupSchema,loginSchema} = require('../middlewares/validation_schema');
const { accessTokenTime,secret } = require('../configs/auth.config');
exports.signup = async (req, res) => {
    try{
        const {name, age, email} = req.body;
        // if(!req.body.name || !req.body.age || !req.body.email || !req.body.password){
        //     return res.status(400).send({message:"name,age,email and password are required"});
        // }
        const result  = async loginSchemaalidateAsync(req.body);
        await User.createIndex({email:1},{unique:true});
        const password =  bcyrpt.hash(req.body.password, 8);
        
        const emailExists = await User.findOne({email});
        if(emailExists){
            throw createError.Conflict(`${email} is already taken`);
        }

        const user = await User.create({name, age, email, password});

        res.status(201).send({message:"signedUp successfully",data:user});
        
        
    }catch(err){
        console.log(err);
        throw createError.InternalServerError(err.message);
        // res.status(500).send({message:"Internal Server Error"+err.message});
    }
};
exports.login = async (req, res) => {
    try{
        const {email, password} = req.body;
        if(!email || !password){
            throw createError.BadRequest("email and password are required");
        }
        const user = await User.findOne({email});
        if(!user){
            throw createError.NotFound("User not found");
            // return res.status(400).send({message:"User not found"});
        }
        const isPasswordValid = await bcyrpt.compare(password, user.password);
        if(!isPasswordValid){
            throw createError.Unauthorized("Invalid Password");
            // return res.status(400).send({message:"Invalid Password"});
        }
        const accessToken = jwt.sign({id:user.email},secret,{expiresIn:accessTokenTime});
        res.status(200).send({message:"Logged in successfully",data:user});
    }catch(err){
        console.log(err);
        throw createError.InternalServerError(err.message);
        // res.status(500).send({message:"Internal Server Error"+err.message});
    }
};
