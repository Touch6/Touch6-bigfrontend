
var consoleApp = angular.module('consoleApp.directives', []);

consoleApp.directive('getDownLoadUrl', function () {
    return {
        restrict: 'AE',
        replace: true,
        link: function ($scope, elem, attrs) {
            attrs = attrs;
//            elem.bind('click', function (attrs) {
                $('#file_upload').uploadify({
//                angular.element('#file_upload').uploadify({
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
                                $('#file_upload').uploadify("settings", "formData", {'token': uptoken});
//                                angular.element('#file_upload').uploadify("settings", "formData", {'token': uptoken});
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
                        var iconUrl=Base64.decode(data).substring(mark,Base64.decode(data).length);
                        angular.element("#iconDownloadUrl").attr("value",iconUrl);
                        $scope.upNormalApp.icon=iconUrl;
                        console.log("iconurl为："+$scope.upNormalApp.icon);
                    }
                });

//            })
        }
    }
});


var _showMask = function () {
    angular.element('#mask').show();
}
var _hideMask = function () {
    angular.element('#mask').hide();
}