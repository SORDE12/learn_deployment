require("dotenv").config()

const mongoose=require("mongoose")

const url=process.env.mongoURL

const connection=mongoose.connect(url)

module.exports={
    connection
}