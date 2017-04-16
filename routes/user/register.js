var express = require('express');
var router = express.Router();
var ModelProxy, userModel;
ModelProxy = require('./../../proxy/DataProxy').DataProxy;
userModel = ModelProxy.create("user.*");

router.post('/', function (req, res) {

    console.log("register中user为：" + req.body.user.phone + "/" + req.body.user.password + "/" + req.body.user.code);
    console.log("拿到的注册user" + JSON.stringify(req.body.user));
    userModel.register({
        phone: req.body.user.phone,
        password: req.body.user.password,
        confirmPassword: req.body.user.confirmPassword,
        code: req.body.user.code
    }, {}).done(function (data) {
        console.log("调用后台注册接口成功返回信息>>>" + data);
        res.send(data);
    }).error(function (data) {
        if(error.statusCode=='400'){
            console.log("注册失败,后端返回数据>>>" + error.responseText);
            res.status(error.statusCode).send(error.responseText);
        }
    });
});


module.exports = router;