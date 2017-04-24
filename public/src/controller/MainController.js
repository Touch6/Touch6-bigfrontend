var consoleApp = angular.module("consoleApp.controllers", [
    'consoleApp.services',
    'consoleApp.directives',
    'ngCookies',
    'ui.bootstrap'
//    'tm.pagination'
]);


/**********************************整体body模块**************************************/
consoleApp.controller("MainController", function ($rootScope, $scope, $window, $cookies, modules) {
    //加载公共模块
    $scope.loadCommonModule = function () {
        console.log("加载公共模块")
        modules.loadCommonModule().then(function (data) {
            $rootScope.moduleList = data.object;
        }, function (err) {
            console.log("模块加载失败" + err);
        });
    }
    $scope.loadCommonModule();

    console.log("MainController->$scope.loginUser:" + $cookies.user);
    if ($cookies.user) {
        $rootScope.notLogin = false;
    } else {
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
consoleApp.controller("ToutiaoController", function ($rootScope, $scope, $window, toutiao, modules, $cookies) {

    $scope.toutiaoList = function (page, pageSize) {
        _showMask();
        //自动获取头条标题信息
        toutiao.overview(page, pageSize).then(function (data) {
            var pageObj = data.object;
            console.log("头条加载成功");
            $scope.toutiaos = pageObj.list;
            $scope.currentPage = page;
            $scope.pageSize = pageSize;
            $scope.total = pageObj.total;
            $scope.pages = pageObj.pages;
            $scope.maxSize = 20;
            //当页数改变以后，需要重新获取\
            $scope.changePage = function () {
                $scope.toutiaoList($scope.currentPage, $scope.pageSize);
            };
            _hideMask();
        }, function (err) {
            console.log("头条加载失败" + err);
        });
    }
    $scope.toutiaoList(1, 10);//默认获取10条
    // $scope.pageModules = function (page, pageSize) {
    //     modules.pageModules(page, pageSize).then(function (data) {
    //         var pageObj = data.object;
    //         $scope.pageModuleList = pageObj.list;
    //         $scope.moduleOfCurrentPage = page;
    //         $scope.moduleOfPageSize = pageSize;
    //         $scope.moduleOfTotal = pageObj.total;
    //         $scope.moduleOfPages = pageObj.pages;
    //         $scope.moduleOfMaxSize = 20;
    //         //当页数改变以后，需要重新获取
    //         $scope.changeModulePage = function () {
    //             $scope.pageModules($scope.moduleOfCurrentPage, $scope.moduleOfPageSize);
    //         };
    //     }, function (err) {
    //         console.log("模块列表加载失败" + err);
    //     });
    // }
    // $scope.pageModules(1, 10);
});
/**********************************工具路由**************************************/
consoleApp.controller("ToolsController", function ($rootScope, $scope, $window, tools, $cookies) {

    //定义变量
    $scope.src = '';
    $scope.format = '0';
    $scope.dst = '';
    $scope.type = '';
    $scope.result = '';
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
                $scope.result = data.object;
            }, function (err) {
                console.log("格式转换失败" + err);
            });
    }

    //定义变量
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
                $scope.result = data.object;
            }, function (err) {
                console.log("编解码失败" + err);
            });
    }

    $scope.dencryptInput = {
        dataFrom: '',
        scale: 'plaintext',
        content: '',
        arithmetic: 'MD5BASE64',
        salt: '',
        method: 'encrypt'
    };
    $scope.dencrypt = function () {
        tools.dencrypt($scope.dencryptInput)
            .then(function (data) {
                console.log("加解密返回:" + JSON.stringify(data.object));
                $scope.output = data.object;
            }, function (err) {
                console.log("加解密失败" + err);
            });
    }
});

