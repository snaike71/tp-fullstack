const PostModel = require("../models/post.model")


module.exports.searchMovies = async (req,res)=>{
    var reg = new RegExp(`^${req.body.titre.toLowerCase()}`)
    const post = await PostModel.find({titre : reg})

    if(!post){
        res.status(400).json({error : "ce film n'existe pas"})
    }

    

    res.status(200).json(post)
    // return new Response(post)
}
