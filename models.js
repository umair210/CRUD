var mongoose=require('mongoose');
var db=mongoose.connection;
var mongoseschema = mongoose.Schema({
    name:{
        type:String,
required:false
    },
    age:{
        type:Number,
        required:false
    },
email:{
  type:String,
  required:false
},

create_date:{
        type:Date,
default:Date.now()
}
});
var Users=module.exports=mongoose.model('Login',mongoseschema);

// module.exports.logindata =function (callback) {
//     console.log("in login Data")
//     console.log(callback)
//     Login.find(callback);
// };