/**********************************文章路由**************************************/
consoleApp.controller("ArticleController", function ($rootScope, $scope, $window, article, $cookies, $location, $stateParams) {
    var uid = $cookies.uid;
    /*******************************start*********************************/
    $scope.articleList = function (page, pageSize) {
        _showMask();
        //自动获取头条标题信息
        article.articleList('', page, pageSize).then(function (data) {
            var pageObj = data.object;
            $scope.articles = pageObj.list;
            $scope.currentPage = page;
            $scope.pageSize = pageSize;
            $scope.total = pageObj.total;
            $scope.pages = pageObj.pages;
            $scope.maxSize = 20;
            //当页数改变以后，需要重新获取\
            $scope.changePage = function () {
                $scope.articleList($scope.currentPage, $scope.pageSize);
            };
            _hideMask();
        }, function (err) {
            console.log("文章加载失败" + err);
        });
    };
    //指定页面加载文章列表
    if ($location.path() == '/article/technology') {
        $scope.articleList(1, 10);//默认获取10条
    }
    /*******************************end*********************************/
    /*******************************start*********************************/
    $scope.typeList = function () {
        article.typeList()
            .then(function (data) {
                $scope.types = data.object;
            }, function (err) {
                console.log(err)
            });
    }
    //指定页面加载文章类型
    if ($location.path() == '/article/write') {
        $scope.typeList();
    }
    /*******************************end*********************************/
    /*******************************start*********************************/
    //第一级
    $scope.category1List = function () {
        article.categoryList('')
            .then(function (data) {
                $scope.categories1 = data.object;
            }, function (err) {
                console.log(err)
            });
    }
    //指定页面加载文章类型
    if ($location.path() == '/article/write') {
        $scope.category1List();
    }
    //第二级
    $scope.category2List = function (parentCategory) {
        article.categoryList(parentCategory)
            .then(function (data) {
                $scope.categories2 = data.object;
            }, function (err) {
                console.log(err)
            });
    }
    $scope.categoryChange = function () {
        $scope.category2List(($scope.art).category1.categoryCode);
    }
    /*******************************end*********************************/
    /*******************************start*********************************/
    $scope.writeArticle = function () {
        _showMask();
        ($scope.art).type = ($scope.art).type.type;
        ($scope.art).category = ($scope.art).category.categoryCode;
        ($scope.art).uid = uid;
        article.write($scope.art)
            .then(function (data) {
                console.log("新保存的文章:" + JSON.stringify(data));
                var art = data.object;
                ($scope.art).id = art.id;
                $window.location = '/article/detail/' + art.id;
            }, function (err) {
                console.log(err)
            });
        _hideMask();
    }
    /*******************************end*********************************/
});
/**********************************文章路由**************************************/
consoleApp.controller("ArticleDetailController", function ($rootScope, $scope, $window, article, $cookies, $cookieStore, $location, $stateParams) {
    $scope.approval = {
        'who': '',
        'objectId': '',
        'targetObject': ''
    };
    /*******************************start*********************************/
    $scope.articleDetail = function (id) {
        _showMask();
        article.articleDetail(id)
            .then(function (data) {
                $scope.articleDetailInfo = data.object;
                $scope.commentList(data.object.id);
            }, function (err) {
                console.log(err)
            });
        _hideMask();
    }
    //指定页面加载文章详情
    $scope.articleDetail($stateParams.articleId);
    /*******************************end*********************************/
    /*******************************start*********************************/
    $scope.commentList = function (articleId) {
        article.commentList(articleId)
            .then(function (data) {
                $scope.comments = data.object;
            }, function (err) {
                console.log(JSON.stringify(err));
            });
    }
    /*******************************end*********************************/

    /*******************************start*********************************/
    $scope.articleApproval = function (articleId) {
        var uid = $cookies.uid;
        if (!uid) {
            swal('', '您还未登录!', 'error')
            return;
        }
        $scope.approval = {
            'who': uid,
            'objectId': articleId,
            'targetObject': 'ARTICLE'
        };
        article.approval($scope.approval)
            .then(function (data) {
                var info = $scope.articleDetailInfo;
                info.approvalAmount = data.object;
                $scope.articleDetailInfo = info;
            }, function (err) {
                if (err.code = '200001') {
                    swal('', '您已点过赞了!', 'error')
                }
            });
    }
    /*******************************end*********************************/
    /*******************************start*********************************/
    $scope.articleOppose = function (articleId) {
        var uid = $cookies.uid;
        if (!uid) {
            swal('', '您还未登录!', 'error')
            return;
        }
        $scope.oppose = {
            'who': uid,
            'objectId': articleId,
            'targetObject': 'ARTICLE'
        };
        article.oppose($scope.oppose)
            .then(function (data) {
                var info = $scope.articleDetailInfo;
                info.opposeAmount = data.object;
                $scope.articleDetailInfo = info;
            }, function (err) {
                if (err.code = '200001') {
                    swal('', '您已反对过了!', 'error')
                }
            });
    }
    /*******************************end*********************************/
});

/**********************************系统设置>模块管理**************************************/
consoleApp.controller("ModuleController", function ($rootScope, $scope, $window, $cookies, $cookieStore, modules) {
    $scope.addModuleInput = {
        name: '',
        className: '',
        attrLink: '',
        sort: ''
    }
    $scope.updateModuleInput = {
        moduleId: '',
        name: '',
        className: '',
        attrLink: '',
        sort: ''
    }
    $scope.moduleObject = {
        pageModules: function (page, pageSize) {
            modules.pageModules(page, pageSize).then(function (data) {
                var pageObj = data.object;
                $scope.moduleList = pageObj.list;
                $scope.currentPage = page;
                $scope.pageSize = pageSize;
                $scope.total = pageObj.total;
                $scope.pages = pageObj.pages;
                $scope.maxSize = 20;
                //当页数改变以后，需要重新获取
                $scope.changeModulePage = function () {
                    $scope.moduleObject.pageModules($scope.currentPage, $scope.pageSize);
                };
            }, function (err) {
                console.log("模块列表加载失败" + err);
            });
        },
        loadSelectModuleList: function () {
            modules.selectList().then(function (data) {
                $scope.moduleSelectList = data.object;
            }, function (err) {
                console.log("模块列表加载失败" + err);
            });
        },
        add: function () {
            if (!$scope.addModuleInput.sort) {
                //不选默认排序0
                $scope.addModuleInput.sort = 1;
            } else {
                $scope.addModuleInput.sort = $scope.addModuleInput.sort + 1;
            }
            modules.addModule($scope.addModuleInput)
                .then(function (data) {
                    var mo = data.object;
                    swal('', '模块名:' + mo.name, 'success');
                    $scope.moduleObject.pageModules($scope.currentPage, $scope.pageSize);
                }, function (err) {
                    $scope.addSuccess = false;
                    console.log(err)
                });
        },
        delete: function (moduleId) {
            swal(deleteOptions, function () {
                _showMask();
                modules.delete(moduleId)
                    .then(function (data) {
                        $scope.moduleObject.pageModules($scope.currentPage, $scope.pageSize);
                        _hideMask();
                    }, function (err) {
                        console.log(err);
                        _hideMask();
                    });
            })
        },
        view: function (moduleId) {
            _showMask();
            modules.viewDetail(moduleId)
                .then(function (data) {
                    $scope.module = data.object;
                    _hideMask();
                }, function (err) {
                    console.log(err);
                    _hideMask();
                });
        },
        openUpdateModal: function (moduleId) {
            $scope.updateModuleInput = {};
            _showMask();
            modules.viewDetail(moduleId)
                .then(function (data1) {
                    $scope.updateModuleInput = data1.object;
                    //加载列表
                    $scope.moduleObject.loadSelectModuleList();
                    _hideMask();
                }, function (err) {
                    console.log(err);
                    _hideMask();
                });
        },
        edit: function () {
            _showMask();
            modules.updateModule($scope.updateModuleInput)
                .then(function (data) {
                    var mo = data.object;
                    swal('', '模块名:' + mo.name, 'success');
                    $scope.moduleObject.pageModules($scope.currentPage, $scope.pageSize);
                    _hideMask();
                }, function (err) {
                    $scope.editSuccess = false;
                    console.log(err);
                    _hideMask();
                });
        },
        moveTop: function (moduleId) {
            _showMask();
            modules.moveTop(moduleId)
                .then(function (data) {
                    $scope.moduleObject.pageModules($scope.currentPage, $scope.pageSize);
                    _hideMask();
                }, function (err) {
                    console.log(err);
                    _hideMask();
                });
        },
        moveUp: function (moduleId) {
            _showMask();
            modules.moveUp(moduleId)
                .then(function (data) {
                    $scope.moduleObject.pageModules($scope.currentPage, $scope.pageSize);
                    _hideMask();
                }, function (err) {
                    console.log(err);
                    _hideMask();
                });
        },
        moveDown: function (moduleId) {
            _showMask();
            modules.moveDown(moduleId)
                .then(function (data) {
                    $scope.moduleObject.pageModules($scope.currentPage, $scope.pageSize);
                    _hideMask();
                }, function (err) {
                    console.log(err);
                    _hideMask();
                });
        }
    }
    $scope.moduleObject.pageModules(1, 5);
});

