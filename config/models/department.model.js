const mongoose=require('mongoose');
Schema = mongoose.Schema;

const departmentSchema=new Schema({
    name:{
        type:String,
        required:true,
        trim:true
    }
    
  
});

module.exports=new mongoose.model('Department',departmentSchema);
