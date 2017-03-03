var express = require('express');
var router = express.Router();
var uptoken=require('../upToken/upToken');
//获取uptoken
router.get('/', function (req, res) {
    /*    res.header("Cache-Control", "max-age=0, private, must-revalidate");
     res.header("Pragma", "no-cache");
     res.header("Expires", 0);*/
    if (uptoken) {
        return res.json({
            uptoken: uptoken.uptoken
        });
    }
});



module.exports = router;