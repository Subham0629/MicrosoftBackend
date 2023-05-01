const express=require("express");
const { UserModel } = require("../Models/User.model");
const userRouter=express.Router()
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

userRouter.post("/register",async(req,res)=>{
    const {email,pass,name,age}=req.body
    try {
        bcrypt.hash(pass, 5, async(err, hash)=> {
            const user=new UserModel({email,name,age,pass:hash});
            await user.save()   
            res.status(200).send({"msg":"Added new User"})
            
        });
    } catch (err) {
        res.status(200).send({"err":err.message})

    }
})

userRouter.post("/login",async(req,res)=>{
    console.log("First");
    try {
       const {email,pass}=req.body;
       const user=await UserModel.findOne({email})
       if(user){
           bcrypt.compare(pass, user.pass, (err, result)=> {
            if(result){
                token = jwt.sign({authorID:user._id,author:user.name}, 'masai');
                console.log("sec");
                res.status(200).send({"msg":"Login Successfull","token":token})
            }else{
                res.status(200).send({"msg":"Wrong Credentials!!"})
               }
        });
        
       }else{
        res.status(200).send({"msg":"Wrong Credentials!!"})
       }
    } catch (err) {
        res.status(200).send({"err":err.message})
    }
    console.log("last");
})

module.exports={
    userRouter
}