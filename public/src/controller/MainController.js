var consoleApp = angular.module("consoleApp.controllers", [
    'consoleApp.services',
    'ngCookies',
    'ui.bootstrap'
//    'tm.pagination'
]);


/**********************************整体body模块**************************************/
consoleApp.controller("MainController", function ($rootScope, $scope, $window, $cookies) {
    console.log("MainController");
    console.log("MainController->$scope.loginUser:"+$cookies.user);
    if ($cookies.user) {
        $rootScope.notLogin = false;
    }else{
        $rootScope.notLogin = true;
    }
});
/**********************************系统首页**************************************/
consoleApp.controller("IndexController", function ($rootScope, $scope, $window, $cookies) {
    $scope.welcome = '欢迎进入首页!';
});
/**********************************导航总路由**************************************/
consoleApp.controller("NaviController", function ($rootScope, $scope, $window, $cookies) {
    console.log("NaviController")
});
/**********************************头条路由**************************************/
consoleApp.controller("ToutiaoController", function ($rootScope, $scope, $window, toutiao, $cookies) {
    //自动获取头条标题信息
    toutiao.overview(1, 30)
        .then(function (data) {
            console.log("头条加载成功");
            $rootScope.overview = data.object;
        }, function (err) {
            console.log("头条加载失败" + err);
        });
});
/**********************************工具路由**************************************/
consoleApp.controller("DateToolsController", function ($rootScope, $scope, $window, tools, $cookies) {

    //定义变量
    $scope.src = '';
    $scope.format = '0';
    $scope.dst = '';
    $scope.type = '';
    $scope.dateFormat = function (type) {
        var src = $scope.src;
        var format = $scope.format;
        console.log(src);
        console.log(format);
        console.log(type);
        if ('0' == format) {
            if (type == '1') {
                swal('', '请选择目标转换格式', 'error');
            } else if (type == '-1') {
                swal('', '请选择源格式', 'error');
            }
            return;
        }
        tools.dateFormat(src, format, type)
            .then(function (data) {
                console.log("格式转换成功:" + data.object);
                $rootScope.formated = data.object;
            }, function (err) {
                console.log("格式转换失败" + err);
            });
    }
});
/**********************************工具路由**************************************/
consoleApp.controller("CodecController", function ($rootScope, $scope, $window, tools, $cookies) {

    //定义变量
    $scope.src = '';
    $scope.type = '';
    $scope.codec = function () {
        var src = $scope.src;
        var type = $scope.type;
        console.log(src);
        console.log(type);
        if (!type) {
            swal('', '请选择编解码方式', 'error');
            return;
        }
        tools.codec(src, type)
            .then(function (data) {
                console.log("编解码成功:" + data.object);
                $rootScope.result = data.object;
            }, function (err) {
                console.log("编解码失败" + err);
            });
    }
});

/**********************************工具路由**************************************/
consoleApp.controller("RegexController", function ($rootScope, $scope, $window, tools, $cookies) {


});

/**********************************工具路由**************************************/
consoleApp.controller("UsercenterController", function ($rootScope, $scope, $window, usercenter, $cookies) {
    console.log("UsercenterController");
});

/************************************登录模块*************************************************/
consoleApp.controller("LoginController", function ($rootScope, $scope, $window, user, $cookies, $location) {
    $scope.login = {
        "loginName": "",
        "password": ""
    }
    $scope.loginError = "";
    //登录提交表单时，对表单进行验证；
    $scope.loginSubmit = function () {
        //$scope.login为表单已填充后的数据
        user.loginVerify($scope.login)
            .then(function (data) {
                //登录成功跳转到home页面
                console.log("登录成功");
                $rootScope.loginUser = data;//将用户信息存入$rootScope，在页面获取
                $cookies.user=data;
                console.log("data:" + JSON.stringify(data));
                console.log(JSON.stringify($scope.loginUser));
                $rootScope.notLogin = false;
            }, function (err) {
                alert("登录失败" + JSON.stringify(err));
                //登录失败，停止在登陆页
                $scope.loginError = "*用户名或密码错误!";
                console.log($scope.loginError);
            });
    }
});

