import express from "express"

const app = express()
const port = 4000 || process.env.PORT


app.get('/',(req,res)=>{
    console.log("hello")
    res.send("welcome to freelancia")
})

app.listen(port,()=>{
    console.log(`server connected successfully at http://localhost:${port}}`)
})