/**********************************系统设置>菜单管理**************************************/
consoleApp.controller("MenuController", function ($rootScope, $scope, $window, $cookies, $cookieStore, menu) {
    $scope.addMenuInput = {
        name: '',
        className: '',
        attrLink: '',
        sort: ''
    }
    $scope.updateMenuInput = {
        menuId: '',
        name: '',
        className: '',
        attrLink: '',
        sort: ''
    }
    $scope.menuObject = {
        pageMenus: function (page, pageSize) {
            menu.pageMenus(page, pageSize).then(function (data) {
                var pageObj = data.object;
                $scope.menuList = pageObj.list;
                $scope.currentPage = page;
                $scope.pageSize = pageSize;
                $scope.total = pageObj.total;
                $scope.pages = pageObj.pages;
                $scope.maxSize = 20;
                //当页数改变以后，需要重新获取
                $scope.changePage = function () {
                    $scope.menuObject.pageMenus($scope.currentPage, $scope.pageSize);
                };
            }, function (err) {
                console.log("菜单列表加载失败" + err);
            });
        },
        loadSelectMenuList: function () {
            menu.selectList().then(function (data) {
                $scope.menuSelectList = data.object;
            }, function (err) {
                console.log("菜单列表加载失败" + err);
            });
        },
        add: function () {
            if (!$scope.addMenuInput.sort) {
                //不选默认排序0
                $scope.addMenuInput.sort = 1;
            } else {
                $scope.addMenuInput.sort = $scope.addMenuInput.sort + 1;
            }
            menu.addMenu($scope.addMenuInput)
                .then(function (data) {
                    var mo = data.object;
                    swal('', '菜单名:' + mo.name, 'success');
                    $scope.menuObject.pageMenus($scope.currentPage, $scope.pageSize);
                }, function (err) {
                    $scope.addSuccess = false;
                    console.log(err)
                });
        },
        delete: function (menuId) {
            swal(deleteOptions, function () {
                _showMask();
                menu.delete(menuId)
                    .then(function (data) {
                        $scope.moduleObject.pageMenus($scope.currentPage, $scope.pageSize);
                        _hideMask();
                    }, function (err) {
                        console.log(err);
                        _hideMask();
                    });
            })
        },
        view: function (menuId) {
            _showMask();
            menu.viewDetail(menuId)
                .then(function (data) {
                    $scope.menu = data.object;
                    _hideMask();
                }, function (err) {
                    console.log(err);
                    _hideMask();
                });
        },
        openUpdateModal: function (menuId) {
            $scope.updateMenuInput = {};
            _showMask();
            menu.viewDetail(menuId)
                .then(function (data1) {
                    $scope.updateMenuInput = data1.object;
                    //加载列表
                    $scope.menuObject.loadSelectMenuList();
                    _hideMask();
                }, function (err) {
                    console.log(err);
                    _hideMask();
                });
        },
        edit: function () {
            _showMask();
            menu.updateMenu($scope.updateMenuInput)
                .then(function (data) {
                    var mo = data.object;
                    swal('', '模块名:' + mo.name, 'success');
                    $scope.menuObject.pageModules($scope.currentPage, $scope.pageSize);
                    _hideMask();
                }, function (err) {
                    $scope.editSuccess = false;
                    console.log(err);
                    _hideMask();
                });
        },
        moveTop: function (menuId) {
            _showMask();
            menu.moveTop(menuId)
                .then(function (data) {
                    $scope.menuObject.pageMenus($scope.currentPage, $scope.pageSize);
                    _hideMask();
                }, function (err) {
                    console.log(err);
                    _hideMask();
                });
        },
        moveUp: function (menuId) {
            _showMask();
            menu.moveUp(menuId)
                .then(function (data) {
                    $scope.menuObject.pageMenus($scope.currentPage, $scope.pageSize);
                    _hideMask();
                }, function (err) {
                    console.log(err);
                    _hideMask();
                });
        },
        moveDown: function (menuId) {
            _showMask();
            menu.moveDown(menuId)
                .then(function (data) {
                    $scope.menuObject.pageMenus($scope.currentPage, $scope.pageSize);
                    _hideMask();
                }, function (err) {
                    console.log(err);
                    _hideMask();
                });
        }
    }
    $scope.menuObject.pageMenus(1, 5);
});