/************************************首页模块*************************************************/
consoleApp.controller("HomeCtrl", function ($scope, $window, user, $cookies, $location) {
    //alert("LoginCtrl");
    //初始化登录参数
    // if ($cookies.user == null) {
    //     console.log("你还未登录");
    //     $window.location = "/#/login";
    // }
});
/***********************************登出模块********************************************/
consoleApp.controller("LoginOutCtrl", function ($scope, $cookies, $window) {
    console.log("退出登录前:" + JSON.stringify($cookies.user));
    $scope.logout = function () {
        $scope.user = null;
        delete $cookies.user;
        $window.location = '/#/login';
    };
    console.log("退出登录后:" + JSON.stringify($cookies.user));
});
/***************************************注册模块*********************************************/
consoleApp.controller("RegisterController", function ($scope, $cookies, $window, user, phone) {
    console.log("注册");
    //1检测手机是否已注册
    $scope.checkMobile = function () {
        console.log("time:" + new Date().getMilliseconds() + "(1)页面输入手机号:" + $scope.register.phone);
        $scope.mobileIsChecking = true;
        phone.check($scope.register.phone).then(function (data) {
            if (data.statusCode == 400) {
                console.log("检测手机号是否注册返回结果statusCode>>>" + data.statusCode);
                console.log("检测手机号是否注册返回结果responseText>>>" + JSON.stringify(data.responseText));
                //后台返回错误信息
                var json = JSON.parse(data.responseText);
                if (json.code = '200100') {
                    //手机号码已被注册
                    $scope.mobileIsRegistered = true;
                    $scope.mobileIsChecking = false;
                    $scope.mobileIsNotRegistered = false;
                }
            } else if (data.code = 200) {
                //后台返回成功
                $scope.mobileIsRegistered = false;
                $scope.mobileIsChecking = false;
                $scope.mobileIsNotRegistered = true;
            }

        }, function (err) {
            console.log(err);
        });

    }
    //2生成手机验证码
    $scope.generateCode = function () {
        console.log("(1)页面输入手机号:" + $scope.register.phone);
        //校验手机号码是否合法
        phone.generateCode($scope.register.phone).then(function (data) {
            console.log("生成验证码返回结果>>>" + JSON.stringify(data));
        }, function (err) {
            console.log(err);
        });
    }
    $scope.toLogin = function () {
        $window.location = "/#/login";
    }
    $scope.register = {
        "phone": "",
        "code": "",
        "password": "",
        "confirmPassword": ""
    }
    $scope.verifyCode = "";
    $scope.registerAccount = function () {
        user.registerAccount($scope.register).then(function (data) {
            console.log("注册完成返回的结果" + JSON.stringify(data));
            // activeEmailCode = data.activationCode;
            //注册成功后，发邮件；
//             user.sendActiveEmail($scope.registerUser, activeEmailCode).then(function (data) {
// //                 console.log(data);
// //                 console.log("邮件发送成功");
//                 changeCode();//改变验证码;
//                 angular.element("#registerSuccess").modal("show");
//             }, function (err) {
//                 swal("", "用户激活邮件发送失败!", "error");
// //                 console.log("用户激活邮件发送失败"+err);
//             })
        }, function (err) {
            console.log(err);
        });
    }

});
/***************************************账号激活模块*********************************************/
consoleApp.controller("activeAccountCtrl", function ($scope, $cookies, $window, user, $location) {
    var activeCode = $location.search().activeCode;
//    console.log("账号激活时的token:"+activeCode);
    user.activeEmail(activeCode).then(function (data) {
//           console.log("controller中:"+data);
        $scope.user = null;
        delete $cookies.user;
//           $window.location="/#/changeEmail/finishEmail";
        $window.location = "/#/login";
    });
});
/***************************************邮箱修改并激活新邮箱*********************************************/
consoleApp.controller("activeEmailCtrl", function ($scope, $cookies, $window, user, $location) {
    var activeCode = $location.search().activeCode;
//    console.log("账号激活时的token:"+activeCode);
    user.activeEmail(activeCode).then(function (data) {
//           console.log("controller中:"+data);
        $scope.user = null;
        delete $cookies.user;
        $window.location = "/#/changeEmail/finishEmail";
    });
});

