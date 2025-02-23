const express=require("express");

const users=[{
    name:"Baku",
    Kidneys:[{
        ishealthy:true
    }]
}];
const app=express();

//for using req.body
app.use(express.json());

app.get("/",function(req,res){
    const BakuKidneys=users[0].Kidneys;
    const NoOfKidneys=BakuKidneys.length;
    let NoOfhealthyKidneys=0;
    for(let i=0;i<NoOfKidneys;i++){
        if(BakuKidneys[i].ishealthy){
            NoOfhealthyKidneys++;
        }
    }
    const NoOfunhealthyKidneys=NoOfKidneys-NoOfhealthyKidneys;
    res.json({
        NoOfKidneys,
        NoOfhealthyKidneys,
        NoOfunhealthyKidneys
    })
})
app.post("/",function(req,res){
    const healthy=req.body.healthy;
    users[0].Kidneys.push(
        {
            ishealthy:healthy
        }
    )
    res.json({
        msg:"Done!"
    })
})

app.put("/",function(req,res){
    for(let i=0;i<users[0].Kidneys.length;i++){
        users[i].Kidneys.ishealthy=true;
    }
    res.json({
        msg:"done!"
    });
})
app.delete("/",function(req,res){
    const newKidneys=[];
    for(let i=0;i<users[0].Kidneys.length;i++){
        if(users[0].Kidneys[i].ishealthy){
            newKidneys.push({
                ishealthy:true
            })
        }
    }
    users[0].Kidneys=newKidneys;
    res.json({msg:"done"})
})

app.listen(3000);