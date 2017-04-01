var express = require('express');
var router = express.Router();
var ModelProxy, toolsModel;
ModelProxy = require('./../../proxy/DataProxy').DataProxy;
toolsModel = ModelProxy.create("tools.*");

/*****************工具类**********************/
router.get("/format", function (req, res) {
    //真正请求后台接口的路由
    req.session = {};
    console.log("node端接收参数:date>>>"+req.query.date);
    console.log("node端接收参数:format>>>"+req.query.format);
    toolsModel.dateFormat({date:req.query.date,format:req.query.format}).done(function (data) {
        console.log("node后端转换日期成功>>>" + JSON.stringify(data));
        res.send(data);
    }).fail(function (error) {
        console.log("error>>" + error);
        res.send(error);
    });
});
module.exports = router;