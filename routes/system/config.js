var express = require('express');
var router = express.Router();
var ModelProxy = require('./../../proxy/DataProxy').DataProxy;
var configModel = ModelProxy.create("config.*");

router.post('/authrole', function (req, res) {

    console.log("添加角色权限配置：" + JSON.stringify(req.body.authrole));
    configModel.addAuthRole(req.body.authrole, {}).done(function (data) {
        res.send(data);
    }).error(function (error) {
        if(error.statusCode=='400'){
            console.log("添加角色权限配置失败,后端返回数据>>>" + error.responseText);
            res.status(error.statusCode).send(error.responseText);
        }
    });
});

router.put('/authrole', function (req, res) {

    console.log("修改角色权限配置信息：" + JSON.stringify(req.body.authrole));
    configModel.updateAuthRole(req.body.authrole, {}).done(function (data) {
        res.send(data);
    }).error(function (error) {
        if(error.statusCode=='400'){
            console.log("修改角色权限配置失败,后端返回数据>>>" + error.responseText);
            res.status(error.statusCode).send(error.responseText);
        }
    });
});

router.delete('/authrole', function (req, res) {

    console.log("删除角色权限配置信息：" + req.body.authrole);
    configModel.deleteAuthRole(req.body.authrole,{}).done(function (data) {
        res.send(data);
    }).error(function (error) {
        if(error.statusCode=='400'){
            console.log("删除角色权限配置失败,后端返回数据>>>" + error.responseText);
            res.status(error.statusCode).send(error.responseText);
        }
    });
});


router.post('/authmenu', function (req, res) {

    console.log("添加菜单权限配置：" + JSON.stringify(req.body.authmenu));
    configModel.addAuthMenu(req.body.authmenu, {}).done(function (data) {
        res.send(data);
    }).error(function (error) {
        if(error.statusCode=='400'){
            console.log("添加菜单权限配置失败,后端返回数据>>>" + error.responseText);
            res.status(error.statusCode).send(error.responseText);
        }
    });
});

router.put('/authmenu', function (req, res) {

    console.log("修改菜单权限配置信息：" + JSON.stringify(req.body.authmenu));
    configModel.updateAuthMenu(req.body.authmenu, {}).done(function (data) {
        res.send(data);
    }).error(function (error) {
        if(error.statusCode=='400'){
            console.log("修改菜单权限配置失败,后端返回数据>>>" + error.responseText);
            res.status(error.statusCode).send(error.responseText);
        }
    });
});

router.delete('/authmenu', function (req, res) {

    console.log("删除菜单权限配置信息：" + req.body.authmenu);
    configModel.deleteAuthMenu(req.body.authmenu,{}).done(function (data) {
        res.send(data);
    }).error(function (error) {
        if(error.statusCode=='400'){
            console.log("删除菜单权限配置失败,后端返回数据>>>" + error.responseText);
            res.status(error.statusCode).send(error.responseText);
        }
    });
});


router.post('/userrole', function (req, res) {

    console.log("添加用户角色配置：" + JSON.stringify(req.body.userrole));
    configModel.addUserRole(req.body.userrole, {}).done(function (data) {
        res.send(data);
    }).error(function (error) {
        if(error.statusCode=='400'){
            console.log("添加用户角色配置失败,后端返回数据>>>" + error.responseText);
            res.status(error.statusCode).send(error.responseText);
        }
    });
});

router.put('/userrole', function (req, res) {

    console.log("修改用户角色配置信息：" + JSON.stringify(req.body.userrole));
    configModel.updateUserRole(req.body.userrole, {}).done(function (data) {
        res.send(data);
    }).error(function (error) {
        if(error.statusCode=='400'){
            console.log("修改用户角色配置失败,后端返回数据>>>" + error.responseText);
            res.status(error.statusCode).send(error.responseText);
        }
    });
});

router.delete('/userrole', function (req, res) {

    console.log("删除用户角色配置信息：" + req.body.userrole);
    configModel.deleteUserRole(req.body.userrole,{}).done(function (data) {
        res.send(data);
    }).error(function (error) {
        if(error.statusCode=='400'){
            console.log("删除用户角色配置失败,后端返回数据>>>" + error.responseText);
            res.status(error.statusCode).send(error.responseText);
        }
    });
});


module.exports = router;