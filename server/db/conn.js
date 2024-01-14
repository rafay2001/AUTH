const mongoose = require("mongoose");

const DB="mongodb+srv://abrafay2001work:7bs5zB531s63JSne@cluster0.e26uygs.mongodb.net/Authusers?retryWrites=true&w=majority"

mongoose.connect(DB,{
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(()=> console.log("DataBase Connected")).catch((errr)=>{
    console.log(errr);
})