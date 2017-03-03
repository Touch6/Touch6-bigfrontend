
    function changeCode(){
        var codeSrc=document.getElementById("code");
//        codeSrc.src='http://localhost:3001/ccap?'+new Date().getTime();
        codeSrc.src='/ccap?'+new Date().getTime();
    }

    /***************将邮箱换为：122***111@qq.com形式**********************/
    function styleEmail(email){
        var emailStr,atMark,qqNumber,replaceStr,qqNumberLength,xingStr='';
        emailStr=email;
        atMark=email.indexOf("@");
        qqNumber=email.substring(0,atMark);
        qqNumberLength=qqNumber.length;
//    console.log("emailStr:"+emailStr+"atMark:"+atMark+"qqNumber:"+qqNumber+"qqNumberLength:"+qqNumberLength);
        replaceStr=qqNumber.substring(2,qqNumberLength-2);
        for(var i=1;i<=replaceStr.length;i++){
            xingStr+="*";
        }
//    console.log("replaceStr="+replaceStr+"xingStr="+xingStr);
        emailStr=emailStr.replace(replaceStr,xingStr);
//    console.log("替换后的email为："+emailStr);
        return emailStr;

    }

   /************上传文件*******************/
    function uploadFile(uploadBtnId,downloadUrlId){
           $(uploadBtnId).uploadify({
               'buttonClass': 'some-class',                //按钮的样式
               'buttonText': '选择文件',                    //按钮的文字
               'swf': 'libs/uploadify/uploadify.swf',  //swf文件的路径
               'fileObjName': 'file',
               'uploader': 'http://up.wcsapi.biz.matocloud.com:8090/file/upload',         //提交到后台的路径
               //开始传输之前触发
               'onUploadStart': function (file) {
                   //获得上传的token
                   $.ajax({
                       url: '/uptoken',
                       type: "get",
                       async: false,
                       dataType: "json",
                       success: function (data) {
                           var uptoken = data.uptoken;
                           $(uploadBtnId).uploadify("settings", "formData", {'token': uptoken});
                           alert(uptoken);
                       }
                   });
                   alert('Starting to upload ' + file.name);
               },
               //全部上传成功之后触发
               'onUploadSuccess': function (file, data, response) {
                   alert("data:"+Base64.decode(data));
                   console.log("data:"+Base64.decode(data));

                   var mark=Base64.decode(data).indexOf("=");
                   var iconUrl=Base64.decode(data).substring(mark+1,Base64.decode(data).length);
                   $(downloadUrlId).attr("value",iconUrl);
                   console.log("下载地址为："+$(downloadUrlId).attr("value"));
               }
           });

   }



    /**
     * 匹配密码，以字母开头，长度在6-12之间，只能包含字符、数字和下划线。
     */
    function isPwd(str){
//        if(str==null||str=="") return false;
//        var result=str.match(/^[a-zA-Z]\\w{6,12}$/);
//        if(result==null)return false;
//        return true;
        var myReg=/^[_0-9a-zA-Z]{6,12}$/;
        if(myReg.test(str)){
            return true;
        }else{
            return false;
        }
    }
    /*
     *匹配用户名：5-20位的、字母、数字、下划线的组合；
     */
    function isUserName(str){
//        var myReg=/^\\w{5,20}$/;
        var myReg=/^[_0-9a-zA-Z]{5,20}$/;
        if(myReg.test(str)){
            return true;
        }else{
            return false;
        }
    }
    /*
     用途：检查输入对象的值是否符合E-Mail格式
     输入：str 输入的字符串
     返回：如果通过验证返回true,否则返回false

     */
    function isEmail( str ){
        var myReg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
//        var myReg = /^[-_A-Za-z0-9]+@([_A-Za-z0-9]+\.)+[A-Za-z0-9]{2,3}$/;
        if(myReg.test(str)){
            return true;
        }else{
            return false;
        }

    }
    /***********************注册表单验证***************************************/
function checkRegisterForm(formObj){
    console.log(JSON.stringify(formObj));
    var loginName=isUserName(formObj.loginName);
    var password=isPwd(formObj.plainPassword);
    var email=isEmail(formObj.email);

     console.log(loginName+"//"+password+'//'+email);
     if(loginName&&password&&email){return true;}
        if(!loginName){
            swal("", "用户名为5-20位字母、数字、下划线的组合!", "error");
            return false;
        }
        if(!password){
            swal("", "密码为6-12位以字母开头的中文、字母、数字、下划线的组合!", "error");
            return false;
        }
        if(!email){
            swal("", "邮箱格式不正确!", "error");
            return false;
        }



  }




