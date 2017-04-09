var express = require('express');
var router = express.Router();
var ModelProxy, articleModel;
ModelProxy = require('./../../proxy/DataProxy').DataProxy;
articleModel = ModelProxy.create("article.*");

router.post('/', function (req, res) {

    articleModel.write(req.body.article,{}).done(function (data) {
        res.send(data);
    }).error(function (error) {
        console.log("调用后台保存文章返回错误信息>>>" + JSON.stringify(error));
    });
});

router.get('/list', function (req, res) {

    console.log("node拿到的uid：" + req.query.uid);
    console.log("node拿到的page：" + req.query.page);
    console.log("node拿到的pageSize：" + req.query.pageSize);
    articleModel.list({
        uid: req.query.uid,
        page: req.query.page,
        pageSize: req.query.pageSize
    }).done(function (data) {
        console.log("调用后台文章列表返回信息>>>" + JSON.stringify(data));
        res.send(data);
    }).error(function (error) {
        console.log("调用后台文章列表返回错误信息>>>" + JSON.stringify(error));
    });
});

router.get('/types', function (req, res) {

    articleModel.types({}).done(function (data) {
        console.log("调用后台文章类型列表返回信息>>>" + JSON.stringify(data));
        res.send(data);
    }).error(function (error) {
        console.log("调用后台文章类型列表返回错误信息>>>" + error);
    });
});

router.get('/categories', function (req, res) {

    articleModel.categories({parentCategory: req.query.parentCategory}).done(function (data) {
        console.log("调用后台文章分类列表返回信息>>>" + JSON.stringify(data));
        res.send(data);
    }).error(function (error) {
        console.log("调用后台文章分类列表返回错误信息>>>" + error);
    });
});

module.exports = router;