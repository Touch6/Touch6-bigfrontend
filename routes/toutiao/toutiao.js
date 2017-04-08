var express = require('express');
var router = express.Router();
var ModelProxy, mobileModel;
ModelProxy = require('./../../proxy/DataProxy').DataProxy;
toutiaoModel = ModelProxy.create("toutiao.*");

/*****************获取头条标题列表**********************/
router.get("/overview", function (req, res) {
    //真正请求后台接口的路由
    req.session = {};
    console.log("node端接收参数:page>>>"+req.query.page);
    console.log("node端接收参数:pageSize>>>"+req.query.pageSize);
    toutiaoModel.overview({page:req.query.page,pageSize:req.query.pageSize}).done(function (data) {
        console.log("node后端获取头条标题成功>>>" + JSON.stringify(data));
        res.send(data);
    }).fail(function (error) {
        console.log("error>>" + error);
        res.send(error);
    });
});
module.exports = router;