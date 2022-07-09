const express=require('express');
const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
require('./config/db/db');
const {Employ,Department}  = require('./config/models/');

app.get('/list',async(req,res)=>{
    try{
        let employDetail= await Employ.find().populate({
            path: 'department_id',
            select: 'name',
            model: Department,
        });
        res.json({
            status:true,
            data:employDetail,
            msg:'All Employ Detail with deparment'
        });
    }catch(err){
        res.json({msg:'something went wrong !'})

    }
});

app.post('/add-employe',async (req,res)=>{
    try{
        let {first_name,last_name,email,department} =req.body;
    const user = await Employ.findOne({email}).countDocuments();
    if(user>0){
       return res.json({
            status:false,
            msg:'this email address is already exist'
        });
    }else{
        if (first_name && last_name && email && department) {
            let deparment  = await Department.find({name:department.toLowerCase()});
            if(deparment.length>0){
                let departmentId=deparment[0]._id;
                let employee=new Employ({
                    first_name,
                    last_name,
                    email,
                    department_id:departmentId
                });
                await employee.save();
                return res.json({
                    status:true,
                    employee:req.body,
                    msg:'Empoyee added successfully !'
                })
            }else{
                
                let departmentAdd=  new Department({
                    name:department.toLowerCase()
                });
                await departmentAdd.save((err,departments)=>{
                    if (err) { 
                        console.log(err)
                    }else{
                        let employee=new Employ({
                            first_name,
                            last_name,
                            email,
                            department_id:departments._id
                        });
                         employee.save();
                         return res.json({
                            status:true,
                            employee:req.body,
                            msg:'Empoyee added successfully !'
                        })
                    }

                })
            } 
        }else{
            return  res.json({
                status:false,
                msg:'All Fields are required !'
            });
        }
    }
    }catch(err){
        console.log(err);
        res.json({msg:'something went wrong !'})
    }
});

app.get('/department',async(req,res)=>{
    try{
        let department = await Department.find().lean();
        return res.json({
            status:true,
            department,
            message:"Department list for update employee  record"
        })
    }catch(err){
        res.json({msg:'something went wrong !'})
        console.log(err);
    }
})

app.post('/employ-update/:id',async(req,res)=>{
   try{
    const _id=req.params.id;
    let {first_name,last_name,email,department_id} = req.body;
    const datas=await Employ.findOne({_id});
    if(datas){
        if(first_name && last_name && email && department_id){
            datas.first_name=first_name;
            datas.last_name=last_name;
            datas.email=email;
            datas.department_id=department_id;
           let afterSave= await datas.save();
            res.json({
                status:true,
                employee:afterSave,
                message:"Employee is detail is updated"
            });
        }else{
            return  res.json({
                status:false,
                msg:'All Fields are required !'
            });
        }
    }else{
        res.json({
            status:false,
            msg:'Record not found'
        })
    }
   }catch(err){
    res.json({msg:'something went wrong !'})
    console.log(err);
   }
})

app.delete('/deleteEmployee/:id',async(req,res)=>{
    try{
        if(!req.params.id){
            return res.json({
                status:false,
                msg:'Please pass Id'
            });
        }else{
            const {id} =req.params;
            let data=await Employ.findByIdAndDelete({_id:id});
            res.json({
                status:true,
                data,
                msg:'Record Deleted Successfully !'
            });
        }
        
    }catch(err){
        console.log(err);
        res.json({msg:'something went wrong !'})
    }
})

app.listen(8000,()=>{
    console.log("server is running");
})