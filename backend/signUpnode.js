const express=require("express");
const bodyparser=require("body-parser");
const cors=require("cors");
const app=express();
app.use(express.json());
app.use(cors());
app.use(bodyparser.urlencoded({
    extended:true
}));
app.post("/newuser",function(req,res){
    let username=req.body.username
    let password=req.body.password
    let email=req.body.email
    const MongoClient =require("mongodb").MongoClient;
    const url="mongodb://127.0.0.1:27017/";
    MongoClient.connect(url)
    .then(
        function(db){
            var dbo=db.db("DEV-project")
            var query={username:username,email:email,password:password}
            dbo.collection("userdata").insertOne(query)
            .then(
                function(){
                    res.send("<h2>inserted success</h2>")
                }
            )
            .catch(function(error){
                console.log(error)
            })
        }
    )
    .catch(function(error){
        console.log(error)
    })
})
app.listen(5000,function(){
    console.log("running on port 5000")
})