/**********************************系统设置>角色管理**************************************/
consoleApp.controller("RoleController", function ($rootScope, $scope, $window, $cookies, $cookieStore, role) {
    $scope.addRoleInput = {
        name: '',
        className: '',
        attrLink: '',
        sort: ''
    }
    $scope.updateRoleInput = {
        roleId: '',
        name: '',
        className: '',
        attrLink: '',
        sort: ''
    }
    $scope.roleObject = {
        pageRoles: function (page, pageSize) {
            role.pageRoles(page, pageSize).then(function (data) {
                var pageObj = data.object;
                $scope.roleList = pageObj.list;
                $scope.currentPage = page;
                $scope.pageSize = pageSize;
                $scope.total = pageObj.total;
                $scope.pages = pageObj.pages;
                $scope.maxSize = 20;
                //当页数改变以后，需要重新获取
                $scope.changePage = function () {
                    $scope.roleObject.pageRoles($scope.currentPage, $scope.pageSize);
                };
            }, function (err) {
                console.log("菜单列表加载失败" + err);
            });
        },
        loadSelectRoleList: function () {
            role.selectList().then(function (data) {
                $scope.roleSelectList = data.object;
            }, function (err) {
                console.log("菜单列表加载失败" + err);
            });
        },
        add: function () {
            if (!$scope.addRoleInput.sort) {
                //不选默认排序0
                $scope.addRoleInput.sort = 1;
            } else {
                $scope.addRoleInput.sort = $scope.addRoleInput.sort + 1;
            }
            role.addRole($scope.addRoleInput)
                .then(function (data) {
                    var mo = data.object;
                    swal('', '菜单名:' + mo.name, 'success');
                    $scope.roleObject.pageRoles($scope.currentPage, $scope.pageSize);
                }, function (err) {
                    $scope.addSuccess = false;
                    console.log(err)
                });
        },
        delete: function (roleId) {
            swal(deleteOptions, function () {
                _showMask();
                role.delete(roleId)
                    .then(function (data) {
                        $scope.moduleObject.pageRoles($scope.currentPage, $scope.pageSize);
                        _hideMask();
                    }, function (err) {
                        console.log(err);
                        _hideMask();
                    });
            })
        },
        view: function (roleId) {
            _showMask();
            role.viewDetail(roleId)
                .then(function (data) {
                    $scope.role = data.object;
                    _hideMask();
                }, function (err) {
                    console.log(err);
                    _hideMask();
                });
        },
        openUpdateModal: function (roleId) {
            $scope.updateRoleInput = {};
            _showMask();
            role.viewDetail(roleId)
                .then(function (data1) {
                    $scope.updateRoleInput = data1.object;
                    //加载列表
                    $scope.roleObject.loadSelectMenuList();
                    _hideMask();
                }, function (err) {
                    console.log(err);
                    _hideMask();
                });
        },
        edit: function () {
            _showMask();
            role.updateMenu($scope.updateRoleInput)
                .then(function (data) {
                    var mo = data.object;
                    swal('', '模块名:' + mo.name, 'success');
                    $scope.roleObject.pageModules($scope.currentPage, $scope.pageSize);
                    _hideMask();
                }, function (err) {
                    $scope.editSuccess = false;
                    console.log(err);
                    _hideMask();
                });
        },
        moveTop: function (roleId) {
            _showMask();
            role.moveTop(roleId)
                .then(function (data) {
                    $scope.roleObject.pageRoles($scope.currentPage, $scope.pageSize);
                    _hideMask();
                }, function (err) {
                    console.log(err);
                    _hideMask();
                });
        },
        moveUp: function (roleId) {
            _showMask();
            role.moveUp(roleId)
                .then(function (data) {
                    $scope.roleObject.pageRoles($scope.currentPage, $scope.pageSize);
                    _hideMask();
                }, function (err) {
                    console.log(err);
                    _hideMask();
                });
        },
        moveDown: function (roleId) {
            _showMask();
            role.moveDown(roleId)
                .then(function (data) {
                    $scope.roleObject.pageRoles($scope.currentPage, $scope.pageSize);
                    _hideMask();
                }, function (err) {
                    console.log(err);
                    _hideMask();
                });
        }
    }
    $scope.roleObject.pageRoles(1, 5);
});

/**********************************系统设置>权限管理**************************************/
consoleApp.controller("AuthController", function ($rootScope, $scope, $window, $cookies, $cookieStore, auth) {
    $scope.addAuthInput = {
        name: '',
        className: '',
        attrLink: '',
        sort: ''
    }
    $scope.updateAuthInput = {
        authId: '',
        name: '',
        className: '',
        attrLink: '',
        sort: ''
    }
    $scope.authObject = {
        pageAuths: function (page, pageSize) {
            auth.pageAuths(page, pageSize).then(function (data) {
                var pageObj = data.object;
                $scope.authList = pageObj.list;
                $scope.currentPage = page;
                $scope.pageSize = pageSize;
                $scope.total = pageObj.total;
                $scope.pages = pageObj.pages;
                $scope.maxSize = 20;
                //当页数改变以后，需要重新获取
                $scope.changePage = function () {
                    $scope.authObject.pageAuths($scope.currentPage, $scope.pageSize);
                };
            }, function (err) {
                console.log("菜单列表加载失败" + err);
            });
        },
        loadSelectAuthList: function () {
            auth.selectList().then(function (data) {
                $scope.authSelectList = data.object;
            }, function (err) {
                console.log("菜单列表加载失败" + err);
            });
        },
        add: function () {
            if (!$scope.addAuthInput.sort) {
                //不选默认排序0
                $scope.addAuthInput.sort = 1;
            } else {
                $scope.addAuthInput.sort = $scope.addAuthInput.sort + 1;
            }
            auth.addAuth($scope.addAuthInput)
                .then(function (data) {
                    var mo = data.object;
                    swal('', '菜单名:' + mo.name, 'success');
                    $scope.authObject.pageAuths($scope.currentPage, $scope.pageSize);
                }, function (err) {
                    $scope.addSuccess = false;
                    console.log(err)
                });
        },
        delete: function (authId) {
            swal(deleteOptions, function () {
                _showMask();
                auth.delete(authId)
                    .then(function (data) {
                        $scope.moduleObject.pageAuths($scope.currentPage, $scope.pageSize);
                        _hideMask();
                    }, function (err) {
                        console.log(err);
                        _hideMask();
                    });
            })
        },
        view: function (authId) {
            _showMask();
            auth.viewDetail(authId)
                .then(function (data) {
                    $scope.auth = data.object;
                    _hideMask();
                }, function (err) {
                    console.log(err);
                    _hideMask();
                });
        },
        openUpdateModal: function (authId) {
            $scope.updateAuthInput = {};
            _showMask();
            auth.viewDetail(authId)
                .then(function (data1) {
                    $scope.updateAuthInput = data1.object;
                    //加载列表
                    $scope.authObject.loadSelectMenuList();
                    _hideMask();
                }, function (err) {
                    console.log(err);
                    _hideMask();
                });
        },
        edit: function () {
            _showMask();
            auth.updateMenu($scope.updateAuthInput)
                .then(function (data) {
                    var mo = data.object;
                    swal('', '模块名:' + mo.name, 'success');
                    $scope.authObject.pageModules($scope.currentPage, $scope.pageSize);
                    _hideMask();
                }, function (err) {
                    $scope.editSuccess = false;
                    console.log(err);
                    _hideMask();
                });
        },
        moveTop: function (authId) {
            _showMask();
            auth.moveTop(authId)
                .then(function (data) {
                    $scope.authObject.pageAuths($scope.currentPage, $scope.pageSize);
                    _hideMask();
                }, function (err) {
                    console.log(err);
                    _hideMask();
                });
        },
        moveUp: function (authId) {
            _showMask();
            auth.moveUp(authId)
                .then(function (data) {
                    $scope.authObject.pageAuths($scope.currentPage, $scope.pageSize);
                    _hideMask();
                }, function (err) {
                    console.log(err);
                    _hideMask();
                });
        },
        moveDown: function (authId) {
            _showMask();
            auth.moveDown(authId)
                .then(function (data) {
                    $scope.authObject.pageAuths($scope.currentPage, $scope.pageSize);
                    _hideMask();
                }, function (err) {
                    console.log(err);
                    _hideMask();
                });
        }
    }
    $scope.authObject.pageAuths(1, 5);
});

