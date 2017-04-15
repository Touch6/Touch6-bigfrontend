var express = require('express');
var router = express.Router();
var ModelProxy = require('./../../proxy/DataProxy').DataProxy;
var opposeModel = ModelProxy.create("oppose.*");

/*****************反对**********************/
router.post("/", function (req, res) {
    opposeModel.oppose(req.body.oppose, {}).done(function (data) {
        console.log("反对成功,后端返回数据>>>" + JSON.stringify(data));
        res.send(data);
    }).fail(function (error) {
        if(error.statusCode=='400'){
            console.log("反对失败,后端返回数据>>>" + error.responseText);
            res.status(error.statusCode).send(error.responseText);
        }
    });
});

module.exports = router;