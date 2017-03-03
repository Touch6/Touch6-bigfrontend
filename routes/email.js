/**
 *Created by gxw on 2015/3/5 0005.
 *@author gxw
 *@version v1.0
 *@description 发送邮件
 */
var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var ModelProxy, userModel;
ModelProxy = require('./../proxy/DataProxy').DataProxy;
userModel = ModelProxy.create("user.*");
var transporter = nodemailer.createTransport({
    /*    host: "smtp.qq.com", // 主机
     secureConnection: true, // 使用 SSL
     port: 465, // SMTP 端口*/
    service: 'qq',
    auth: {
        user: '1250052380@qq.com',
        pass: '@you$gai2#dashu&'
    }
});
var sender='<294067209@qq.com>';


router.post('/',function(req,res){
    console.log("激活码"+JSON.stringify(req.body.activeEmailCode));
    var activeCode=req.body.activeEmailCode;
    var url='http://localhost:3000/#/activeAccount?activeCode='+activeCode;
    var email=req.body.email;
    console.log(url+"----"+email);

    var mailOptions = {
        from:sender, // sender address
        to: email, // list of receivers
//    cc:"1064527845@qq.com",//抄送；
//        bcc:"",//密送；
        subject: '长虹开放平台', //主题
        text: '', // plaintext body
        html: '感谢你已成功注册长虹开放平台，请点击下面链接激活账号:'
            +'<a href="'+url+'">'+ url+'</a>'  // html body,使图片能够显示，只需要img的src属性为对应的cid即可；
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            res.send(false);
        } else {
            console.log('Message sent: ' + info.response);
            res.send(true);
        }
    });
});
//发送邮箱修改成功需激活邮件；
router.post('/reSendEmail',function(req,res){
    console.log("激活码"+JSON.stringify(req.body.activeEmailCode));
    var activeCode=req.body.activeEmailCode;
    var url='http://localhost:3000/#/activeEmail?activeCode='+activeCode;
    var email=req.body.email;
    console.log(url+"----"+email);

    var mailOptions = {
        from:sender, // sender address
        to: email, // list of receivers
        subject: '长虹开放平台', //主题
        text: '', // plaintext body
        html: '感谢你已注册长虹开放平台，请点击下面链接激活账号:'
            +'<a href="'+url+'">'+ url+'</a>'  // html body,使图片能够显示，只需要img的src属性为对应的cid即可；
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            res.send(false);
        } else {
            console.log('Message sent: ' + info.response);
            res.send(true);
        }
    });
});
/************激活邮箱******************/
router.post('/active',function(req,res){
    var activeCode=req.body.activeCode;
    console.log('activeCode:'+activeCode);
    userModel.active({activeCode:activeCode}).done(function(){
        res.send(true);
    }).error(function(error){
        res.send(error);
    });
});
/**************发送重置密码邮件***************************/
router.post('/sendFindPwdEmail',function(req,res){
    var email=req.body.email;
    var emailToken=req.body.emailToken;
    var url="http://localhost:3000/#/resetPwd?emailToken="+emailToken;
    console.log("email="+email+"emailToken="+emailToken);
    var mailOptions = {
        from:sender, // sender address
        to: email, // list of receivers
        subject: '长虹开放平台', //主题
        text: '', // plaintext body
        html: '请点击下面链接重置密码:'
            +'<a href="'+url+'">'+ url+'</a>'  // html body,使图片能够显示，只需要img的src属性为对应的cid即可；
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.send(false);
        } else {
            console.log('Message sent: ' + info.response);
            res.send(true);
        }
    });
});
/**************发送转让应用成功邮件***************************/
router.post("/sendTransEmail",function(req,res){
    var receiveEmail=req.body.receiveEmail;
    var senderName=req.body.sender;
    console.log("receiveEmail="+receiveEmail);
    var mailOptions = {
        from:sender, // sender address
        to: receiveEmail, // list of receivers
        subject: '长虹开放平台', //主题
        text: '', // plaintext body
        html: "您好，开发者："+senderName+"已向您转让了一个应用，请您登录开放平台进行查看！"+
            '<a href="http://localhost:3000/#/index">点击进入开放平台</a>'
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.send(false);
        } else {
            console.log('Message sent: ' + info.response);
            res.send(true);
        }
    });
})




module.exports = router;


