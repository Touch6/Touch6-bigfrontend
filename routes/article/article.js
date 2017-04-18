var express = require('express');
var router = express.Router();
var ModelProxy = require('./../../proxy/DataProxy').DataProxy;
var articleModel = ModelProxy.create("article.*");
var approvalModel = ModelProxy.create("approval.*");
var opposeModel = ModelProxy.create("oppose.*");

router.post('/', function (req, res) {

    console.log("node拿到的文章信息：" + JSON.stringify(req.body.article));
    articleModel.write(req.body.article, {}).done(function (data) {
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

router.get('/detail', function (req, res) {

    articleModel.detail({id: req.query.articleId}).done(function (data) {
        console.log("调用后台文章详情返回信息>>>" + JSON.stringify(data));
        res.send(data);
    }).error(function (error) {
        console.log("调用后台文章详情返回错误信息>>>" + error);
    });
});

router.get('/comment/list', function (req, res) {

    articleModel.commentList({articleId: req.query.articleId}).done(function (data) {
        console.log("调用后台文章评论返回信息>>>" + JSON.stringify(data));
        res.send(data);
    }).error(function (error) {
        console.log("调用后台文章评论返回错误信息>>>" + error);
    });
});

/*****************点赞**********************/
router.post("/approval", function (req, res) {
    approvalModel.approval(req.body.approval, {}).done(function (data) {
        console.log("点赞成功,后端返回数据>>>" + JSON.stringify(data));
        res.send(data);
    }).fail(function (error) {
        console.log("error" + error);
        res.send(error);
    });
});


/*****************反对**********************/
router.post("/oppose", function (req, res) {
    opposeModel.oppose(req.body.oppose, {}).done(function (data) {
        console.log("反对成功,后端返回数据>>>" + JSON.stringify(data));
        res.send(data);
    }).fail(function (error) {
        console.log("error" + error);
        res.send(error);
    });
});

module.exports = router;