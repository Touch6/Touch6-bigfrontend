var express = require('express');
var router = express.Router();
var ModelProxy, userModel;
ModelProxy = require('./../../proxy/DataProxy').DataProxy;
userModel = ModelProxy.create("user.*");


/*****************登录验证**********************/
router.post("/",function(req,res){
    //真正请求后台接口的路由
    req.session={};
    console.log("登陆名" + JSON.stringify(req.body.user)+"/"+req.body.user.loginName+"/"+req.body.user.password);
    userModel.login(req.body.user,{}).done(function(user){
        console.log("登录成功,后端返回数据>>>"+JSON.stringify(user));
        // data.plainPassword=req.body.user.password;
        res.cookie["user"]=user;
        req.session.user = user;
        res.send(user);
  }).fail(function(error){
        if(error.statusCode=='400'){
            console.log("登录失败,后端返回数据>>>" + error.responseText);
            res.status(error.statusCode).send(error.responseText);
        }
    });
});
/*****************忘记密码邮箱验证**********************/
router.post("/verifyEmail",function(req,res){
    var nameOrEmail=req.body.nameOrEmail;
    console.log("需验证的邮箱为："+nameOrEmail);
    userModel.checkEmail({nameOrEmail:nameOrEmail}).done(function(data){
       console.log("忘记密码返回的token:"+JSON.stringify(data));
       console.log("data.token:"+data.token);
       res.send(data);
    }).fail(function(error){
        console.log("error:"+error);
        res.send(false);
    });
});
/*********************重置密码********************************/
router.put("/resetPwd",function(req,res){
   console.log("node拿到的新密码为："+req.body.newPassword+"-----emailToken为："+req.body.emailToken);
    userModel.resetPassowrd({newPassword:req.body.newPassword,emailToken:req.body.emailToken}).done(function(data){
        console.log("重置密码结果"+JSON.stringify(data));
        res.send(true);
    }).fail(function(err){
        console.log("错误:"+err);
        res.send(false);
    });
});
/************************修改密码***************************************/
router.put("/changePwd",function(req,res){
    var userId=req.body.userId;
    var oldPassword=req.body.oldPwd;
    var newPassowrd=req.body.newPwd;
    console.log("userId="+userId+"oldPassword="+oldPassword+"newPassowrd="+newPassowrd);
    userModel.changePassowrd({userId:userId,oldPassword:oldPassword,newPassword:newPassowrd}).done(function(data){
       console.log("data:"+JSON.stringify(data));
       res.send(true);
    }).fail(function(error){
        console.log(error);
        res.send(false);
    })

});
/****************************验证是否存在某个用户****************************/
router.get("/hasUser",function(req,res){
    var receiver=req.query.receiver;
    console.log("receiver:"+receiver);
    userModel.hasUser({receiver:receiver}).done(function(data){
        console.log(data);
        res.send(data);
    }).fail(function(err){
        console.log(err);
        res.send(err);
    });
});

module.exports = router;