/**********************************系统设置>路由管理**************************************/
consoleApp.controller("RouteController", function ($rootScope, $scope, $window, $cookies, $cookieStore, route) {
    $scope.addRouteInput = {
        name: '',
        className: '',
        attrLink: '',
        sort: ''
    }
    $scope.updateRouteInput = {
        routeId: '',
        name: '',
        className: '',
        attrLink: '',
        sort: ''
    }
    $scope.routeObject = {
        pageRoutes: function (page, pageSize) {
            route.pageRoutes(page, pageSize).then(function (data) {
                var pageObj = data.object;
                $scope.routeList = pageObj.list;
                $scope.currentPage = page;
                $scope.pageSize = pageSize;
                $scope.total = pageObj.total;
                $scope.pages = pageObj.pages;
                $scope.maxSize = 20;
                //当页数改变以后，需要重新获取
                $scope.changePage = function () {
                    $scope.routeObject.pageRoutes($scope.currentPage, $scope.pageSize);
                };
            }, function (err) {
                console.log("菜单列表加载失败" + err);
            });
        },
        loadSelectRouteList: function () {
            route.selectList().then(function (data) {
                $scope.routeSelectList = data.object;
            }, function (err) {
                console.log("菜单列表加载失败" + err);
            });
        },
        add: function () {
            if (!$scope.addRouteInput.sort) {
                //不选默认排序0
                $scope.addRouteInput.sort = 1;
            } else {
                $scope.addRouteInput.sort = $scope.addRouteInput.sort + 1;
            }
            route.addRoute($scope.addRouteInput)
                .then(function (data) {
                    var mo = data.object;
                    swal('', '菜单名:' + mo.name, 'success');
                    $scope.routeObject.pageRoutes($scope.currentPage, $scope.pageSize);
                }, function (err) {
                    $scope.addSuccess = false;
                    console.log(err)
                });
        },
        delete: function (routeId) {
            swal(deleteOptions, function () {
                _showMask();
                route.delete(routeId)
                    .then(function (data) {
                        $scope.moduleObject.pageRoutes($scope.currentPage, $scope.pageSize);
                        _hideMask();
                    }, function (err) {
                        console.log(err);
                        _hideMask();
                    });
            })
        },
        view: function (routeId) {
            _showMask();
            route.viewDetail(routeId)
                .then(function (data) {
                    $scope.route = data.object;
                    _hideMask();
                }, function (err) {
                    console.log(err);
                    _hideMask();
                });
        },
        openUpdateModal: function (routeId) {
            $scope.updateRouteInput = {};
            _showMask();
            route.viewDetail(routeId)
                .then(function (data1) {
                    $scope.updateRouteInput = data1.object;
                    //加载列表
                    $scope.routeObject.loadSelectMenuList();
                    _hideMask();
                }, function (err) {
                    console.log(err);
                    _hideMask();
                });
        },
        edit: function () {
            _showMask();
            route.updateMenu($scope.updateRouteInput)
                .then(function (data) {
                    var mo = data.object;
                    swal('', '模块名:' + mo.name, 'success');
                    $scope.routeObject.pageModules($scope.currentPage, $scope.pageSize);
                    _hideMask();
                }, function (err) {
                    $scope.editSuccess = false;
                    console.log(err);
                    _hideMask();
                });
        },
        moveTop: function (routeId) {
            _showMask();
            route.moveTop(routeId)
                .then(function (data) {
                    $scope.routeObject.pageRoutes($scope.currentPage, $scope.pageSize);
                    _hideMask();
                }, function (err) {
                    console.log(err);
                    _hideMask();
                });
        },
        moveUp: function (routeId) {
            _showMask();
            route.moveUp(routeId)
                .then(function (data) {
                    $scope.routeObject.pageRoutes($scope.currentPage, $scope.pageSize);
                    _hideMask();
                }, function (err) {
                    console.log(err);
                    _hideMask();
                });
        },
        moveDown: function (routeId) {
            _showMask();
            route.moveDown(routeId)
                .then(function (data) {
                    $scope.routeObject.pageRoutes($scope.currentPage, $scope.pageSize);
                    _hideMask();
                }, function (err) {
                    console.log(err);
                    _hideMask();
                });
        }
    }
    $scope.routeObject.pageRoutes(1, 5);
});

