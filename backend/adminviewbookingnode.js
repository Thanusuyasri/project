const express=require("express");
const bodyparser=require("body-parser");
const cors=require("cors");
const app=express();
app.use(express.json());
app.use(cors());
app.use(bodyparser.urlencoded({
    extended:true
}));
app.post("/viewbooking",function(req,res){
    let flightnumber=req.body.flightnumber
    let date=req.body.date
    let time=req.body.time
    let datetime=date+"T"+time+"Z"
    let spdate=new Date(datetime)
    const MongoClient =require("mongodb").MongoClient;
    const url="mongodb://127.0.0.1:27017/";
    MongoClient.connect(url)
    .then(
        function(db){
            var dbo=db.db("DEV-project")
            var query={flightnumber:flightnumber,date:{$eq:new Date(datetime)}}
            dbo.collection("pasenger").find(query).toArray()
            .then(
                function(result){
                    // let tableHTML = '<table border=1>';
                    // tableHTML += '<tr><th>Flight Number</th><th>Airline Name</th><th>Source</th><th>destination</th><th>Available Seat</th></tr>';
                    // result.forEach((item) => {
                    //     let av=60-item.setavailable
                    //     tableHTML += `<tr><td><td>${item.name}</td><td>${item.Age}</td></tr>`;
                    // });
                    // tableHTML += '</table>';
                    //res.send("<h4>"+tableHTML+"</h4>")
                    res.send(result)
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