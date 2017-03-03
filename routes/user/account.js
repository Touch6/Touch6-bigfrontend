var express = require('express');
var router = express.Router();
var ModelProxy, AccountModel;
ModelProxy = require('./../../proxy/DataProxy').DataProxy;
AccountModel = ModelProxy.create("user.*");

router.get('/',function(req,res){
    console.log("req.query.userId="+req.query.userId);
    AccountModel.getInfo({userId:req.query.userId}).done(function(data){
        console.log(data);
        res.send(data);
    }).error(function(error){
        console.log(error);
        res.send(error);
    });
});
/*********验证用户的旧邮箱**************/
router.put('/checkOldEmail',function(req,res){
    var oldEmail=req.body.oldEmail;
    var userId=req.body.userId;
    console.log("node端拿到的oldEmail和userId为："+oldEmail+"---"+userId);
    AccountModel.checkOldEmail({userId:userId,oldEmail:oldEmail}).done(function(data){
        console.log(JSON.stringify(data));
        res.send(true);
    }).fail(function(error){
        console.log(error);
        res.send(false);
    });
});
/***********修改用户注册的邮箱并返回token******************/
router.put('/changeRegistEmail',function(req,res){
    var userId=req.body.userId;
    var newEmail=req.body.newEmail;
    console.log("node:---"+userId+"------"+newEmail);
    AccountModel.registerNewEmail({userId:userId,newEmail:newEmail}).done(function(data){
        console.log(JSON.stringify(data));
        res.send(data);
    }).error(function(error){
       res.send(error);
    });
})


module.exports = router;