/**********************************系统设置>权限菜单管理**************************************/
consoleApp.controller("AuthmenuController", function ($rootScope, $scope, $window, $cookies, $cookieStore, authmenu) {
    $scope.addAuthmenuInput = {
        name: '',
        className: '',
        attrLink: '',
        sort: ''
    }
    $scope.updateAuthmenuInput = {
        authmenuId: '',
        name: '',
        className: '',
        attrLink: '',
        sort: ''
    }
    $scope.authmenuObject = {
        pageAuthmenus: function (page, pageSize) {
            authmenu.pageAuthmenus(page, pageSize).then(function (data) {
                var pageObj = data.object;
                $scope.authmenuList = pageObj.list;
                $scope.currentPage = page;
                $scope.pageSize = pageSize;
                $scope.total = pageObj.total;
                $scope.pages = pageObj.pages;
                $scope.maxSize = 20;
                //当页数改变以后，需要重新获取
                $scope.changePage = function () {
                    $scope.authmenuObject.pageAuthmenus($scope.currentPage, $scope.pageSize);
                };
            }, function (err) {
                console.log("菜单列表加载失败" + err);
            });
        },
        loadSelectAuthmenuList: function () {
            authmenu.selectList().then(function (data) {
                $scope.authmenuSelectList = data.object;
            }, function (err) {
                console.log("菜单列表加载失败" + err);
            });
        },
        add: function () {
            if (!$scope.addAuthmenuInput.sort) {
                //不选默认排序0
                $scope.addAuthmenuInput.sort = 1;
            } else {
                $scope.addAuthmenuInput.sort = $scope.addAuthmenuInput.sort + 1;
            }
            authmenu.addAuthmenu($scope.addAuthmenuInput)
                .then(function (data) {
                    var mo = data.object;
                    swal('', '菜单名:' + mo.name, 'success');
                    $scope.authmenuObject.pageAuthmenus($scope.currentPage, $scope.pageSize);
                }, function (err) {
                    $scope.addSuccess = false;
                    console.log(err)
                });
        },
        delete: function (authmenuId) {
            swal(deleteOptions, function () {
                _showMask();
                authmenu.delete(authmenuId)
                    .then(function (data) {
                        $scope.moduleObject.pageAuthmenus($scope.currentPage, $scope.pageSize);
                        _hideMask();
                    }, function (err) {
                        console.log(err);
                        _hideMask();
                    });
            })
        },
        view: function (authmenuId) {
            _showMask();
            authmenu.viewDetail(authmenuId)
                .then(function (data) {
                    $scope.authmenu = data.object;
                    _hideMask();
                }, function (err) {
                    console.log(err);
                    _hideMask();
                });
        },
        openUpdateModal: function (authmenuId) {
            $scope.updateAuthmenuInput = {};
            _showMask();
            authmenu.viewDetail(authmenuId)
                .then(function (data1) {
                    $scope.updateAuthmenuInput = data1.object;
                    //加载列表
                    $scope.authmenuObject.loadSelectMenuList();
                    _hideMask();
                }, function (err) {
                    console.log(err);
                    _hideMask();
                });
        },
        edit: function () {
            _showMask();
            authmenu.updateMenu($scope.updateAuthmenuInput)
                .then(function (data) {
                    var mo = data.object;
                    swal('', '模块名:' + mo.name, 'success');
                    $scope.authmenuObject.pageModules($scope.currentPage, $scope.pageSize);
                    _hideMask();
                }, function (err) {
                    $scope.editSuccess = false;
                    console.log(err);
                    _hideMask();
                });
        },
        moveTop: function (authmenuId) {
            _showMask();
            authmenu.moveTop(authmenuId)
                .then(function (data) {
                    $scope.authmenuObject.pageAuthmenus($scope.currentPage, $scope.pageSize);
                    _hideMask();
                }, function (err) {
                    console.log(err);
                    _hideMask();
                });
        },
        moveUp: function (authmenuId) {
            _showMask();
            authmenu.moveUp(authmenuId)
                .then(function (data) {
                    $scope.authmenuObject.pageAuthmenus($scope.currentPage, $scope.pageSize);
                    _hideMask();
                }, function (err) {
                    console.log(err);
                    _hideMask();
                });
        },
        moveDown: function (authmenuId) {
            _showMask();
            authmenu.moveDown(authmenuId)
                .then(function (data) {
                    $scope.authmenuObject.pageAuthmenus($scope.currentPage, $scope.pageSize);
                    _hideMask();
                }, function (err) {
                    console.log(err);
                    _hideMask();
                });
        }
    }
    $scope.authmenuObject.pageAuthmenus(1, 5);
});

