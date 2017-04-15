var express = require('express');
var router = express.Router();
var ModelProxy = require('./../../proxy/DataProxy').DataProxy;
var approvalModel = ModelProxy.create("approval.*");

/*****************点赞**********************/
router.post("/", function (req, res) {
    approvalModel.approval(req.body.approval, {}).done(function (data) {
        console.log("点赞成功,后端返回数据>>>" + JSON.stringify(data));
        res.send(data);
    }).fail(function (error) {
        if(error.statusCode=='400'){
            console.log("点赞失败,后端返回数据>>>" + error.responseText);
            res.status(error.statusCode).send(error.responseText);
        }
    });
});

module.exports = router;