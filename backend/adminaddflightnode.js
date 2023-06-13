const express=require("express");
const bodyparser=require("body-parser");
const cors=require("cors");
const app=express();
app.use(express.json());
app.use(cors());
app.use(bodyparser.urlencoded({
    extended:true
}));
app.post("/addflight",function(req,res){
    let airlinename=req.body.airlinename
    let source=req.body.source
    let destination=req.body.destination
    let date=req.body.date
    let time=req.body.time
    let flightnumber=req.body.flightnumber
    let datetime=date+"T"+time
    let spdate=new Date(datetime)
    const MongoClient =require("mongodb").MongoClient;
    const url="mongodb://127.0.0.1:27017/";
    MongoClient.connect(url)
    .then(
        function(db){
            var dbo=db.db("DEV-project")
            var query={airlinename:airlinename,date:spdate,source:source,destination:destination,setavailable:0,flightnumber:flightnumber}
            dbo.collection("flight").insertOne(query)
            .then(
                function(){
                    res.send("<h2>success inserted</h2>")
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