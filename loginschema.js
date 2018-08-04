var mongoose=require('mongoose');
var db=mongoose.connection;
var bcrypt=require('bcrypt-nodejs');
var loginschema=mongoose.Schema(
    {
        name: {
            type: String,
            required: false
        },
        firstname: {
            type: String,
            required: false
        },
        secondname: {
            type: String,
            required: false
        },
        email: {
            type: String,
            required: false
        },
        password:
            {
                type: String,
                required: false
            },
        confirmpassword:
            {
                type: String,
                required: false
            }
    });
loginschema.pre('save',function (next) {
    var user=this;
    bcrypt.hash(user.password,null,null,function (err,hash) {
        if (err) return next (err);
user.password=hash;
   return next();
    });
});
loginschema.pre('save',function (next) {
   var user=this;
    bcrypt.hash(user.confirmpassword,null,null, function (err,hash) {
        if (err) {
            return next(err);
        }
        user.confirmpassword=hash;
        next();
    })
    });
loginschema.methods.comparePassword=function(password){
    var user=this;
    return bcrypt.compareSync(password,this.password);
};
var Logins=module.exports=mongoose.model('Logins',loginschema); //'Loginss' will use in db as collections in the specific db which we enter in the URL in connection