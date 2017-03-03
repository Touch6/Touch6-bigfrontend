var express = require('express');
var router = express.Router();
var ModelProxy, touchcModel;
ModelProxy = require('./../../proxy/DataProxy').DataProxy;
touchcModel = ModelProxy.create("touchC.*");

//创建touchc的应用;
router.post("/",function(req,res){
    var app=req.body.app;
    var uuid=req.body.uuid;
    console.log("node端：app:"+JSON.stringify(app)+"//uuid="+uuid);
    touchcModel.addTouchcApp({
        "name":req.body.app.name,
        "description":req.body.app.description,
        "platform":req.body.app.platform,
        "appType":req.body.app.appType,
        "uuid":req.body.uuid
    }).done(function(data){
        console.log("创建成功返回的结果是："+JSON.stringify(data));
        return res.send(true);
    }).fail(function(err){
        console.log(err);
       res.send(false);
    })
});
//获取touchC应用列表----分页；
router.get("/pageOfTouchcAppList",function(req,res){
    var uuid=req.query.uuid;
    var page=req.query.page;
    var pageSize=req.query.pageSize;
    console.log("node："+uuid+"//"+page+"//"+pageSize);
    touchcModel.pageOfAppList({uuid:uuid,page:page,pageSize:pageSize}).done(function(data){
        console.log(JSON.stringify(data));
        res.send(data);
    }).fail(function(err){
        console.log(err);
        res.send(err);
    });
});
//获取touchC应用列表----不分页；
router.get("/touchcAllAppList",function(req,res) {
        var uuid = req.query.uuid;
        console.log("node：不分页" + uuid);
        touchcModel.appAllList({uuid: uuid}).done(function (data) {
            console.log(JSON.stringify(data));
            res.send(data);
        }).fail(function (err) {
            console.log(err);
            res.send(err);
        });
});
//获取touchc单个应用的详情；
router.get("/appInfo",function(req,res){
    var uuid=req.query.uuid;
    var appId=req.query.appId;
    touchcModel.appInfo({uuid:uuid,appId:appId}).done(function(data){
        console.log(JSON.stringify(data));
        res.send(data);
    }).fail(function(err){
        console.log(err);
        res.send(err);
    })
});
//创建touchc版本；
router.post("/addVersion",function(req,res){
    var appId = req.body.appId;
    var version = req.body.version;
    console.log("node:" + appId + "--" + JSON.stringify(version));
    touchcModel.addTouchcVersion({
        appId:appId,//13;
        name: version.name,
        number: version.number,
        description: version.description,
        entrance: version.entrance,
        downloadUrl: version.downloadUrl
    }).done(function() {
        console.log("创建成功！");
        res.send(true);
    }).fail(function(err) {
        console.log(err);
        res.send(false);
    });
});

//更新touchcdf单个应用的信息；
router.post("/updateAppInfo",function(req,res){
   var uuid=req.body.uuid;
   var appId=req.body.appId;
   var upApp=req.body.updateApp;
    console.log(uuid+":"+uuid+"/"+appId+"/"+upApp.icon);
   touchcModel.updateApInfo({
       name:upApp.name,
       description:upApp.description,
       icon:upApp.icon,
       uuid:uuid,
       appId:appId}).done(function(data){
       console.log(JSON.stringify(data));
       res.send(true);
   }).fail(function(err){
       console.log(err);
       res.send(false);
   })
});
// 获取touchc版本列表；
router.get("/getAppVersionList",function(req,res){
    var appId=req.query.appId;
    var page=req.query.page;
    var pageSize=req.query.pageSize;
    console.log("appId="+appId);
    touchcModel.getAppVersionList({appId:appId,page:page,pageSize:pageSize}).done(function(data){
        console.log(JSON.stringify(data));
        res.send(data);
    }).fail(function(err){
        console.log(err);
        res.send(err);
    })
});
//删除touchc应用；
router.delete("/deleteApp",function(req,res){
    var uuid=req.query.uuid;
    var appId=req.query.appId;
    console.log(uuid+"....."+appId);
    touchcModel.deleteApp({uuid:uuid,appId:appId}).done(function(data){
        res.send(true);
    }).fail(function(err){
        console.log(err);
        res.send(false);
    })
});
//发布touchc版本；
router.post("/publishTouchcVersion",function(req,res){
    var versionId=req.body.versionId;
    console.log("node拿到的应用iD和版本id为："+"--"+versionId);
    touchcModel.publishTouchcVersion({versionId:versionId}).done(function (data) {
        res.send(true);
    }).fail(function(err){
        res.send(false);
    });
});
//取消touchc版本发布；
router.post("/onPublishTouchcVersion",function(req,res){
    var versionId=req.body.versionId;
    console.log("node拿到的版本id为："+"--"+versionId);
    touchcModel.onPublishTouchcVersion({versionId:versionId}).done(function (data) {
        res.send(true);
    }).fail(function(err){
        res.send(false);
    });
});
//启用和禁用touchc应用版本；
router.get("/enableTouchcVersion",function(req,res){
    var versionId=req.query.versionId;
    console.log("版本ID"+versionId);
    touchcModel.enableOrDisableTouchcVersion({versionId:versionId}).done(function(){
        res.send(true);
    }).fail(function(err){
        console.log(err);
        res.send(false);
    })
});
//删除touchc应用版本；
router.post("/deleteTouchcVersion",function(req,res){
    var versionIds=req.body.versionIds;
    var appId=req.body.appId;
    var uuid=req.body.uuid;
    console.log("数组："+versionIds+"//appId="+appId+"类型："+typeof (versionIds));
    console.log("uuid="+uuid);
    touchcModel.deleteTouchcversions({uuid:uuid,appId:appId,versionIds:versionIds}).done(function(data) {
        console.log(data);
        res.send(true);
    }).fail(function(err){
        console.log(err);
        res.send(false);
    });
});
// 转让touchc应用；
router.put("/transferTouchcApp",function(req,res){
    var uuid=req.body.uuid;
    var appId=req.body.appId;
    var receiver=req.body.receiver;
    console.log("node端拿到的转让信息为："+uuid+"***"+appId+"*********"+receiver);
    touchcModel.transTouchcApp({appId:appId,fromDeveloperUid:uuid,toDeveloper:receiver}).done(function(data){
        res.send(true);
    }).fail(function(err){
        console.log(err);
        res.send(false);
    })
});
//更新版本信息；
router.post("/updateTouchcVersion",function(req,res){
    var appId=req.body.appId;
    var versionId=req.body.touchcVersionId;
    var version=req.body.appTouchcVersion;
    console.log("appid="+appId+"//versionId:"+versionId+"//version:"+JSON.stringify(version));
    touchcModel.updateTouchcversion({
        "id":version.id,
        "name":version.name,
        "number":version.number,
        "description":version.description,
        "entrance":version.entrance,
        "downloadUrl":version.downloadUrl,
        "appId":appId,
        "versionId":versionId
    }).done(function(data){
        console.log(data);
        res.send(true);
    }).fail(function(err){
        console.log(err);
        res.send(false);
    });
});




module.exports=router;

