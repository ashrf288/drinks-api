const mongoose = require('mongoose');
require('dotenv').config()



 mongoose.connect(process.env.MONOGO_DB_LINK, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
 


    let DrunkSchema=mongoose.Schema({
        email:String,
        catagorie:String,
        image:String,
        name:String
    })



    let Drunk=mongoose.model('Drunk',DrunkSchema)


   let addUser=(req,res)=>{
      
      
        let email=req.params.email;
        Drunk.find({email:email}).then(result=>{
            if(result.length>0){res.send('user already regisered')}
            else{
                let drunk=new Drunk({
                    email:email,
                    catagorie:'',
                    image:'',
                    name:''
                })
                drunk.save()
                res.json('user regisered')
            }
        }).catch(err=>res.json(err))
      
    }
   


let addDrink=(req,res)=>{
    let email=req.params.email;
    let {catagorie,image,name}=req.body;

    let drunk=new Drunk({
        email:email,
        catagorie:catagorie,
        image:image,
        name:name
    })
    drunk.save()
    res.status(200).json({msg:'drink added',data:drunk})
}

let deleteDrink=(req,res)=>{
    let id=req.params.id
    Drunk.findByIdAndDelete(id).then(result=>{
        if(result){res.status(200).json('drink deleted seccsuffully')}
        else{res.status(404).json('drink with that id is not found')}
    }).catch(err=>res.json(err))
}

let updateDrink=(req,res)=>{
    let id=req.params.id
    Drunk.findByIdAndUpdate(id,{$set:req.body},{new:true}).then(result=>{
        if(result){res.status(200).json('drink updated seccsuffully')}
        else{res.status(404).json('drink with that id is not found')}
    }).catch(err=>res.json(err))
}

let getDrinks=(req,res)=>{
    let email=req.params.email;
    Drunk.find({email:email}).then(result=>{
        res.json(result)
    })
}


    module.exports={addUser,addDrink,deleteDrink,updateDrink,getDrinks};