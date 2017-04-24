var express = require('express');
var router = express.Router();
var ModelProxy = require('./../../proxy/DataProxy').DataProxy;
var authmenuModel = ModelProxy.create("authmenu.*");

router.post('/', function (req, res) {

    console.log("添加菜单权限配置：" + JSON.stringify(req.body.authmenu));
    authmenuModel.addAuthmenu(req.body.authmenu, {}).done(function (data) {
        res.send(data);
    }).error(function (error) {
        if(error.statusCode=='400'){
            console.log("添加菜单权限配置失败,后端返回数据>>>" + error.responseText);
            res.status(error.statusCode).send(error.responseText);
        }
    });
});

router.put('/', function (req, res) {

    console.log("修改菜单权限配置信息：" + JSON.stringify(req.body.authmenu));
    authmenuModel.updateAuthmenu(req.body.authmenu, {}).done(function (data) {
        res.send(data);
    }).error(function (error) {
        if(error.statusCode=='400'){
            console.log("修改菜单权限配置失败,后端返回数据>>>" + error.responseText);
            res.status(error.statusCode).send(error.responseText);
        }
    });
});

router.delete('/', function (req, res) {

    console.log("删除菜单权限配置信息：" + req.body.authmenu);
    authmenuModel.deleteAuthmenu(req.body.authmenu,{}).done(function (data) {
        res.send(data);
    }).error(function (error) {
        if(error.statusCode=='400'){
            console.log("删除菜单权限配置失败,后端返回数据>>>" + error.responseText);
            res.status(error.statusCode).send(error.responseText);
        }
    });
});

router.get('/pageable', function (req, res) {

    console.log("获取权限菜单配置信息");
    authmenuModel.pageAuthmenus({page:req.query.page,pageSize:req.query.pageSize}).done(function (data) {
        res.send(data);
    }).error(function (error) {
        if(error.statusCode=='400'){
            console.log("查询权限菜单失败,后端返回数据>>>" + error.responseText);
            res.status(error.statusCode).send(error.responseText);
        }
    });
});

module.exports = router;