/***************************************忘记密码**************************************************/
consoleApp.controller("findPwdCtrl", function ($scope, $window, user) {
    $scope.nameOrEmail = ""
    //验证用户名或邮箱是否存在，存在即发送邮件给该邮箱；
    $scope.findPwdSubmit = function () {
//      console.log("页面拿到的email为："+$scope.nameOrEmail);
        var bool = isEmail($scope.nameOrEmail);
        if (!bool) {
            swal("", "邮箱格式不正确!", "error");
        }
        if (bool) {
            user.verifyEmail($scope.nameOrEmail).then(function (data) {
                _showMask();
                var findPwdToken = data.token;
                var email = data.email;
//              console.log("用户的email: "+email+"token="+findPwdToken);
                //验证邮箱存在后给邮箱发送重置密码的邮件；
                user.sendResetPwdEmail(email, findPwdToken).then(function (data) {
//                  console.log(data);
//                  console.log("重置密码邮件发送成功");
                    _hideMask();
                    angular.element("#reSendEmailSuccess").modal("show");
                }, function (err) {
                    _hideMask();
                    swal("", "重置密码邮件发送失败", "error");
                })
//              console.log("存在该邮箱");
            }, function (error) {
                _hideMask();
                swal("", "该邮箱不存在", "error");
            });
        }
    }
})
/********************重置密码*******************************/
consoleApp.controller("resetPwdCtrl", function ($scope, $window, user, $location) {
    $scope.pwd1 = "";
    $scope.pwd2 = "";

    $scope.resetPwdSubmit = function () {
//        console.log("pwd1"+$scope.pwd1+"pwd2"+$scope.pwd2);
        var emailToken = $location.search().emailToken;
//        console.log("从url中拿到的参数为："+emailToken);
        if ($scope.pwd1 == $scope.pwd2) {
            $scope.newPassword = $scope.pwd2;
            user.resetPwd($scope.newPassword, emailToken).then(function (data) {
                if (data) {
//                    console.log("重置密码成功-----"+data);
                    angular.element("#Success").modal("show");
                    setTimeout("window.location.href='/#/login'", 3000);
                } else {
                    swal("", "重置密码失败", "error");
                }
            }, function (err) {
                swal("", "重置密码失败", "error");
            });
        } else {
            swal("", "两次密码不一致", "error");
        }
    }


});
/***********************************账号安全*****************************************/
consoleApp.controller("userAccountSafeCtrl", function ($scope, $window, $cookies, account, user) {
    initUser();
    //修改密码；
    $scope.changeAccountPwd = {
        "oldPwd": "",
        "newPwd": "",
        "centrifyPwd": ""
    }
    //修改邮箱时验证旧邮箱；
    $scope.verifyEmail = {
        "oldEmail": "",
        "verifyCode": ""
    }
    //修改邮箱时输入新邮箱；
    $scope.newEmail = "";
    //登录后的用户；
    $scope.loginUser = JSON.parse($cookies.user);//cookies中的user;

    $scope.safeEmail = styleEmail($scope.loginUser.email);//账号安全页面显示的用户的email;

//    console.log("cookie中的user为："+JSON.stringify($scope.loginUser));
    $scope.xingEmail = styleEmail($scope.loginUser.email);//转换邮箱的格式；
    /********************修改开发者密码********************************/
    $scope.changeAccountPwdSubmit = function () {
//      console.log("从页面拿到的密码组合为："+JSON.stringify($scope.changeAccountPwd)+"cookies中的密码为："+$cookies.user);
        $scope.user = JSON.parse($cookies.user);
//      console.log("userId====="+$scope.user.id+"//"+typeof($scope.user));

        if ($scope.changeAccountPwd.oldPwd != $scope.user.plainPassword) {
            swal("", "当前密码不正确", "error");
        } else if (isPwd($scope.changeAccountPwd.newPwd) == false) {
            swal("", "密码格式不正确(应为6-12位字母数字或下划线的组合)！", "error");
        } else if ($scope.changeAccountPwd.newPwd == $scope.user.plainPassword) {
            swal("", "改密码已经被使用,请重新输入！", "error");
        } else if ($scope.changeAccountPwd.newPwd != $scope.changeAccountPwd.centrifyPwd) {
            swal("", "两次密码不一致！", "error");
        } else {
            account.changePwd($scope.user.id, $scope.changeAccountPwd.oldPwd, $scope.changeAccountPwd.centrifyPwd).then(function (data) {
                if (data) {
//                  console.log(data+"修改密码成功");
                    swal("", "恭喜您，修改密码成功!", "success");
                    setTimeout("window.location.href='/#/loginOut'", 2000);
//                  $window.location="/#/loginOut";
                } else {
                    swal("", "修改密码失败！", "error");
//                  console.log("修改密码失败");
                }
            }, function (err) {
                swal("", "修改密码失败！", "error");
//              console.log(err+"修改密码失败");
            });
        }

    }
    /***************************修改邮箱********************************/
    /********************修改邮箱第一步——验证当前输入的邮箱****************************/
    $scope.verifyEmailSubmit = function () {
//     console.log("页面的输入的内容："+JSON.stringify($scope.verifyEmail));
//      changeCode();//改变验证码；
        account.checkInputEmail($scope.verifyEmail, $scope.loginUser.id).then(function (data) {
//         console.log("邮箱正确");
            $window.location = "/#/changeEmail/inputNewEmail"
        }, function (error) {
            console.log(error);
        })
    }
    /********************修改邮箱第二步——输入新邮箱并发送账号激活邮件****************************/
    $scope.inputNewEmailSubmit = function () {
        var userId = $scope.loginUser.id;
        var bool = isEmail($scope.newEmail);
//      console.log("页面的新邮箱为："+$scope.newEmail+"----userid="+userId);
        if ($scope.newEmail == $scope.loginUser.email) {
            swal("", "邮箱不能与原邮箱相同！", "error");
        }
        if (!bool) {
            swal("", "邮箱格式不正确！", "error");
        }
        if (bool && $scope.newEmail != $scope.loginUser.email) {
            account.registNewEmail(userId, $scope.newEmail).then(function (data) {
                var activeEmailCode = data;
                var newUser = {
                    "loginName": $scope.loginUser.loginName,
                    "plainPassword": $scope.loginUser.passWord,
                    "email": $scope.newEmail
                }
//             console.log(activeEmailCode+"0000000+++"+JSON.stringify(newUser));
                //发送邮箱激活邮件；
                user.sendActiveEmail(newUser, activeEmailCode).then(function (data) {
//                 console.log(data);
//                 console.log("邮件发送成功");
//                 console.log("successNewEmail="+$scope.successNewEmail);
                    $window.location = "/#/changeEmail/getEmail";
                }, function (err) {
                    swal("", "用户激活邮件发送失败！", "error");
                });

            }, function (error) {
                swal("", "该邮箱已经被使用！", "error");
//             console.log("失败");
            });
        }

    }
    getNewEmailStyle = function () {
        $scope.successNewEmail = styleEmail($scope.newEmail);//转换邮箱的格式；
//       alert($scope.successNewEmail);

    }
    //重发邮件；
    $scope.nameOrEmail = "";//定义重发邮件时输入的用户民或者邮箱;
    $scope.reSendEmailSubmit = function () {
//        console.log("用于验证的用户名："+$scope.nameOrEmail);
        user.verifyEmail($scope.nameOrEmail).then(function (data) {
            _showMask();
            var findPwdToken = data.token;
            var email = data.email;
//            console.log("用户的email: "+email+"token="+findPwdToken);
            //验证邮箱存在后给邮箱发送用户激活邮件；
            user.reSendActiveEmail(email, findPwdToken).then(function (data) {
//                console.log(data);
                _hideMask();
                swal("", "重新激活邮件发送成功!", "success");
//                console.log("重新激活邮件发送成功");
                angular.element("#reSendEmail").modal("hide");
                angular.element("#reSendEmailSuccess").modal("show");
            }, function (err) {
                _hideMask();
                swal("", "重新激活邮件发送失败!", "error");
//                console.log("重新激活邮件发送失败"+err);
            })
//            console.log("存在该邮箱");
        }, function (error) {
            _hideMask();
            swal("", "该邮箱不存在!", "error");
//            console.log(error+"该邮箱不存在");
        });
    }

});
/**********************************基本资料*******************************************/
consoleApp.controller("accountCtrl", function ($scope, $window, $cookies, account) {
    $scope.user = JSON.parse($cookies.user);
//       var userId=$scope.user.userId;
    var userId = $scope.user.id;
//    console.log("userID="+userId);
    account.getAccountInfo(userId).then(function (data) {
        //$scope.userInfo = data;
        $scope.userInfo.email = styleEmail($scope.userInfo.email);
//        console.log("controller:"+JSON.stringify($scope.userInfo));
    }, function (error) {
        console.log(error);
    });
});
/*
 *
 *
 * touchc
 *
 *
 */


