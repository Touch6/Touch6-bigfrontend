var express = require('express');
var router = express.Router();
var ModelProxy = require('./../../proxy/DataProxy').DataProxy;
var roleModel = ModelProxy.create("role.*");

router.post('/', function (req, res) {

    console.log("添加角色信息：" + JSON.stringify(req.body.role));
    roleModel.addRole(req.body.role, {}).done(function (data) {
        res.send(data);
    }).error(function (error) {
        if(error.statusCode=='400'){
            console.log("添加角色失败,后端返回数据>>>" + error.responseText);
            res.status(error.statusCode).send(error.responseText);
        }
    });
});

router.put('/', function (req, res) {

    console.log("修改角色信息：" + JSON.stringify(req.body.role));
    roleModel.updateRole(req.body.role, {}).done(function (data) {
        res.send(data);
    }).error(function (error) {
        if(error.statusCode=='400'){
            console.log("修改角色失败,后端返回数据>>>" + error.responseText);
            res.status(error.statusCode).send(error.responseText);
        }
    });
});

router.get('/', function (req, res) {

    console.log("获取角色信息：" + req.query.roleId);
    roleModel.roleInfo({roleId:req.query.roleId}).done(function (data) {
        res.send(data);
    }).error(function (error) {
        if(error.statusCode=='400'){
            console.log("获取角色失败,后端返回数据>>>" + error.responseText);
            res.status(error.statusCode).send(error.responseText);
        }
    });
});

router.get('/list', function (req, res) {

    roleModel.roleList().done(function (data) {
        res.send(data);
    }).error(function (error) {
        if(error.statusCode=='400'){
            console.log("获取角色失败,后端返回数据>>>" + error.responseText);
            res.status(error.statusCode).send(error.responseText);
        }
    });
});

router.delete('/', function (req, res) {

    console.log("删除角色信息：" + req.query.roleId);
    roleModel.deleteRole({roleId:req.query.roleId}).done(function (data) {
        res.send(data);
    }).error(function (  error) {
        if(error.statusCode=='400'){
            console.log("删除角色失败,后端返回数据>>>" + error.responseText);
            res.status(error.statusCode).send(error.responseText);
        }
    });
});


router.get('/page/roles', function (req, res) {

    roleModel.pageRoles({page:req.query.page,pageSize:req.query.pageSize}).done(function (data) {
        res.send(data);
    }).error(function (error) {
        if(error.statusCode=='400'){
            console.log("获取角色失败,后端返回数据>>>" + error.responseText);
            res.status(error.statusCode).send(error.responseText);
        }
    });
});

router.get('/lock', function (req, res) {

    roleModel.lock({roleId:req.query.roleId}).done(function (data) {
        res.send(data);
    }).error(function (error) {
        if(error.statusCode=='400'){
            console.log("锁定角色失败,后端返回数据>>>" + error.responseText);
            res.status(error.statusCode).send(error.responseText);
        }
    });
});
router.get('/unlock', function (req, res) {

    roleModel.unlock({roleId:req.query.roleId}).done(function (data) {
        res.send(data);
    }).error(function (error) {
        if(error.statusCode=='400'){
            console.log("解锁角色失败,后端返回数据>>>" + error.responseText);
            res.status(error.statusCode).send(error.responseText);
        }
    });
});
module.exports = router;