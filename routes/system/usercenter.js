var express = require('express');
var router = express.Router();
var ModelProxy = require('./../../proxy/DataProxy').DataProxy;
var usercenterModel = ModelProxy.create("usercenter.*");

router.get('/pageable', function (req, res) {
    console.log("usercenter pageable:" + req.query.page + "/" + req.query.pageSize);
    usercenterModel.pageUsers({page: req.query.page, pageSize: req.query.pageSize}).done(function (data) {
        console.log(JSON.stringify(data))
        res.send(data);
    }).error(function (error) {
        if (error.statusCode == '400') {
            console.log("获取用户失败,后端返回数据>>>" + error.responseText);
            res.status(error.statusCode).send(error.responseText);
        }
    });
});

router.get('/userrole/list', function (req, res) {
    console.log(req.query.userId);
    usercenterModel.userroleList({userId: req.query.userId}).done(function (data) {
        res.send(data);
    }).error(function (error) {
        if (error.statusCode == '400') {
            console.log("获取用户角色失败,后端返回数据>>>" + error.responseText);
            res.status(error.statusCode).send(error.responseText);
        }
    });
});

router.post('/userrole', function (req, res) {
    usercenterModel.addUserrole(req.body.userrole, {}).done(function (data) {
        console.log(JSON.stringify(data))
        res.send(data);
    }).error(function (error) {
        if (error.statusCode == '400') {
            console.log("配置用户角色失败,后端返回数据>>>" + error.responseText);
            res.status(error.statusCode).send(error.responseText);
        }
    });
});
module.exports = router;
