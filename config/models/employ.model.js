const mongoose=require('mongoose');
Schema = mongoose.Schema;
Department = mongoose.model('Department');

const employeeSchema=new Schema({
    first_name:{
        type:String,
        required:true,
        trim:true
    },
    last_name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    department_id:{
        type: Schema.Types.ObjectId,
        ref: 'Department'
    }

  
});

module.exports=new mongoose.model('Employ',employeeSchema);