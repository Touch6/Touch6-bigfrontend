var express = require('express');
var router = express.Router();
var ModelProxy, toolsModel;
ModelProxy = require('./../../proxy/DataProxy').DataProxy;
toolsModel = ModelProxy.create("tools.*");

/*****************工具类**********************/
router.get("/format", function (req, res) {
    //真正请求后台接口的路由
    req.session = {};
    console.log("node端接收参数:src>>>"+req.query.src);
    console.log("node端接收参数:format>>>"+req.query.format);
    console.log("node端接收参数:dst>>>"+req.query.dst);
    console.log("node端接收参数:type>>>"+req.query.type);
    toolsModel.dateFormat({src:req.query.src,format:req.query.format,dst:req.query.dst,type:req.query.type}).done(function (data) {
        console.log("node后端转换日期成功>>>" + JSON.stringify(data));
        res.send(data);
    }).fail(function (error) {
        console.log("error>>" + error);
        res.send(error);
    });
});
module.exports = router;