/*******************************touchc插件应用模块**************************************************/
consoleApp.controller("touchcCtrl", function ($scope, $window, $cookies, $log, TouchC) {
    /*******************************获取应用列表;************/
    $scope.user = JSON.parse($cookies.user);
    var uuid = $scope.user.uuid;//用户的唯一标识uuid；

    $scope.TouchCAppList = function (page, pageSize) {
        _showMask();
        TouchC.getPageOfTouchCAppList(uuid, page, pageSize).then(function (data) {
//            console.log("controller中normal拿到的结果:"+JSON.stringify(data));
            $scope.TouchcApps = data.content;//获得app的数组列表；
            /****ui-bootstrap方式分页*****/
            $scope.allItems = data.totalElements;//总个数；
            $scope.pages = data.totalPages;//总页数；
            $scope.totalItems = data.totalElements;//20;
            $scope.currentPage = page;//page;
            $scope.pageSize = pageSize;
            $scope.maxSize = 10;
            //当页数改变以后，需要重新获取\
            $scope.pageChanged = function () {
//                    console.log("应用列表页码改变");
                $scope.TouchCAppList($scope.currentPage, $scope.pageSize);
            };
            _hideMask();
        }, function (error) {
            console.log(error);
        });
    }
    $scope.TouchCAppList(1, 10);//默认显示出应用列表；
    /*************创建的touchc应用app；****************/
    $scope.TouchCMobileApp = {
        "name": "",
        "description": "",
        "platform": "",//平台类型，ios/android
        "appType": "PLUGIN"
    }
    /************************创建touchc应用*****************************/
    $scope.TouchCAppCreateSubmit = function () {
        _showMask();
//        console.log("从页面拿取的应用列表为："+JSON.stringify($scope.TouchCMobileApp));
        TouchC.addTouchCApp($scope.TouchCMobileApp, uuid).then(function (data) {
            if (data == false) {
                swal("", "创建touchc失败", "error");
//                console.log("创建失败");
            } else {
//                console.log("controller中创建应用结果成功:"+JSON.stringify(data));
                angular.element("#touchcModal").modal("hide");
                $scope.TouchCAppList(1, 10);//默认显示出应用列表；
            }
        }, function (error) {
            console.log(error);
        });
    }


});

