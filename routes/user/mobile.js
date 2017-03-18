var express = require('express');
var router = express.Router();
var ModelProxy, mobileModel;
ModelProxy = require('./../../proxy/DataProxy').DataProxy;
mobileModel = ModelProxy.create("mobile.*");


/*****************生成验证码**********************/
router.get("/", function (req, res) {
    //真正请求后台接口的路由
    req.session = {};
    console.log("(3)mobile>>>"+req.query.mobile);
    mobileModel.generateCode({mobile:req.query.mobile}).done(function (data) {
        console.log("生成验证码成功,后端返回数据>>>" + JSON.stringify(data));
        res.send(data);
    }).fail(function (error) {
        console.log("error>>" + error);
        res.send(error);
    });
});
module.exports = router;