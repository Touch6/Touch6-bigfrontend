var express = require('express');
var router = express.Router();
var ModelProxy = require('./../../proxy/DataProxy').DataProxy;
var moduleModel = ModelProxy.create("module.*");

router.post('/', function (req, res) {

    console.log("添加模块信息：" + JSON.stringify(req.body.module));
    moduleModel.addModule(req.body.module, {}).done(function (data) {
        res.send(data);
    }).error(function (error) {
        if(error.statusCode=='400'){
            console.log("添加模块失败,后端返回数据>>>" + error.responseText);
            res.status(error.statusCode).send(error.responseText);
        }
    });
});

router.put('/', function (req, res) {

    console.log("修改模块信息：" + JSON.stringify(req.body.module));
    moduleModel.updateModule(req.body.module, {}).done(function (data) {
        res.send(data);
    }).error(function (error) {
        if(error.statusCode=='400'){
            console.log("修改模块失败,后端返回数据>>>" + error.responseText);
            res.status(error.statusCode).send(error.responseText);
        }
    });
});

router.get('/', function (req, res) {

    console.log("获取模块信息：" + req.query.moduleId);
    moduleModel.moduleInfo({moduleId:req.query.moduleId}).done(function (data) {
        res.send(data);
    }).error(function (error) {
        if(error.statusCode=='400'){
            console.log("获取模块失败,后端返回数据>>>" + error.responseText);
            res.status(error.statusCode).send(error.responseText);
        }
    });
});

router.get('/list', function (req, res) {

    moduleModel.moduleList().done(function (data) {
        res.send(data);
    }).error(function (error) {
        if(error.statusCode=='400'){
            console.log("获取模块失败,后端返回数据>>>" + error.responseText);
            res.status(error.statusCode).send(error.responseText);
        }
    });
});

router.get('/common', function (req, res) {

    console.log("node端加载公共模块")
    moduleModel.commonModules({roleId:10000}).done(function (data) {
        console.log("加载的公共模块:"+JSON.stringify(data));
        res.send(data);
    }).error(function (error) {
        if(error.statusCode=='400'){
            console.log("获取公共模块失败,后端返回数据>>>" + error.responseText);
            res.status(error.statusCode).send(error.responseText);
        }
    });
});

router.get('/loginuser', function (req, res) {

    moduleModel.loginuserModules({token:req.query.token}).done(function (data) {
        res.send(data);
    }).error(function (error) {
        if(error.statusCode=='400'){
            console.log("获取登录用户模块失败,后端返回数据>>>" + error.responseText);
            res.status(error.statusCode).send(error.responseText);
        }
    });
});

router.delete('/', function (req, res) {

    console.log("删除模块信息：" + req.query.moduleId);
    moduleModel.deleteModule({moduleId:req.query.moduleId}).done(function (data) {
        res.send(data);
    }).error(function (error) {
        if(error.statusCode=='400'){
            console.log("删除模块失败,后端返回数据>>>" + error.responseText);
            res.status(error.statusCode).send(error.responseText);
        }
    });
});


router.get('/page/modules', function (req, res) {

    moduleModel.pageModules({page:req.query.page,pageSize:req.query.pageSize}).done(function (data) {
        res.send(data);
    }).error(function (error) {
        if(error.statusCode=='400'){
            console.log("获取模块失败,后端返回数据>>>" + error.responseText);
            res.status(error.statusCode).send(error.responseText);
        }
    });
});

router.get('/page/modules', function (req, res) {

    moduleModel.pageModules({page:req.query.page,pageSize:req.query.pageSize}).done(function (data) {
        res.send(data);
    }).error(function (error) {
        if(error.statusCode=='400'){
            console.log("获取模块失败,后端返回数据>>>" + error.responseText);
            res.status(error.statusCode).send(error.responseText);
        }
    });
});
module.exports = router;