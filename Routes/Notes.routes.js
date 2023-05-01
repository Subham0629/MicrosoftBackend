const express=require("express");
const { NoteModel } = require("../Models/Note.model");

const noteRouter=express.Router()

noteRouter.post("/create",async(req,res)=>{
    try {
        const note =new NoteModel(req.body);
        await note.save();
        res.status(200).send({"msg":"New note has been added"})
        
    } catch (err) {
        res.status(400).send({"err":err.message})
    }
})

noteRouter.get("/",async(req,res)=>{
    try {
        const notes=await NoteModel.find({authorID:req.body.authorID})
        res.status(200).send(notes)
    } catch (err) {
        res.status(400).send({"err":err.message})
    }
})

noteRouter.patch("/update/:noteID",async(req,res)=>{
    const {noteID}=req.params;
    const note= await NoteModel.findOne({_id:noteID})
    try {
        if(req.body.noteID!==note.authorID){
            res.status(200).send({"msg":`You are not authoried for this action`})

        }else{
            await NoteModel.findByIdAndUpdate({_id:noteID},req.body)
            res.status(200).send({"msg":`The note with id:${noteID} has been updated`})

        }
    } catch (err) {
        res.status(400).send({"err":err.message})
    }
})

noteRouter.post("/delete/:noteID",async(req,res)=>{
    const {noteID}=req.params;
    const note= await NoteModel.findOne({_id:noteID})
    try {
        if(req.body.noteID!==note.authorID){
            res.status(200).send({"msg":`You are not authoried for this action`})

        }else{
            await NoteModel.findByIdAndUpdate({_id:noteID})
            res.status(200).send({"msg":`The note with id:${noteID} has been deleted`})

        }
    } catch (err) {
        res.status(400).send({"err":err.message})
    }
})

module.exports={noteRouter}