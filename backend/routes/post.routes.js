const express = require("express")
const { setMovies, getMovies,changeMovies,deleteMovies} = require("../controllers/post.controller");

const router = express.Router()

  

router.get("/",getMovies)

router.post("/",setMovies)

router.put("/:id",changeMovies)

router.delete("/:id",deleteMovies)


module.exports = router
