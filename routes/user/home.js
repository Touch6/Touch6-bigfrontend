var express = require('express');
var router = express.Router();
var ModelProxy, HomeModel;
ModelProxy = require('./../../proxy/DataProxy').DataProxy;
HomeModel = ModelProxy.create("home.*");

router.get('/',function(req,res){
    HomeModel.list().done(function(data){
       console.log(data);
        res.send(data);
   }).error(function(data){
       console.log(data);
   });
//    res.send(data);





});



module.exports = router;