const express=require("express");
const bodyparser=require("body-parser");
const cors=require("cors");
const app=express();
app.use(express.json());
app.use(cors());
app.use(bodyparser.urlencoded({
    extended:true
}));
app.post("/getuser",function(req,res){
    let username=req.body.username
    let password=req.body.password
    const MongoClient =require("mongodb").MongoClient;
    const url="mongodb://127.0.0.1:27017/";
    MongoClient.connect(url)
    .then(
        function(db){
            var dbo=db.db("DEV-project")
            var query={username:username,password:password}
            dbo.collection("userdata").findOne(query)
            .then(
                function(result){
                    res.send("<h2>"+result.email+"</h2>")
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

app.post("/getadmin",function(req,res){
    let username=req.body.username
    let password=req.body.password
    const MongoClient =require("mongodb").MongoClient;
    const url="mongodb://127.0.0.1:27017/";
    MongoClient.connect(url)
    .then(
        function(db){
            var dbo=db.db("DEV-project")
            var query={username:username,password:password}
            dbo.collection("admindata").findOne(query)
            .then(
                function(result){
                    res.send("<h2>name:"+result.username+" password: "+result.password+"</h2>")
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

app.post("/addflight",function(req,res){
    let airlinename=req.body.airlinename
    let source=req.body.source
    let destination=req.body.destination
    let date=req.body.date
    let time=req.body.time
    let flightnumber=req.body.flightnumber
    let datetime=date+"T"+time+"Z"
    let spdate=new Date(datetime)
    const MongoClient =require("mongodb").MongoClient;
    const url="mongodb://127.0.0.1:27017/";
    console.log(spdate+"   "+date+"T"+time)
    MongoClient.connect(url)
    .then(
        function(db){
            var dbo=db.db("DEV-project")
            var query={airlinename:airlinename,date:spdate,source:source,destination:destination,setavailable:60,flightnumber:flightnumber}
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

app.post("/deleteflight",function(req,res){
    let airlinename=req.body.airlinename
    let source=req.body.source
    let destination=req.body.destination
    let date=req.body.date
    let time=req.body.time
    let flightnumber=req.body.flightnumber
    let datetime=date+"T"+time+"Z"
    let spdate=new Date(datetime)
    const MongoClient =require("mongodb").MongoClient;
    const url="mongodb://127.0.0.1:27017/";
    MongoClient.connect(url)
    .then(
        function(db){
            var dbo=db.db("DEV-project")
            var query={airlinename:airlinename,date:spdate,source:source,destination:destination,flightnumber:flightnumber}
            dbo.collection("flight").deleteOne(query)
            .then(
                function(){
                    res.send("<h2>deleted successfully</h2>")
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

app.post("/usersearchflight",function(req,res){
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
            var query={date:{$eq:new Date(datetime)}}
            dbo.collection("flight").find(query).toArray()
            .then(
                function(result){
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

app.post("/Bookflig",function(req,res){
    let name=req.body.name
    let age=req.body.age
    let airlinename=req.body.airlinename
    let source=req.body.source
    let destination=req.body.destination
    let date=req.body.date
    let flightnumber=req.body.flightnumber
    let usreid=req.body.usreid
    const MongoClient =require("mongodb").MongoClient;
    const url="mongodb://127.0.0.1:27017/";
    MongoClient.connect(url)
    .then(
        function(db){
            var dbo=db.db("DEV-project")
            var query={flightnumber:flightnumber,date:{$eq:new Date(date)}}
            dbo.collection("flight").find(query).toArray()
            .then(function(result) {
                // res.send('<h1>done</h1>')
                console.log("HELLO12")
                if (result.length > 0) {
                    var r = result[0];
                    if (r.setavailable <= 60) {
                        // res.send('<h1>done</h1>')
                        dbo.collection("flight").updateOne({ flightnumber: flightnumber },{  $inc: { setavailable: -1 } } )
                            .then(
                                function(){
                                    var q={usreid:usreid,name:name,Age:age,airlinename:airlinename,date:new Date(date),source:source,destination:destination,flightnumber:flightnumber}
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


app.post("/usersearchflight",function(req,res){
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
            var query={date:{$eq:new Date(datetime)}}
            dbo.collection("flight").find(query).toArray()
            .then(
                function(result){
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

app.post("/mybooking",function(req,res){
    let name=req.body.username
    const MongoClient =require("mongodb").MongoClient;
    const url="mongodb://127.0.0.1:27017/";
    
    console.log("hi1")
    MongoClient.connect(url)
    .then(
        function(db){
            var dbo=db.db("DEV-project")
            dbo.collection("pasenger").find({usreid:name}).toArray()
            .then(
                function(result){
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


app.post("/allsflight",function(req,res){
    const MongoClient =require("mongodb").MongoClient;
    const url="mongodb://127.0.0.1:27017/";
    MongoClient.connect(url)
    .then(
        function(db){
            var dbo=db.db("DEV-project")
            dbo.collection("flight").find().toArray()
            .then(
                function(result){
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