/*******************************touchc插件 单个应用模块**************************************************/
consoleApp.controller("signalTouchcCtrl", function ($scope, $window, $cookies, $log, TouchC, user) {
    $scope.user = JSON.parse($cookies.user);
    var uuid = $scope.user.uuid;//用户的唯一标识uuid；
    var wholeTouchcVersions = "";
    var touchcVersionId = "";//touchc应用中定义version的id;
    var deleteTouchcAppMark = 0;//判断是否删除touchc应用；

    $scope.changeOtherVersion = function () {
//        alert("请先选择另外一个版本进行发布！");
        swal("", "只有先选择另一个版本进行发布，才能禁用该版本！", "error");
    }
    /*****************************检测当前选中的app是否变化；***************************/
    $scope.$watchCollection('selectionTouchc', function () {
        $scope.$broadcast('touchcAppIdChanged');
    }, true);
    $scope.$on('touchcAppIdChanged', function () {
        $scope.setTouchcAppId($scope.selectionTouchc);
//        console.log("监测到变化目前的appId为:"+$scope.selectionTouchc);
        getTouchcAppInfo($scope.selectionTouchc);
        getTouchcAppVersionsList($scope.selectionTouchc, 1, 10);
    });

    /******************TouchC 应用详情Header中显示所有的touchC Apps****************/
    getAllTouchcAppOfHeader = function () {
        TouchC.getAllTouchCApps(uuid).then(function (data) {
            $scope.parentObj.allTouchcApps = data;
            if (deleteTouchcAppMark == 1 || deleteTouchcAppMark == 2) {
                if ($scope.parentObj.allTouchcApps.length != 0) {
//                    console.log($scope.parentObj.allTouchcApps[0].id);
                    $scope.setTouchcAppId($scope.parentObj.allTouchcApps[0].id);
                }
                deleteTouchcAppMark = 0;
            }
//            console.log("所有不分页列表: "+JSON.stringify($scope.parentObj.allTouchcApps));
        }, function (err) {
            console.log(err);
        });
    };
    getAllTouchcAppOfHeader();


    /*********************获取应用的基本信息*********************/
    $scope.upTouchcApp = {//touchc单个信息更新的信息;
        id: "",
        name: "",
        number: "",
        icon: "",
        description: "",
        platform: "",
        appType: ""
    }
    getTouchcAppInfo = function (appId) {
        _showMask();
//        console.log("获取应用信息："+appId);
        TouchC.getTouchcSignalAppInfo(appId).then(function (data) {
            $scope.signalTouchcApp = data;//单个应用的基本信息；
            //给更新的应用赋值；
            $scope.upTouchcApp.id = $scope.signalTouchcApp.id;
            $scope.upTouchcApp.name = $scope.signalTouchcApp.name;
            $scope.upTouchcApp.number = $scope.signalTouchcApp.number;
            $scope.upTouchcApp.icon = $scope.signalTouchcApp.icon;
            $scope.upTouchcApp.description = $scope.signalTouchcApp.description;
            $scope.upTouchcApp.platform = $scope.signalTouchcApp.platform;
            $scope.upTouchcApp.appType = $scope.signalTouchcApp.appType;
//            console.log("应用详情:"+JSON.stringify($scope.signalTouchcApp));
            _hideMask();
        }, function (error) {
            console.log(error);
        });
    }
    getTouchcAppInfo($scope.selectionTouchc);

    /*********************更新应用的基本信息*********************/
    $scope.updateTouchcAppSubmit = function () {
        _showMask();
        var appId = $scope.selectionTouchc;
        $scope.upTouchcApp.icon = $("#touchcAppIconDownloadUrl").val();
//        console.log("更新的app为："+JSON.stringify($scope.upNormalApp));
        TouchC.updateTouchcApp($scope.upTouchcApp, appId).then(function (data) {
//            console.log(JSON.stringify(data));
            angular.element("#editTouchcAppModal").modal("hide");
            getTouchcAppInfo(appId);
        }, function (error) {
            console.log(error);
        });
    }


    /******************************************版本**************************************/
    /******************************************版本**************************************/
    /******************************************版本**************************************/
    /******************************定义版本对象；*********************/
    $scope.appTouchcVersion = {
        "id": "",
        "name": "",
        "number": "",
        "downloadUrl": "",
        "description": "",
        "platform": "",//最低支持的系统版本；
        "entrance": ""
    }
    /****************************创建应用版本***************************************/
    $scope.TouchcAppVersionCreateSubmit = function () {
//        _showMask();
        //确定版本的下载地址;
        $scope.appTouchcVersion.downloadUrl = $("#appTouchcVersionDownloadUrl").val();
//        console.log("页面中拿到的android版本对象内容是："+JSON.stringify($scope.appTouchcVersion));
        var appId = $scope.selectionTouchc;
        TouchC.addTouchcVersion(appId, $scope.appTouchcVersion).then(function (data) {
            angular.element("#versionCreateModal").modal("hide");
            getTouchcAppVersionsList(appId, 1, 10);
        }, function (error) {
            console.log(error);
        });

    }
    /**********************************获取应用的版本列表；*************************/
    getTouchcAppVersionsList = function (appId, page, pageSize) {
        _showMask();
//        console.log("当前appId为："+appId+"==="+page);
        TouchC.getTouchcAppVeriosnList(appId, page, pageSize).then(function (data) {
            $scope.touchcVersions = data.content;
//          wholeVersions=$scope.versions;
//            console.log("应用的版本是：" + JSON.stringify($scope.touchcVersions));
            $scope.allItems = data.totalElements;
            $scope.pages = data.totalPages;
            //分页;
            $scope.totalItems = data.totalElements;//20;
            $scope.currentPage = page;//page;
            $scope.pageSize = pageSize;
            $scope.maxSize = 10;
            //当页数改变以后，需要重新获取;
            $scope.pageChanged = function () {
//                console.log($scope.currentPage);
                getTouchcAppVersionsList(appId, $scope.currentPage, $scope.pageSize);
            };
            _hideMask();
        }, function (err) {
            console.log(err);
        })
    }
    getTouchcAppVersionsList($scope.selectionTouchc, 1, 10);
    /*********************************删除touchc应用*******************************/
    $scope.TouchCAppDeleteSubmit = function () {
        _showMask();
        var appId = $scope.selectionTouchc;
//       console.log("uuid:"+uuid+"appId:"+appId);
        TouchC.deleteApp(uuid, appId).then(function (data) {
//           console.log(data+"删除应用成功");
            angular.element("#appTouchcDeleteModal").modal("hide");

            //重新获取touchc应用列表；
            deleteTouchcAppMark = 1;
            getAllTouchcAppOfHeader();
            _hideMask();
        }, function (err) {
            console.log(err);
        })
    }
    /*************************获取touchc应用版本的versionId****************************************************/
    $scope.getTouchcVersionId = function (versionId, version) {
        touchcVersionId = versionId;
//        console.log("全局的versionId为："+touchcVersionId);
        $scope.appTouchcVersion.id = version.id;
        $scope.appTouchcVersion.name = version.name;
        $scope.appTouchcVersion.number = version.number;
        $scope.appTouchcVersion.downloadUrl = version.downloadUrl;
        $scope.appTouchcVersion.description = version.description;
        $scope.appTouchcVersion.entrance = version.entrance;
        $scope.appTouchcVersion.platform = version.platform;
    }
    /***************************发布touchc版本****************************************/
    $scope.publishTouchcVersion = function (touchcVersionId) {
        _showMask();
        var appId = $scope.selectionTouchc;
//      console.log(appId);
        TouchC.publishTouchcVerison(touchcVersionId).then(function (data) {
//          console.log(data);
            getTouchcAppVersionsList(appId, 1, 10);
        }, function (err) {
            console.log(err);
        });
    }

    /***************************取消发布touchc版本****************************************/
    $scope.onPublishTouchcVersion = function (touchcVersionId) {
        _showMask();
//        var appId=$scope.selectionAppId;
        var appId = $scope.selectionTouchc;
//    console.log(appId);
        TouchC.unPublishTouchcVerison(touchcVersionId).then(function (data) {
//        console.log(data);
            getTouchcAppVersionsList(appId, 1, 10);
        }, function (err) {
            console.log(err);
        });
    }
    /***************************启用和禁用touchc版本****************************************/
    $scope.enableTouchcVersion = function (touchcVersionId) {
        _showMask();
        var versionId = touchcVersionId;
        var appId = $scope.selectionTouchc;
//    console.log("版本的id为："+versionId);
        TouchC.enableTouchcVersion(versionId).then(function (data) {
//        console.log(data);
            getTouchcAppVersionsList(appId, 1, 10);
        }, function (err) {
            console.log(err);
        });
    }
    /****************************批量删除touchc版本****************************************************/
    $scope.touchcVersionDeleteSubmit = function () {
        _showMask();
        var deleteVersionIds = document.getElementsByName("versionCheckbox");
        var versionStr = "";
        var versionIds = "";
        var appId = $scope.selectionTouchc;
//        var appId=$scope.selectionAppId;
        for (var i = 0; i < deleteVersionIds.length; i++) {
            if (deleteVersionIds[i].checked == true) {
                versionStr += deleteVersionIds[i].value + ",";
            }
        }
        versionIds = versionStr.substring(0, versionStr.length - 1);
//        console.log("获得要删除的数组为："+versionIds+"长度："+versionIds.length);
        TouchC.deleteTouchcVersion(versionIds, appId).then(function (data) {
//            console.log(data);
            angular.element("#deleteVersion").modal("hide");
            getTouchcAppVersionsList(appId, 1, 10);
        }, function (err) {
            console.log(err);
        });
    };

    /************************************转让touchc应用***********************************/
    $scope.receiver = '';//接收者的用户名或者邮箱；
    $scope.transferTouchcAppSubmit = function () {
        _showMask();
        var appId = $scope.selectionTouchc;
//        console.log("接受者："+$scope.receiver+"  //appId"+appId);
        //先验证是否存在该用户,存在返回用户的邮箱；
        user.hasUser($scope.receiver).then(function (data) {
            var receiverEmail = data.email;
            TouchC.transferTouchcApp(appId, $scope.receiver).then(function (data) {
                //转让成功的话，给接收者发送转让成功邮件；
//                      console.log("接受者返回的邮箱："+receiverEmail);
                user.sendTransferEmail(receiverEmail).then(function (data) {
//                          console.log(data);
//                          console.log("邮件发送成功");
                    swal("", "转让邮件发送成功!", "success");
                    angular.element("#transferTouchcApp").modal("hide");
                    deleteTouchcAppMark = 2;
                    getAllTouchcAppOfHeader();
                    _hideMask();
                }, function (err) {
                    _hideMask();
                    swal("", "邮件发送失败", "error");
                });

            }, function (err) {
                _hideMask();
                swal("", "转让应用失败", "error");
//                      alert("转让失败："+err);
            })

        }, function (err) {
            console.log(err);
        });
    };
    /*******************************编辑touchc版本信息************************************************/
    $scope.TouchcAppVersionEditSubmit = function () {
        _showMask();
        var versionId = touchcVersionId;
        var appId = $scope.selectionTouchc;
        $scope.appTouchcVersion.id = versionId;
        $scope.appTouchcVersion.downloadUrl = $("#appVersionEditDownloadUrl").val();
//        console.log("版本的id:"+versionId+"-"+touchcVersionId+"--appId:"+appId);
//        console.log("页面中拿到的touchc版本对象内容是："+JSON.stringify($scope.appTouchcVersion));

        TouchC.updateTouchcVersion(appId, versionId, $scope.appTouchcVersion).then(function (data) {
            angular.element("#versionEditModal").modal("hide");
            getTouchcAppVersionsList(appId, 1, 10);
        }, function (error) {
            console.log(error);
        });
    }
});

