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
module.exports = router;