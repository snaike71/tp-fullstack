const express = require("express")
const { searchMovies } = require("../controllers/search.controller");

const router = express.Router()


router.post("/",searchMovies)



module.exports = router