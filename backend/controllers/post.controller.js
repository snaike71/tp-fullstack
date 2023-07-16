
const PostModel = require("../models/post.model")



module.exports.deleteMovies = async (req,res)=>{
    const post = await PostModel.findById(req.params.id)

    if(!post){
        res.status(400).json({error : "ce film n'existe pas !"})
    }

    await post.deleteOne();
    res.status(200).json({result : "Film supprimé"})

    }

module.exports.changeMovies = async (req, res)=>{
    const post = await PostModel.findById(req.params.id)

    if(!post){
        res.status(400).json({error : "ce film n'existe pas !"})
    }

    const updatePost = await PostModel.findByIdAndUpdate(
        post,
        {
            titre : (req.body.titre).toLowerCase(),
            année  : req.body.année,
            note  : req.body.note,
        },
        {new : true}
    )

    res.status(200).json(updatePost)
}

module.exports.getMovies = async (req,res)=>{
    const getMovie =  await PostModel.find()
    res.status(200).json(getMovie)

}

module.exports.setMovies = async (req,res)=>{
    console.log(req.body)

    if(req.body.titre===""){
       return res.status(400).json({"type":"error","error" : "ajouter un titre !"})
       
    }
    if(req.body.année===null){
        return res.status(400).json({"type":"error","error" : "ajouter une date !"})
        
    }
    if(req.body.note===null){
        return res.status(400).json({"type":"error","error" : "ajouter une note !"})
       
    }
   
    if((await PostModel.find({titre : (req.body.titre).toLowerCase() })).length!==0){
        return res.status(400).json({"type":"error","error" : "ce film existe déjà !"})
    }

    const setMovie = await PostModel.create({
        titre : (req.body.titre).toLowerCase(),
        année  : req.body.année,
        note  : req.body.note
    })

    res.status(200).json(setMovie)
   
}




