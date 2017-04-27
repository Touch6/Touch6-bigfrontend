var express = require('express');
var router = express.Router();
var ModelProxy = require('./../../proxy/DataProxy').DataProxy;
var menuModel = ModelProxy.create("menu.*");

router.post('/', function (req, res) {

    console.log("添加菜单信息：" + JSON.stringify(req.body.menu));
    menuModel.addMenu(req.body.menu, {}).done(function (data) {
        res.send(data);
    }).error(function (error) {
        if(error.statusCode=='400'){
            console.log("添加菜单失败,后端返回数据>>>" + error.responseText);
            res.status(error.statusCode).send(error.responseText);
        }
    });
});

router.put('/', function (req, res) {

    console.log("修改菜单信息：" + JSON.stringify(req.body.menu));
    menuModel.updateMenu(req.body.menu, {}).done(function (data) {
        res.send(data);
    }).error(function (error) {
        if(error.statusCode=='400'){
            console.log("修改菜单失败,后端返回数据>>>" + error.responseText);
            res.status(error.statusCode).send(error.responseText);
        }
    });
});

router.get('/', function (req, res) {

    console.log("获取菜单信息：" + req.query.menuId);
    menuModel.menuInfo({menuId:req.query.menuId}).done(function (data) {
        res.send(data);
    }).error(function (error) {
        if(error.statusCode=='400'){
            console.log("获取菜单失败,后端返回数据>>>" + error.responseText);
            res.status(error.statusCode).send(error.responseText);
        }
    });
});

router.get('/selectlist', function (req, res) {

    menuModel.menuList({moduleId:req.query.moduleId}).done(function (data) {
        res.send(data);
    }).error(function (error) {
        if(error.statusCode=='400'){
            console.log("获取菜单失败,后端返回数据>>>" + error.responseText);
            res.status(error.statusCode).send(error.responseText);
        }
    });
});

router.delete('/', function (req, res) {

    console.log("删除菜单信息：" + req.query.menuId);
    menuModel.deleteMenu({menuId:req.query.menuId}).done(function (data) {
        res.send(data);
    }).error(function (error) {
        if(error.statusCode=='400'){
            console.log("删除菜单失败,后端返回数据>>>" + error.responseText);
            res.status(error.statusCode).send(error.responseText);
        }
    });
});


router.get('/page/menus', function (req, res) {

    menuModel.pageMenus({page:req.query.page,pageSize:req.query.pageSize}).done(function (data) {
        res.send(data);
    }).error(function (error) {
        if(error.statusCode=='400'){
            console.log("获取菜单失败,后端返回数据>>>" + error.responseText);
            res.status(error.statusCode).send(error.responseText);
        }
    });
});

router.get('/lock', function (req, res) {

    menuModel.lock({menuId:req.query.menuId}).done(function (data) {
        res.send(data);
    }).error(function (error) {
        if(error.statusCode=='400'){
            console.log("锁定菜单失败,后端返回数据>>>" + error.responseText);
            res.status(error.statusCode).send(error.responseText);
        }
    });
});
router.get('/unlock', function (req, res) {

    console.log(req.query.menuId);
    menuModel.unlock({menuId:req.query.menuId}).done(function (data) {
        res.send(data);
    }).error(function (error) {
        if(error.statusCode=='400'){
            console.log("解锁菜单失败,后端返回数据>>>" + error.responseText);
            res.status(error.statusCode).send(error.responseText);
        }
    });
});


router.get('/top', function (req, res) {

    console.log("置顶菜单信息：" + req.query.menuId);
    menuModel.moveTop({menuId: req.query.menuId}).done(function (data) {
        res.send(data);
    }).error(function (error) {
        if (error.statusCode == '400') {
            console.log("置顶菜单失败,后端返回数据>>>" + error.responseText);
            res.status(error.statusCode).send(error.responseText);
        }
    });
});

router.get('/up', function (req, res) {

    console.log("上移菜单信息：" + req.query.menuId);
    menuModel.moveUp({menuId: req.query.menuId}).done(function (data) {
        res.send(data);
    }).error(function (error) {
        if (error.statusCode == '400') {
            console.log("上移菜单失败,后端返回数据>>>" + error.responseText);
            res.status(error.statusCode).send(error.responseText);
        }
    });
});
router.get('/down', function (req, res) {

    console.log("下移菜单信息：" + req.query.menuId);
    menuModel.moveDown({menuId: req.query.menuId}).done(function (data) {
        res.send(data);
    }).error(function (error) {
        if (error.statusCode == '400') {
            console.log("下移菜单失败,后端返回数据>>>" + error.responseText);
            res.status(error.statusCode).send(error.responseText);
        }
    });
});
module.exports = router;