/**********************************系统设置>权限角色管理**************************************/
consoleApp.controller("AuthroleController", function ($rootScope, $scope, $window, $cookies, $cookieStore, authrole) {
    $scope.addAuthroleInput = {
        name: '',
        className: '',
        attrLink: '',
        sort: ''
    }
    $scope.updateAuthroleInput = {
        authroleId: '',
        name: '',
        className: '',
        attrLink: '',
        sort: ''
    }
    $scope.authroleObject = {
        pageAuthroles: function (page, pageSize) {
            authrole.pageAuthroles(page, pageSize).then(function (data) {
                var pageObj = data.object;
                $scope.authroleList = pageObj.list;
                $scope.currentPage = page;
                $scope.pageSize = pageSize;
                $scope.total = pageObj.total;
                $scope.pages = pageObj.pages;
                $scope.maxSize = 20;
                //当页数改变以后，需要重新获取
                $scope.changePage = function () {
                    $scope.authroleObject.pageAuthroles($scope.currentPage, $scope.pageSize);
                };
            }, function (err) {
                console.log("菜单列表加载失败" + err);
            });
        },
        loadSelectAuthroleList: function () {
            authrole.selectList().then(function (data) {
                $scope.authroleSelectList = data.object;
            }, function (err) {
                console.log("菜单列表加载失败" + err);
            });
        },
        add: function () {
            if (!$scope.addAuthroleInput.sort) {
                //不选默认排序0
                $scope.addAuthroleInput.sort = 1;
            } else {
                $scope.addAuthroleInput.sort = $scope.addAuthroleInput.sort + 1;
            }
            authrole.addAuthrole($scope.addAuthroleInput)
                .then(function (data) {
                    var mo = data.object;
                    swal('', '菜单名:' + mo.name, 'success');
                    $scope.authroleObject.pageAuthroles($scope.currentPage, $scope.pageSize);
                }, function (err) {
                    $scope.addSuccess = false;
                    console.log(err)
                });
        },
        delete: function (authroleId) {
            swal(deleteOptions, function () {
                _showMask();
                authrole.delete(authroleId)
                    .then(function (data) {
                        $scope.moduleObject.pageAuthroles($scope.currentPage, $scope.pageSize);
                        _hideMask();
                    }, function (err) {
                        console.log(err);
                        _hideMask();
                    });
            })
        },
        view: function (authroleId) {
            _showMask();
            authrole.viewDetail(authroleId)
                .then(function (data) {
                    $scope.authrole = data.object;
                    _hideMask();
                }, function (err) {
                    console.log(err);
                    _hideMask();
                });
        },
        openUpdateModal: function (authroleId) {
            $scope.updateAuthroleInput = {};
            _showMask();
            authrole.viewDetail(authroleId)
                .then(function (data1) {
                    $scope.updateAuthroleInput = data1.object;
                    //加载列表
                    $scope.authroleObject.loadSelectMenuList();
                    _hideMask();
                }, function (err) {
                    console.log(err);
                    _hideMask();
                });
        },
        edit: function () {
            _showMask();
            authrole.updateMenu($scope.updateAuthroleInput)
                .then(function (data) {
                    var mo = data.object;
                    swal('', '模块名:' + mo.name, 'success');
                    $scope.authroleObject.pageModules($scope.currentPage, $scope.pageSize);
                    _hideMask();
                }, function (err) {
                    $scope.editSuccess = false;
                    console.log(err);
                    _hideMask();
                });
        },
        moveTop: function (authroleId) {
            _showMask();
            authrole.moveTop(authroleId)
                .then(function (data) {
                    $scope.authroleObject.pageAuthroles($scope.currentPage, $scope.pageSize);
                    _hideMask();
                }, function (err) {
                    console.log(err);
                    _hideMask();
                });
        },
        moveUp: function (authroleId) {
            _showMask();
            authrole.moveUp(authroleId)
                .then(function (data) {
                    $scope.authroleObject.pageAuthroles($scope.currentPage, $scope.pageSize);
                    _hideMask();
                }, function (err) {
                    console.log(err);
                    _hideMask();
                });
        },
        moveDown: function (authroleId) {
            _showMask();
            authrole.moveDown(authroleId)
                .then(function (data) {
                    $scope.authroleObject.pageAuthroles($scope.currentPage, $scope.pageSize);
                    _hideMask();
                }, function (err) {
                    console.log(err);
                    _hideMask();
                });
        }
    }
    $scope.authroleObject.pageAuthroles(1, 5);
});

/**********************************系统设置>用户角色管理**************************************/
consoleApp.controller("UserroleController", function ($rootScope, $scope, $window, $cookies, $cookieStore, userrole) {
    $scope.addUserroleInput = {
        name: '',
        className: '',
        attrLink: '',
        sort: ''
    }
    $scope.updateUserroleInput = {
        userroleId: '',
        name: '',
        className: '',
        attrLink: '',
        sort: ''
    }
    $scope.userroleObject = {
        pageUserroles: function (page, pageSize) {
            userrole.pageUserroles(page, pageSize).then(function (data) {
                var pageObj = data.object;
                $scope.userroleList = pageObj.list;
                $scope.currentPage = page;
                $scope.pageSize = pageSize;
                $scope.total = pageObj.total;
                $scope.pages = pageObj.pages;
                $scope.maxSize = 20;
                //当页数改变以后，需要重新获取
                $scope.changePage = function () {
                    $scope.userroleObject.pageUserroles($scope.currentPage, $scope.pageSize);
                };
            }, function (err) {
                console.log("菜单列表加载失败" + err);
            });
        },
        loadSelectUserroleList: function () {
            userrole.selectList().then(function (data) {
                $scope.userroleSelectList = data.object;
            }, function (err) {
                console.log("菜单列表加载失败" + err);
            });
        },
        add: function () {
            if (!$scope.addUserroleInput.sort) {
                //不选默认排序0
                $scope.addUserroleInput.sort = 1;
            } else {
                $scope.addUserroleInput.sort = $scope.addUserroleInput.sort + 1;
            }
            userrole.addUserrole($scope.addUserroleInput)
                .then(function (data) {
                    var mo = data.object;
                    swal('', '菜单名:' + mo.name, 'success');
                    $scope.userroleObject.pageUserroles($scope.currentPage, $scope.pageSize);
                }, function (err) {
                    $scope.addSuccess = false;
                    console.log(err)
                });
        },
        delete: function (userroleId) {
            swal(deleteOptions, function () {
                _showMask();
                userrole.delete(userroleId)
                    .then(function (data) {
                        $scope.moduleObject.pageUserroles($scope.currentPage, $scope.pageSize);
                        _hideMask();
                    }, function (err) {
                        console.log(err);
                        _hideMask();
                    });
            })
        },
        view: function (userroleId) {
            _showMask();
            userrole.viewDetail(userroleId)
                .then(function (data) {
                    $scope.userrole = data.object;
                    _hideMask();
                }, function (err) {
                    console.log(err);
                    _hideMask();
                });
        },
        openUpdateModal: function (userroleId) {
            $scope.updateUserroleInput = {};
            _showMask();
            userrole.viewDetail(userroleId)
                .then(function (data1) {
                    $scope.updateUserroleInput = data1.object;
                    //加载列表
                    $scope.userroleObject.loadSelectMenuList();
                    _hideMask();
                }, function (err) {
                    console.log(err);
                    _hideMask();
                });
        },
        edit: function () {
            _showMask();
            userrole.updateMenu($scope.updateUserroleInput)
                .then(function (data) {
                    var mo = data.object;
                    swal('', '模块名:' + mo.name, 'success');
                    $scope.userroleObject.pageModules($scope.currentPage, $scope.pageSize);
                    _hideMask();
                }, function (err) {
                    $scope.editSuccess = false;
                    console.log(err);
                    _hideMask();
                });
        },
        moveTop: function (userroleId) {
            _showMask();
            userrole.moveTop(userroleId)
                .then(function (data) {
                    $scope.userroleObject.pageUserroles($scope.currentPage, $scope.pageSize);
                    _hideMask();
                }, function (err) {
                    console.log(err);
                    _hideMask();
                });
        },
        moveUp: function (userroleId) {
            _showMask();
            userrole.moveUp(userroleId)
                .then(function (data) {
                    $scope.userroleObject.pageUserroles($scope.currentPage, $scope.pageSize);
                    _hideMask();
                }, function (err) {
                    console.log(err);
                    _hideMask();
                });
        },
        moveDown: function (userroleId) {
            _showMask();
            userrole.moveDown(userroleId)
                .then(function (data) {
                    $scope.userroleObject.pageUserroles($scope.currentPage, $scope.pageSize);
                    _hideMask();
                }, function (err) {
                    console.log(err);
                    _hideMask();
                });
        }
    }
    $scope.userroleObject.pageUserroles(1, 5);
});

