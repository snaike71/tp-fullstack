const mongoose = require("mongoose")


const postSchema = mongoose.Schema(
    {
        titre : {
            type : String,
            required : true,
        },
        année: {
            type : Number,
            required : true,
        },
        note: {
            type : Number,
            required : true,
        }
    },
    {
        timestamps : true
    }
)


module.exports = mongoose.model("Movie",postSchema)