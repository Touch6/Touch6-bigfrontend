var express = require('express');
var router = express.Router();
var ModelProxy = require('./../../proxy/DataProxy').DataProxy;
var authModel = ModelProxy.create("auth.*");

router.post('/', function (req, res) {

    console.log("添加权限信息：" + JSON.stringify(req.body.auth));
    authModel.addAuth(req.body.auth, {}).done(function (data) {
        res.send(data);
    }).error(function (error) {
        if(error.statusCode=='400'){
            console.log("添加权限失败,后端返回数据>>>" + error.responseText);
            res.status(error.statusCode).send(error.responseText);
        }
    });
});

router.put('/', function (req, res) {

    console.log("修改权限信息：" + JSON.stringify(req.body.auth));
    authModel.updateAuth(req.body.auth, {}).done(function (data) {
        res.send(data);
    }).error(function (error) {
        if(error.statusCode=='400'){
            console.log("修改权限失败,后端返回数据>>>" + error.responseText);
            res.status(error.statusCode).send(error.responseText);
        }
    });
});

router.get('/', function (req, res) {

    console.log("获取权限信息：" + req.query.authId);
    authModel.authInfo({authId:req.query.authId}).done(function (data) {
        res.send(data);
    }).error(function (error) {
        if(error.statusCode=='400'){
            console.log("获取权限失败,后端返回数据>>>" + error.responseText);
            res.status(error.statusCode).send(error.responseText);
        }
    });
});

router.get('/list', function (req, res) {

    authModel.authList().done(function (data) {
        res.send(data);
    }).error(function (error) {
        if(error.statusCode=='400'){
            console.log("获取权限失败,后端返回数据>>>" + error.responseText);
            res.status(error.statusCode).send(error.responseText);
        }
    });
});

router.delete('/', function (req, res) {

    console.log("删除权限信息：" + req.query.authId);
    authModel.deleteAuth({authId:req.query.authId}).done(function (data) {
        res.send(data);
    }).error(function (error) {
        if(error.statusCode=='400'){
            console.log("删除权限失败,后端返回数据>>>" + error.responseText);
            res.status(error.statusCode).send(error.responseText);
        }
    });
});


router.get('/page/auths', function (req, res) {

    authModel.pageAuths({page:req.query.page,pageSize:req.query.pageSize}).done(function (data) {
        res.send(data);
    }).error(function (error) {
        if(error.statusCode=='400'){
            console.log("获取权限失败,后端返回数据>>>" + error.responseText);
            res.status(error.statusCode).send(error.responseText);
        }
    });
});

module.exports = router;