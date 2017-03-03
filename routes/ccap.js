/**
 *Created by gxw on 2015/3/5 0005.
 *@author gxw
 *@version v1.0
 */
var express = require('express');
var router = express.Router();
var txt,ary,buffer;
router.get('/', function(req, res) {

    if(req.url == '/favicon.ico')return req.end('');//Intercept request favicon.ico
//注入ccap模块，并配置验证码的样式；
    var ccap = require('ccap')(
        {
            width: 200,//set width,default is 256
            height: 50,//set height,default is 60
            offset: 30,//set text spacing,default is 40
            quality: 50,//set pic quality,default is 50
            fontsize: 40//set font size,default is 57
        }

    );
    ary = ccap.get();
    txt = ary[0];
    buffer = ary[1];
//    res.session.code=txt;
    res.end(buffer);

    console.log(txt);
});
router.get('/checkCode',function(req,res){
    console.log("检测验证码");
    if(req.query.upperCode==txt){
        res.send(true);
    }else{
        res.send(false);
    }
});

module.exports = router;


//var http = require('http');
//
////注入ccap模块，并配置验证码的样式；
//var ccap = require('ccap')(
//    {
//        width: 256,//set width,default is 256
//        height: 60,//set height,default is 60
//        offset: 40,//set text spacing,default is 40
//        quality: 50,//set pic quality,default is 50
//        fontsize: 50//set font size,default is 57
//    }
//
//);//Instantiated ccap class
//
//http.createServer(function (request, response) {
//
//    if(request.url == '/favicon.ico')return response.end('');//Intercept request favicon.ico
//
//    var ary = ccap.get();
//
//    var txt = ary[0];
//
//    var buf = ary[1];
//
//    response.end(buf);
//
//    console.log(txt);
//
//}).listen(8124);
//
//console.log('Server running at http://127.0.0.1:8124/');