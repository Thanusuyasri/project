const express=require("express");
const bodyparser=require("body-parser");
const cors=require("cors");
const app=express();
app.use(express.json());
app.use(cors());
app.use(bodyparser.urlencoded({
    extended:true
}));
app.post("/Bookflig",function(req,res){
    let name=req.body.name
    let age=req.body.age
    let airlinename=req.body.airlinename
    let source=req.body.source
    let destination=req.body.destination
    let date=req.body.date
    let time=req.body.time
    let flightnumber=req.body.flightnumber
    let datetime=date+"T"+time+'Z'
    let spdate=new Date(datetime)
    const MongoClient =require("mongodb").MongoClient;
    const url="mongodb://127.0.0.1:27017/";
    MongoClient.connect(url)
    .then(
        function(db){
            var dbo=db.db("DEV-project")
            var query={flightnumber:flightnumber,date:{$eq:new Date(datetime)}}
            dbo.collection("flight").find(query).toArray()
            .then(function(result) {
                // res.send('<h1>done</h1>')
                if (result.length > 0) {
                    var r = result[0];
                    if (r.setavailable <= 60) {
                        // res.send('<h1>done</h1>')
                        dbo.collection("flight").updateOne({ flightnumber: flightnumber },{ $inc: { setavailable: Number(1) } } )
                            .then(
                                function(){
                                    var q={name:name,Age:age,airlinename:airlinename,date:spdate,source:source,destination:destination,setavailable:0,flightnumber:flightnumber}
                                    dbo.collection("pasenger").insertOne(q)
                                    .then(
                                        function(){
                                            res.send("<h2>booked successfuly</h2>")
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
        // Continue with your code
    }
    else{
        res.send('<h1>All seats are full</h1>')
    }
    }
  })
            .catch(function(error){
                console.log(error)
            })
        }
    )
    .catch(function(error){
        console.log(error)
    })
})
app.listen(5001,function(){
    console.log("running on port 5001")
})