var express = require('express');
var router = express.Router();
var ModelProxy, toolsModel;
ModelProxy = require('./../../proxy/DataProxy').DataProxy;
toolsModel = ModelProxy.create("tools.*");

/*****************工具类**********************/
router.get("/format", function (req, res) {
    //真正请求后台接口的路由
    req.session = {};
    console.log("node端接收参数:src>>>" + req.query.src);
    console.log("node端接收参数:format>>>" + req.query.format);
    console.log("node端接收参数:type>>>" + req.query.type);
    toolsModel.dateFormat({src: req.query.src, format: req.query.format, type: req.query.type}).done(function (data) {
        console.log("node后端转换日期成功>>>" + JSON.stringify(data));
        res.send(data);
    }).fail(function (error) {
        console.log("error>>" + error);
        res.send(error);
    });
});
router.get("/codec", function (req, res) {
    //真正请求后台接口的路由
    req.session = {};
    console.log("node端接收参数:src>>>" + req.query.src);
    console.log("node端接收参数:type>>>" + req.query.type);
    toolsModel.codec({src: req.query.src, type: req.query.type}).done(function (data) {
        console.log("node后端编解码成功>>>" + JSON.stringify(data));
        res.send(data);
    }).fail(function (error) {
        console.log("error>>" + error);
        res.send(error);
    });
});

router.post("/dencrypt", function (req, res) {
    console.log("node端接收参数:dencryption>>>" + JSON.stringify(req.body.dencryption));
    toolsModel.dencrypt(req.body.dencryption, {}).done(function (data) {
        console.log("node后端加解密成功>>>" + JSON.stringify(data));
        res.send(data);
    }).fail(function (error) {
        console.log("error>>" + JSON.stringify(error));
        res.send(error);
    });
});
module.exports = router;