/**********************************工具路由**************************************/
consoleApp.controller("UsercenterController", function ($rootScope, $scope, $window, usercenter, $cookies, $cookieStore) {
    $scope.logout = function () {
        $rootScope.notLogin = true;
        $scope.user = null;
        delete $cookies.uid;
        $cookieStore.remove('user');
    }
    $scope.pageUsers = function (page, pageSize) {
        usercenter.pageUsers(page, pageSize).then(function (data) {
            var pageObj = data.object;
            $scope.userList = pageObj.list;
            $scope.currentPage = page;
            $scope.pageSize = pageSize;
            $scope.total = pageObj.total;
            $scope.pages = pageObj.pages;
            $scope.maxSize = 20;
            //当页数改变以后，需要重新获取
            $scope.changePage = function () {
                $scope.pageUsers($scope.currentPage, $scope.pageSize);
            };
        }, function (err) {
            console.log("用户列表加载失败" + err);
        });
    }
    $scope.pageUsers(1, 10);
});

/************************************登录模块*************************************************/
consoleApp.controller("LoginController", function ($rootScope, $scope, $window, user, $cookies, $cookieStore, $location) {
    $scope.login = {};
    $scope.loginError = "";
    //登录提交表单时，对表单进行验证；
    $scope.loginSubmit = function () {
        _showMask();
        //$scope.login为表单已填充后的数据
        user.loginVerify($scope.login)
            .then(function (data) {
                //登录成功跳转到home页面
                $rootScope.loginUser = data.object;//将用户信息存入$rootScope，在页面获取
                $cookies.uid = data.object.uid;
                $cookieStore.put('user', data.object);
                $rootScope.notLogin = false;
                _hideMask();
                swal('', '登录成功！', 'success');
            }, function (err) {
                _hideMask();
                console.log(JSON.stringify(err));
                if (err.code == '100000') {
                    $scope.loginError = "用户名不存在!";
                } else if (err.code == '100100') {
                    $scope.loginError = "密码错误!";
                }
                $scope.login = {};
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
/***************************************注册模块*********************************************/
consoleApp.controller("RegisterController", function ($rootScope, $scope, $cookies, $window, user, phone) {
    var regex = /^1((((((3[4-9])||(47)||(5[0-27-9])||(78)||(8[2-478])))||(((33)||(53)||(8[019])||(77)))||(((3[0-2])||(45)||(5[56])||(76)||(8[56]))))\d{8})||(70[057-9]\d{7}))$/;
    $scope.sendCodeBtnDisabled = true;
    console.log("注册");
    //1检测手机是否已注册
    $scope.checkMobile = function () {
        console.log("time:" + new Date().getMilliseconds() + "(1)页面输入手机号:" + $scope.register.phone);
        if (!$scope.register.phone) {
            swal('', '未输入手机号', 'error');
            return;
        }
        if (regex.test($scope.register.phone) == false) {
            swal('', '手机号格式不正确', 'error')
            return;
        }
        $scope.mobileIsChecking = true;
        phone.check($scope.register.phone).then(function (data) {
            _showMask();
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
                $scope.sendCodeBtnDisabled = false;
                $scope.mobileIsRegistered = false;
                $scope.mobileIsChecking = false;
                $scope.mobileIsNotRegistered = true;
            }
            _hideMask();
        }, function (err) {
            console.log(err);
        });
    }
    $scope.checkConfirmPassword = function () {
        var pass = $scope.register.password;
        var pass2 = $scope.register.confirmPassword;
        if (pass != pass2) {
            swal('', '两次密码输入不正确,请重新设置密码', 'error');
            $scope.register.password = '';
            $scope.register.confirmPassword = '';
        }
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
    $rootScope.hasRegistered = false;
    $scope.registerAccount = function () {
        user.registerAccount($scope.register).then(function (data) {
            console.log("注册完成返回的结果" + JSON.stringify(data));
            $rootScope.hasRegistered = true;
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

