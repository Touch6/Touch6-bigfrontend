var express = require('express');
var router = express.Router();
var ModelProxy = require('./../../proxy/DataProxy').DataProxy;
var usercenterModel = ModelProxy.create("usercenter.*");

router.get('/page/users', function (req, res) {

    usercenterModel.pageUsers({page:req.query.page,pageSize:req.query.pageSize}).done(function (data) {
        res.send(data);
    }).error(function (error) {
        if(error.statusCode=='400'){
            console.log("获取用户失败,后端返回数据>>>" + error.responseText);
            res.status(error.statusCode).send(error.responseText);
        }
    });
});
module.exports = router;
