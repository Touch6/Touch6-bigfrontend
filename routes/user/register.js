var express = require('express');
var router = express.Router();
var ModelProxy, userModel;
ModelProxy = require('./../../proxy/DataProxy').DataProxy;
userModel = ModelProxy.create("user.*");

router.post('/',function(req,res){

  console.log("register中user为："+req.body.user.loginName+"/"+req.body.user.plainPassword+"/"+req.body.user.email);
    console.log("拿到的注册user"+JSON.stringify(req.body.user));
    userModel.register({loginName:req.body.user.loginName,plainPassword:req.body.user.plainPassword,email:req.body.user.email},{}).done(function(data){
        console.log(data);
        res.send(data);
    }).error(function(data){
        console.log(data);
    });
});




module.exports = router;