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
                    alert("data:" + Base64.decode(data));
                    console.log("data:" + Base64.decode(data));
                    var mark = Base64.decode(data).indexOf("=");
                    var iconUrl = Base64.decode(data).substring(mark, Base64.decode(data).length);
                    angular.element("#iconDownloadUrl").attr("value", iconUrl);
                    $scope.upNormalApp.icon = iconUrl;
                    console.log("iconurl为：" + $scope.upNormalApp.icon);
                }
            });

//            })
        }
    }
});
consoleApp.directive('ckeditor', function () {
    return {
        require: '?ngModel',
        link: function (scope, element, attrs, ngModel) {
            var ckeditor = CKEDITOR.replace(element[0], {});
            if (!ngModel) {
                return;
            }
            ckeditor.on('instanceReady', function () {
                ckeditor.setData(ngModel.$viewValue);
            });
            ckeditor.on('pasteState', function () {
                scope.$apply(function () {
                    ngModel.$setViewValue(ckeditor.getData());
                });
            });
            ngModel.$render = function (value) {
                ckeditor.setData(ngModel.$viewValue);
            };
        }
    };
});

var _showMask = function () {
    angular.element('#mask').show();
}
var _hideMask = function () {
    angular.element('#mask').hide();
}
var deleteOptions = {
    title: "您确定要删除这条信息吗",
    text: "删除后将无法恢复，请谨慎操作！",
    type: "warning",
    showCancelButton: true,
    confirmButtonColor: "#DD6B55",
    confirmButtonText: "是的，我要删除！",
    cancelButtonText: "让我再考虑一下…",
    closeOnConfirm: false,
    closeOnCancel: false
}