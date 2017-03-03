/**
 *Created by gxw on 2015/3/12 0012.
 *@author gxw
 *@version v1.0
 *@description 生成上传凭证 uptoken
 */
var crypto = require('crypto');
var config = require('../config/config');
//上传凭证 = 上传策略数据(putPolicy)+Ak+SK
var uploadToken, downloadToken;

var date = new Date();
var year = date.getFullYear();
var month = date.getMonth() + 1;
var day = date.getDate();
var hour = date.getHours();
var min = date.getMinutes();
var mill = date.getSeconds();

//console.log("一个小时以后毫秒数:" + deadline);
var nextHour=hour+1;
console.log("一个小时之后的时间:" +  date.setHours(nextHour));

console.log("当前UNIX一个小时之后的时间戳:" +  date.getTime());
console.log("转换时间戳:" +  new Date(date.getTime()));

var deadline = date.setHours(nextHour);
var putPloicy = {
    "scope": "chop-app",
    "deadline": deadline,
    "returnBody": "url=$(url)",
    "overwrite": 1
};
//1对上传策略做 URL 安全的 Base64 编码，得到待签名的数据 encodedPutPolicy
var PutPolicyToString = new Buffer(JSON.stringify(putPloicy));
var encodedPutPolicy = PutPolicyToString.toString('base64');
console.log('encodedPutPolicy:' + encodedPutPolicy);
//2使用 SecretKey 对 encodedPutPolicy 进行 HMAC-SHA1 签名 Sign
var Sign = crypto.createHmac('sha1', config.wcs.WSC_SK).update(encodedPutPolicy).digest('hex').toString();
console.log("Sign:" + Sign);
//3对签名数据 Sign 进行 URL 安全的 Base64 编码操作，得到 encodedSign
var encodedSignBuffer = new Buffer(Sign);
var encodedSign = encodedSignBuffer.toString('base64');
console.log('encodedSign：' + encodedSign);
//4生成上传凭证 uploadToken = AccessKey + ':' + encodedSign+ ':' + encodedPutPolicy
uploadToken = config.wcs.WSC_AK + ':' + encodedSign + ':' + encodedPutPolicy;
console.log('uploadToken：' + uploadToken);


module.exports.uptoken = uploadToken;
/*var json = {
 "scope": "chos-app", //空间名
 "deadline": "1345245252000",
 "returnBody": "fsize=$(fsize)",
 "overwrite": 1
 };
 var jsonStr = new Buffer(JSON.stringify(json));
 var cloud1 = "cdn.jpg";
 var strCloud = new Buffer(cloud1)
 var s = jsonStr.toString('base64');
 console.log("编码后的json" + s);
 console.log("编码后的cloud1" + strCloud.toString('base64'));*/

//编码
var str="abcd1234/+";
console.log("编码:"+new Buffer(str).toString('base64'));


//解码
var decode = new Buffer('dXJsPWh0dHA6Ly9jaG9wLWFwcC5tLndjc2FwaS5iaXoubWF0b2Nsb3VkLmNvbS9waWMuaHRtbA====', 'base64').toString();
console.log("解码" + decode);
