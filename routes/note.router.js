const router=require("express")
const { NoteModel } = require("../model/note.module")

const noteRouter=router()

noteRouter.get("/",async(req,res)=>{
    try{
        const notes=await NoteModel.find()
        res.send(notes)
    }
    catch(err){
        
        res.send({"msg":"wrong credentials" , "err":err.message })
    }
})

noteRouter.post("/create",async(req,res)=>{
    const payload=req.body
    try{
        const note=new NoteModel(payload)
        await note.save()
        res.send({"msg":"added successfully"})
    }
    catch(err){
        res.send({"msg":"wrong credentials" , "err":err.message })
    }

})

noteRouter.patch("/update/:id",async(re,res)=>{
    const noteID=req.params.id
    const data=req.body
    try{
        const post =await NoteModel.findOne({_id:noteID})
        const userID=post.userID
        const userMakingID=req.body.userID
        if(userID===userMakingID){
            await NoteModel.findByIdAndUpdatend({_id:noteID,data})
            res.send(`note with id updated ${noteID} successfully`)
        }else{
            res.send({"msg":"you are not authorised" })
        }
       
    }
    catch(err){
        res.send({"msg":"wrong credentials" , "err":err.message })
    }
})

noteRouter.delete("/delete/:id",async(re,res)=>{
    const noteID=req.params.id
    try{
        const post =await NoteModel.findOne({_id:noteID})
        const userID=post.userID
        const userMakingID=req.body.userID
        if(userID===userMakingID){
            await NoteModel.findByIdAndDelete({_id:noteID})
            res.send(`note with id updated ${noteID} successfully`)
        }else{
            res.send({"msg":"you are not authorised" })
        }
       
    }
    catch(err){
        res.send({"msg":"wrong credentials" , "err":err.message })
    }
    
})



module.exports={
    noteRouter
}