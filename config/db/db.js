const db=require('mongoose')
let dbs='mongodb+srv://amarprajapati571:9694555572@sandbox.fmadl7z.mongodb.net/?retryWrites=true&w=majority'

db.connect(dbs).then(()=>{
    console.log("db is connected");
}).catch((e)=>{
    console.log(e);
})