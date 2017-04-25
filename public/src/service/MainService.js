var consoleApp = angular.module('consoleApp.services', [
    'ngCookies'
]);
/********************module模块****************************/
consoleApp.factory("modules", function ($http, $q, $cookies) {

    return {
        /*******************获取公共模块******************************************************/
        loadCommonModule: function () {
            var deferred;
            deferred = $q.defer();
            $http.get('/~/system/module/common', {}).success(function (data) {
                if (data) {
                    return deferred.resolve(data);
                } else {
                    return deferred.reject(data);
                }
            }).error(function (error) {
                return deferred.reject(error);
            });
            return deferred.promise;
        },
        pageModules: function (page, pageSize) {
            var deferred;
            deferred = $q.defer();
            $http.get('/~/system/module/page/modules', {
                params: {
                    page: page,
                    pageSize: pageSize
                }
            }).success(function (data) {
                if (data) {
                    return deferred.resolve(data);
                } else {
                    return deferred.reject(data);
                }
            }).error(function (error) {
                return deferred.reject(error);
            });
            return deferred.promise;
        },
        pageModulesMenus: function (page, pageSize) {
            var deferred;
            deferred = $q.defer();
            $http.get('/~/system/module/page/modules/menus', {
                params: {
                    page: page,
                    pageSize: pageSize
                }
            }).success(function (data) {
                if (data) {
                    return deferred.resolve(data);
                } else {
                    return deferred.reject(data);
                }
            }).error(function (error) {
                return deferred.reject(error);
            });
            return deferred.promise;
        },
        selectList: function () {
            var deferred;
            deferred = $q.defer();
            $http.get('/~/system/module/selectlist', {}).success(function (data) {
                if (data) {
                    return deferred.resolve(data);
                } else {
                    return deferred.reject(data);
                }
            }).error(function (error) {
                return deferred.reject(error);
            });
            return deferred.promise;
        },
        addModule: function (module) {
            var deferred;
            deferred = $q.defer();
            $http.post('/~/system/module', {module: module}).success(function (data) {
                if (data) {
                    return deferred.resolve(data);
                } else {
                    return deferred.reject(data);
                }
            }).error(function (error) {
                return deferred.reject(error);
            });
            return deferred.promise;
        },
        delete: function (moduleId) {
            var deferred;
            deferred = $q.defer();
            $http.delete('/~/system/module', {params: {moduleId: moduleId}}).success(function (data) {
                if (data) {
                    return deferred.resolve(data);
                } else {
                    return deferred.reject(data);
                }
            }).error(function (error) {
                return deferred.reject(error);
            });
            return deferred.promise;
        },
        viewDetail: function (moduleId) {
            var deferred;
            deferred = $q.defer();
            $http.get('/~/system/module', {params: {moduleId: moduleId}}).success(function (data) {
                if (data) {
                    return deferred.resolve(data);
                } else {
                    return deferred.reject(data);
                }
            }).error(function (error) {
                return deferred.reject(error);
            });
            return deferred.promise;
        },
        updateModule: function (module) {
            var deferred;
            deferred = $q.defer();
            $http.put('/~/system/module', {module: module}).success(function (data) {
                if (data) {
                    return deferred.resolve(data);
                } else {
                    return deferred.reject(data);
                }
            }).error(function (error) {
                return deferred.reject(error);
            });
            return deferred.promise;
        },
        moveTop: function (moduleId) {
            var deferred;
            deferred = $q.defer();
            $http.get('/~/system/module/top', {params: {moduleId: moduleId}}).success(function (data) {
                if (data) {
                    return deferred.resolve(data);
                } else {
                    return deferred.reject(data);
                }
            }).error(function (error) {
                return deferred.reject(error);
            });
            return deferred.promise;
        },
        moveUp: function (moduleId) {
            var deferred;
            deferred = $q.defer();
            $http.get('/~/system/module/up', {params: {moduleId: moduleId}}).success(function (data) {
                if (data) {
                    return deferred.resolve(data);
                } else {
                    return deferred.reject(data);
                }
            }).error(function (error) {
                return deferred.reject(error);
            });
            return deferred.promise;
        },
        moveDown: function (moduleId) {
            var deferred;
            deferred = $q.defer();
            $http.get('/~/system/module/down', {params: {moduleId: moduleId}}).success(function (data) {
                if (data) {
                    return deferred.resolve(data);
                } else {
                    return deferred.reject(data);
                }
            }).error(function (error) {
                return deferred.reject(error);
            });
            return deferred.promise;
        },
        lock: function (moduleId) {
            var deferred;
            deferred = $q.defer();
            $http.get('/~/system/module/lock', {params: {moduleId: moduleId}}).success(function (data) {
                if (data) {
                    return deferred.resolve(data);
                } else {
                    return deferred.reject(data);
                }
            }).error(function (error) {
                return deferred.reject(error);
            });
            return deferred.promise;
        },
        unlock: function (moduleId) {
            var deferred;
            deferred = $q.defer();
            $http.get('/~/system/module/unlock', {params: {moduleId: moduleId}}).success(function (data) {
                if (data) {
                    return deferred.resolve(data);
                } else {
                    return deferred.reject(data);
                }
            }).error(function (error) {
                return deferred.reject(error);
            });
            return deferred.promise;
        }
    }

});

/********************menu模块****************************/
consoleApp.factory("menu", function ($http, $q, $cookies) {

    return {
        pageMenus: function (page, pageSize) {
            var deferred;
            deferred = $q.defer();
            $http.get('/~/system/menu/page/menus', {params: {page: page, pageSize: pageSize}}).success(function (data) {
                if (data) {
                    return deferred.resolve(data);
                } else {
                    return deferred.reject(data);
                }
            }).error(function (error) {
                return deferred.reject(error);
            });
            return deferred.promise;
        },
        selectList: function () {
            var deferred;
            deferred = $q.defer();
            $http.get('/~/system/menu/selectlist', {}).success(function (data) {
                if (data) {
                    return deferred.resolve(data);
                } else {
                    return deferred.reject(data);
                }
            }).error(function (error) {
                return deferred.reject(error);
            });
            return deferred.promise;
        },
        addMenu: function (menu) {
            var deferred;
            deferred = $q.defer();
            $http.post('/~/system/menu', {menu: menu}).success(function (data) {
                if (data) {
                    return deferred.resolve(data);
                } else {
                    return deferred.reject(data);
                }
            }).error(function (error) {
                return deferred.reject(error);
            });
            return deferred.promise;
        },
        delete: function (menuId) {
            var deferred;
            deferred = $q.defer();
            $http.delete('/~/system/menu', {params: {menuId: menuId}}).success(function (data) {
                if (data) {
                    return deferred.resolve(data);
                } else {
                    return deferred.reject(data);
                }
            }).error(function (error) {
                return deferred.reject(error);
            });
            return deferred.promise;
        },
        viewDetail: function (menuId) {
            var deferred;
            deferred = $q.defer();
            $http.get('/~/system/menu', {params: {menuId: menuId}}).success(function (data) {
                if (data) {
                    return deferred.resolve(data);
                } else {
                    return deferred.reject(data);
                }
            }).error(function (error) {
                return deferred.reject(error);
            });
            return deferred.promise;
        },
        updateMenu: function (menu) {
            var deferred;
            deferred = $q.defer();
            $http.put('/~/system/menu', {menu: menu}).success(function (data) {
                if (data) {
                    return deferred.resolve(data);
                } else {
                    return deferred.reject(data);
                }
            }).error(function (error) {
                return deferred.reject(error);
            });
            return deferred.promise;
        },
        moveTop: function (menuId) {
            var deferred;
            deferred = $q.defer();
            $http.get('/~/system/menu/top', {params: {menuId: menuId}}).success(function (data) {
                if (data) {
                    return deferred.resolve(data);
                } else {
                    return deferred.reject(data);
                }
            }).error(function (error) {
                return deferred.reject(error);
            });
            return deferred.promise;
        },
        moveUp: function (menuId) {
            var deferred;
            deferred = $q.defer();
            $http.get('/~/system/menu/up', {params: {menuId: menuId}}).success(function (data) {
                if (data) {
                    return deferred.resolve(data);
                } else {
                    return deferred.reject(data);
                }
            }).error(function (error) {
                return deferred.reject(error);
            });
            return deferred.promise;
        },
        moveDown: function (menuId) {
            var deferred;
            deferred = $q.defer();
            $http.get('/~/system/menu/down', {params: {menuId: menuId}}).success(function (data) {
                if (data) {
                    return deferred.resolve(data);
                } else {
                    return deferred.reject(data);
                }
            }).error(function (error) {
                return deferred.reject(error);
            });
            return deferred.promise;
        },
        lock: function (menuId) {
            var deferred;
            deferred = $q.defer();
            $http.get('/~/system/menu/lock', {params: {menuId: menuId}}).success(function (data) {
                if (data) {
                    return deferred.resolve(data);
                } else {
                    return deferred.reject(data);
                }
            }).error(function (error) {
                return deferred.reject(error);
            });
            return deferred.promise;
        },
        unlock: function (menuId) {
            var deferred;
            deferred = $q.defer();
            $http.get('/~/system/menu/unlock', {params: {menuId: menuId}}).success(function (data) {
                if (data) {
                    return deferred.resolve(data);
                } else {
                    return deferred.reject(data);
                }
            }).error(function (error) {
                return deferred.reject(error);
            });
            return deferred.promise;
        }
    }

});

/********************role模块****************************/
consoleApp.factory("role", function ($http, $q, $cookies) {

    return {
        pageRoles: function (page, pageSize) {
            var deferred;
            deferred = $q.defer();
            $http.get('/~/system/role/page/roles', {params: {page: page, pageSize: pageSize}}).success(function (data) {
                if (data) {
                    return deferred.resolve(data);
                } else {
                    return deferred.reject(data);
                }
            }).error(function (error) {
                return deferred.reject(error);
            });
            return deferred.promise;
        },
        selectList: function () {
            var deferred;
            deferred = $q.defer();
            $http.get('/~/system/role/selectlist', {}).success(function (data) {
                if (data) {
                    return deferred.resolve(data);
                } else {
                    return deferred.reject(data);
                }
            }).error(function (error) {
                return deferred.reject(error);
            });
            return deferred.promise;
        },
        addRole: function (role) {
            var deferred;
            deferred = $q.defer();
            $http.post('/~/system/role', {role: role}).success(function (data) {
                if (data) {
                    return deferred.resolve(data);
                } else {
                    return deferred.reject(data);
                }
            }).error(function (error) {
                return deferred.reject(error);
            });
            return deferred.promise;
        },
        delete: function (roleId) {
            var deferred;
            deferred = $q.defer();
            $http.delete('/~/system/role', {params: {roleId: roleId}}).success(function (data) {
                if (data) {
                    return deferred.resolve(data);
                } else {
                    return deferred.reject(data);
                }
            }).error(function (error) {
                return deferred.reject(error);
            });
            return deferred.promise;
        },
        viewDetail: function (roleId) {
            var deferred;
            deferred = $q.defer();
            $http.get('/~/system/role', {params: {roleId: roleId}}).success(function (data) {
                if (data) {
                    return deferred.resolve(data);
                } else {
                    return deferred.reject(data);
                }
            }).error(function (error) {
                return deferred.reject(error);
            });
            return deferred.promise;
        },
        updateRole: function (role) {
            var deferred;
            deferred = $q.defer();
            $http.put('/~/system/role', {role: role}).success(function (data) {
                if (data) {
                    return deferred.resolve(data);
                } else {
                    return deferred.reject(data);
                }
            }).error(function (error) {
                return deferred.reject(error);
            });
            return deferred.promise;
        },
        moveTop: function (roleId) {
            var deferred;
            deferred = $q.defer();
            $http.get('/~/system/role/top', {params: {roleId: roleId}}).success(function (data) {
                if (data) {
                    return deferred.resolve(data);
                } else {
                    return deferred.reject(data);
                }
            }).error(function (error) {
                return deferred.reject(error);
            });
            return deferred.promise;
        },
        moveUp: function (roleId) {
            var deferred;
            deferred = $q.defer();
            $http.get('/~/system/role/up', {params: {roleId: roleId}}).success(function (data) {
                if (data) {
                    return deferred.resolve(data);
                } else {
                    return deferred.reject(data);
                }
            }).error(function (error) {
                return deferred.reject(error);
            });
            return deferred.promise;
        },
        moveDown: function (roleId) {
            var deferred;
            deferred = $q.defer();
            $http.get('/~/system/role/down', {params: {roleId: roleId}}).success(function (data) {
                if (data) {
                    return deferred.resolve(data);
                } else {
                    return deferred.reject(data);
                }
            }).error(function (error) {
                return deferred.reject(error);
            });
            return deferred.promise;
        },
        lock: function (roleId) {
            var deferred;
            deferred = $q.defer();
            $http.get('/~/system/role/lock', {params: {roleId: roleId}}).success(function (data) {
                if (data) {
                    return deferred.resolve(data);
                } else {
                    return deferred.reject(data);
                }
            }).error(function (error) {
                return deferred.reject(error);
            });
            return deferred.promise;
        },
        unlock: function (roleId) {
            var deferred;
            deferred = $q.defer();
            $http.get('/~/system/role/unlock', {params: {roleId: roleId}}).success(function (data) {
                if (data) {
                    return deferred.resolve(data);
                } else {
                    return deferred.reject(data);
                }
            }).error(function (error) {
                return deferred.reject(error);
            });
            return deferred.promise;
        }
    }

});

/********************auth模块****************************/
consoleApp.factory("auth", function ($http, $q, $cookies) {

    return {
        pageAuths: function (page, pageSize) {
            var deferred;
            deferred = $q.defer();
            $http.get('/~/system/auth/page/auths', {params: {page: page, pageSize: pageSize}}).success(function (data) {
                if (data) {
                    return deferred.resolve(data);
                } else {
                    return deferred.reject(data);
                }
            }).error(function (error) {
                return deferred.reject(error);
            });
            return deferred.promise;
        },
        selectList: function () {
            var deferred;
            deferred = $q.defer();
            $http.get('/~/system/auth/selectlist', {}).success(function (data) {
                if (data) {
                    return deferred.resolve(data);
                } else {
                    return deferred.reject(data);
                }
            }).error(function (error) {
                return deferred.reject(error);
            });
            return deferred.promise;
        },
        addAuth: function (auth) {
            var deferred;
            deferred = $q.defer();
            $http.post('/~/system/auth', {auth: auth}).success(function (data) {
                if (data) {
                    return deferred.resolve(data);
                } else {
                    return deferred.reject(data);
                }
            }).error(function (error) {
                return deferred.reject(error);
            });
            return deferred.promise;
        },
        delete: function (authId) {
            var deferred;
            deferred = $q.defer();
            $http.delete('/~/system/auth', {params: {authId: authId}}).success(function (data) {
                if (data) {
                    return deferred.resolve(data);
                } else {
                    return deferred.reject(data);
                }
            }).error(function (error) {
                return deferred.reject(error);
            });
            return deferred.promise;
        },
        viewDetail: function (authId) {
            var deferred;
            deferred = $q.defer();
            $http.get('/~/system/auth', {params: {authId: authId}}).success(function (data) {
                if (data) {
                    return deferred.resolve(data);
                } else {
                    return deferred.reject(data);
                }
            }).error(function (error) {
                return deferred.reject(error);
            });
            return deferred.promise;
        },
        updateAuth: function (auth) {
            var deferred;
            deferred = $q.defer();
            $http.put('/~/system/auth', {auth: auth}).success(function (data) {
                if (data) {
                    return deferred.resolve(data);
                } else {
                    return deferred.reject(data);
                }
            }).error(function (error) {
                return deferred.reject(error);
            });
            return deferred.promise;
        },
        moveTop: function (authId) {
            var deferred;
            deferred = $q.defer();
            $http.get('/~/system/auth/top', {params: {authId: authId}}).success(function (data) {
                if (data) {
                    return deferred.resolve(data);
                } else {
                    return deferred.reject(data);
                }
            }).error(function (error) {
                return deferred.reject(error);
            });
            return deferred.promise;
        },
        moveUp: function (authId) {
            var deferred;
            deferred = $q.defer();
            $http.get('/~/system/auth/up', {params: {authId: authId}}).success(function (data) {
                if (data) {
                    return deferred.resolve(data);
                } else {
                    return deferred.reject(data);
                }
            }).error(function (error) {
                return deferred.reject(error);
            });
            return deferred.promise;
        },
        moveDown: function (authId) {
            var deferred;
            deferred = $q.defer();
            $http.get('/~/system/auth/down', {params: {authId: authId}}).success(function (data) {
                if (data) {
                    return deferred.resolve(data);
                } else {
                    return deferred.reject(data);
                }
            }).error(function (error) {
                return deferred.reject(error);
            });
            return deferred.promise;
        },
        lock: function (authId) {
            var deferred;
            deferred = $q.defer();
            $http.get('/~/system/auth/lock', {params: {authId: authId}}).success(function (data) {
                if (data) {
                    return deferred.resolve(data);
                } else {
                    return deferred.reject(data);
                }
            }).error(function (error) {
                return deferred.reject(error);
            });
            return deferred.promise;
        },
        unlock: function (authId) {
            var deferred;
            deferred = $q.defer();
            $http.get('/~/system/auth/unlock', {params: {authId: authId}}).success(function (data) {
                if (data) {
                    return deferred.resolve(data);
                } else {
                    return deferred.reject(data);
                }
            }).error(function (error) {
                return deferred.reject(error);
            });
            return deferred.promise;
        }
    }

});

/********************route模块****************************/
consoleApp.factory("route", function ($http, $q, $cookies) {

    return {
        pageRoutes: function (page, pageSize) {
            var deferred;
            deferred = $q.defer();
            $http.get('/~/system/route/page/routes', {
                params: {
                    page: page,
                    pageSize: pageSize
                }
            }).success(function (data) {
                if (data) {
                    return deferred.resolve(data);
                } else {
                    return deferred.reject(data);
                }
            }).error(function (error) {
                return deferred.reject(error);
            });
            return deferred.promise;
        },
        selectList: function () {
            var deferred;
            deferred = $q.defer();
            $http.get('/~/system/route/selectlist', {}).success(function (data) {
                if (data) {
                    return deferred.resolve(data);
                } else {
                    return deferred.reject(data);
                }
            }).error(function (error) {
                return deferred.reject(error);
            });
            return deferred.promise;
        },
        addRoute: function (route) {
            var deferred;
            deferred = $q.defer();
            $http.post('/~/system/route', {route: route}).success(function (data) {
                if (data) {
                    return deferred.resolve(data);
                } else {
                    return deferred.reject(data);
                }
            }).error(function (error) {
                return deferred.reject(error);
            });
            return deferred.promise;
        },
        delete: function (routeId) {
            var deferred;
            deferred = $q.defer();
            $http.delete('/~/system/route', {params: {routeId: routeId}}).success(function (data) {
                if (data) {
                    return deferred.resolve(data);
                } else {
                    return deferred.reject(data);
                }
            }).error(function (error) {
                return deferred.reject(error);
            });
            return deferred.promise;
        },
        viewDetail: function (routeId) {
            var deferred;
            deferred = $q.defer();
            $http.get('/~/system/route', {params: {routeId: routeId}}).success(function (data) {
                if (data) {
                    return deferred.resolve(data);
                } else {
                    return deferred.reject(data);
                }
            }).error(function (error) {
                return deferred.reject(error);
            });
            return deferred.promise;
        },
        updateRoute: function (route) {
            var deferred;
            deferred = $q.defer();
            $http.put('/~/system/route', {route: route}).success(function (data) {
                if (data) {
                    return deferred.resolve(data);
                } else {
                    return deferred.reject(data);
                }
            }).error(function (error) {
                return deferred.reject(error);
            });
            return deferred.promise;
        },
        moveTop: function (routeId) {
            var deferred;
            deferred = $q.defer();
            $http.get('/~/system/route/top', {params: {routeId: routeId}}).success(function (data) {
                if (data) {
                    return deferred.resolve(data);
                } else {
                    return deferred.reject(data);
                }
            }).error(function (error) {
                return deferred.reject(error);
            });
            return deferred.promise;
        },
        moveUp: function (routeId) {
            var deferred;
            deferred = $q.defer();
            $http.get('/~/system/route/up', {params: {routeId: routeId}}).success(function (data) {
                if (data) {
                    return deferred.resolve(data);
                } else {
                    return deferred.reject(data);
                }
            }).error(function (error) {
                return deferred.reject(error);
            });
            return deferred.promise;
        },
        moveDown: function (routeId) {
            var deferred;
            deferred = $q.defer();
            $http.get('/~/system/route/down', {params: {routeId: routeId}}).success(function (data) {
                if (data) {
                    return deferred.resolve(data);
                } else {
                    return deferred.reject(data);
                }
            }).error(function (error) {
                return deferred.reject(error);
            });
            return deferred.promise;
        },
        lock: function (routeId) {
            var deferred;
            deferred = $q.defer();
            $http.get('/~/system/route/lock', {params: {routeId: routeId}}).success(function (data) {
                if (data) {
                    return deferred.resolve(data);
                } else {
                    return deferred.reject(data);
                }
            }).error(function (error) {
                return deferred.reject(error);
            });
            return deferred.promise;
        },
        unlock: function (routeId) {
            var deferred;
            deferred = $q.defer();
            $http.get('/~/system/route/unlock', {params: {routeId: routeId}}).success(function (data) {
                if (data) {
                    return deferred.resolve(data);
                } else {
                    return deferred.reject(data);
                }
            }).error(function (error) {
                return deferred.reject(error);
            });
            return deferred.promise;
        }
    }

});

/********************authmenu模块****************************/
consoleApp.factory("authmenu", function ($http, $q, $cookies) {

    return {
        pageAuthmenus: function (page, pageSize) {
            var deferred;
            deferred = $q.defer();
            $http.get('/~/system/authmenu/pageable', {
                params: {
                    page: page,
                    pageSize: pageSize
                }
            }).success(function (data) {
                if (data) {
                    return deferred.resolve(data);
                } else {
                    return deferred.reject(data);
                }
            }).error(function (error) {
                return deferred.reject(error);
            });
            return deferred.promise;
        },
        selectList: function () {
            var deferred;
            deferred = $q.defer();
            $http.get('/~/system/authmenu/selectlist', {}).success(function (data) {
                if (data) {
                    return deferred.resolve(data);
                } else {
                    return deferred.reject(data);
                }
            }).error(function (error) {
                return deferred.reject(error);
            });
            return deferred.promise;
        },
        addAuthmenu: function (authmenu) {
            var deferred;
            deferred = $q.defer();
            $http.post('/~/system/authmenu', {authmenu: authmenu}).success(function (data) {
                if (data) {
                    return deferred.resolve(data);
                } else {
                    return deferred.reject(data);
                }
            }).error(function (error) {
                return deferred.reject(error);
            });
            return deferred.promise;
        },
        delete: function (authmenuId) {
            var deferred;
            deferred = $q.defer();
            $http.delete('/~/system/authmenu', {params: {authmenuId: authmenuId}}).success(function (data) {
                if (data) {
                    return deferred.resolve(data);
                } else {
                    return deferred.reject(data);
                }
            }).error(function (error) {
                return deferred.reject(error);
            });
            return deferred.promise;
        },
        viewDetail: function (authmenuId) {
            var deferred;
            deferred = $q.defer();
            $http.get('/~/system/authmenu', {params: {authmenuId: authmenuId}}).success(function (data) {
                if (data) {
                    return deferred.resolve(data);
                } else {
                    return deferred.reject(data);
                }
            }).error(function (error) {
                return deferred.reject(error);
            });
            return deferred.promise;
        },
        updateAuthmenu: function (authmenu) {
            var deferred;
            deferred = $q.defer();
            $http.put('/~/system/authmenu', {authmenu: authmenu}).success(function (data) {
                if (data) {
                    return deferred.resolve(data);
                } else {
                    return deferred.reject(data);
                }
            }).error(function (error) {
                return deferred.reject(error);
            });
            return deferred.promise;
        },
        moveTop: function (authmenuId) {
            var deferred;
            deferred = $q.defer();
            $http.get('/~/system/authmenu/top', {params: {authmenuId: authmenuId}}).success(function (data) {
                if (data) {
                    return deferred.resolve(data);
                } else {
                    return deferred.reject(data);
                }
            }).error(function (error) {
                return deferred.reject(error);
            });
            return deferred.promise;
        },
        moveUp: function (authmenuId) {
            var deferred;
            deferred = $q.defer();
            $http.get('/~/system/authmenu/up', {params: {authmenuId: authmenuId}}).success(function (data) {
                if (data) {
                    return deferred.resolve(data);
                } else {
                    return deferred.reject(data);
                }
            }).error(function (error) {
                return deferred.reject(error);
            });
            return deferred.promise;
        },
        moveDown: function (authmenuId) {
            var deferred;
            deferred = $q.defer();
            $http.get('/~/system/authmenu/down', {params: {authmenuId: authmenuId}}).success(function (data) {
                if (data) {
                    return deferred.resolve(data);
                } else {
                    return deferred.reject(data);
                }
            }).error(function (error) {
                return deferred.reject(error);
            });
            return deferred.promise;
        }
    }

});

/********************authrole模块****************************/
consoleApp.factory("authrole", function ($http, $q, $cookies) {

    return {
        pageAuthroles: function (page, pageSize) {
            var deferred;
            deferred = $q.defer();
            $http.get('/~/system/authrole/pageable', {
                params: {
                    page: page,
                    pageSize: pageSize
                }
            }).success(function (data) {
                if (data) {
                    return deferred.resolve(data);
                } else {
                    return deferred.reject(data);
                }
            }).error(function (error) {
                return deferred.reject(error);
            });
            return deferred.promise;
        },
        selectList: function () {
            var deferred;
            deferred = $q.defer();
            $http.get('/~/system/authrole/selectlist', {}).success(function (data) {
                if (data) {
                    return deferred.resolve(data);
                } else {
                    return deferred.reject(data);
                }
            }).error(function (error) {
                return deferred.reject(error);
            });
            return deferred.promise;
        },
        addAuthrole: function (authrole) {
            var deferred;
            deferred = $q.defer();
            $http.post('/~/system/authrole', {authrole: authrole}).success(function (data) {
                if (data) {
                    return deferred.resolve(data);
                } else {
                    return deferred.reject(data);
                }
            }).error(function (error) {
                return deferred.reject(error);
            });
            return deferred.promise;
        },
        delete: function (authroleId) {
            var deferred;
            deferred = $q.defer();
            $http.delete('/~/system/authrole', {params: {authroleId: authroleId}}).success(function (data) {
                if (data) {
                    return deferred.resolve(data);
                } else {
                    return deferred.reject(data);
                }
            }).error(function (error) {
                return deferred.reject(error);
            });
            return deferred.promise;
        },
        viewDetail: function (authroleId) {
            var deferred;
            deferred = $q.defer();
            $http.get('/~/system/authrole', {params: {authroleId: authroleId}}).success(function (data) {
                if (data) {
                    return deferred.resolve(data);
                } else {
                    return deferred.reject(data);
                }
            }).error(function (error) {
                return deferred.reject(error);
            });
            return deferred.promise;
        },
        updateAuthrole: function (authrole) {
            var deferred;
            deferred = $q.defer();
            $http.put('/~/system/authrole', {authrole: authrole}).success(function (data) {
                if (data) {
                    return deferred.resolve(data);
                } else {
                    return deferred.reject(data);
                }
            }).error(function (error) {
                return deferred.reject(error);
            });
            return deferred.promise;
        },
        moveTop: function (authroleId) {
            var deferred;
            deferred = $q.defer();
            $http.get('/~/system/authrole/top', {params: {authroleId: authroleId}}).success(function (data) {
                if (data) {
                    return deferred.resolve(data);
                } else {
                    return deferred.reject(data);
                }
            }).error(function (error) {
                return deferred.reject(error);
            });
            return deferred.promise;
        },
        moveUp: function (authroleId) {
            var deferred;
            deferred = $q.defer();
            $http.get('/~/system/authrole/up', {params: {authroleId: authroleId}}).success(function (data) {
                if (data) {
                    return deferred.resolve(data);
                } else {
                    return deferred.reject(data);
                }
            }).error(function (error) {
                return deferred.reject(error);
            });
            return deferred.promise;
        },
        moveDown: function (authroleId) {
            var deferred;
            deferred = $q.defer();
            $http.get('/~/system/authrole/down', {params: {authroleId: authroleId}}).success(function (data) {
                if (data) {
                    return deferred.resolve(data);
                } else {
                    return deferred.reject(data);
                }
            }).error(function (error) {
                return deferred.reject(error);
            });
            return deferred.promise;
        }
    }

});

/********************userrole模块****************************/
consoleApp.factory("userrole", function ($http, $q, $cookies) {

    return {
        pageUserroles: function (page, pageSize) {
            var deferred;
            deferred = $q.defer();
            $http.get('/~/system/userrole/pageable', {
                params: {
                    page: page,
                    pageSize: pageSize
                }
            }).success(function (data) {
                if (data) {
                    return deferred.resolve(data);
                } else {
                    return deferred.reject(data);
                }
            }).error(function (error) {
                return deferred.reject(error);
            });
            return deferred.promise;
        },
        selectList: function () {
            var deferred;
            deferred = $q.defer();
            $http.get('/~/system/userrole/selectlist', {}).success(function (data) {
                if (data) {
                    return deferred.resolve(data);
                } else {
                    return deferred.reject(data);
                }
            }).error(function (error) {
                return deferred.reject(error);
            });
            return deferred.promise;
        },
        addUserrole: function (userrole) {
            var deferred;
            deferred = $q.defer();
            $http.post('/~/system/userrole', {userrole: userrole}).success(function (data) {
                if (data) {
                    return deferred.resolve(data);
                } else {
                    return deferred.reject(data);
                }
            }).error(function (error) {
                return deferred.reject(error);
            });
            return deferred.promise;
        },
        delete: function (userroleId) {
            var deferred;
            deferred = $q.defer();
            $http.delete('/~/system/userrole', {params: {userroleId: userroleId}}).success(function (data) {
                if (data) {
                    return deferred.resolve(data);
                } else {
                    return deferred.reject(data);
                }
            }).error(function (error) {
                return deferred.reject(error);
            });
            return deferred.promise;
        },
        viewDetail: function (userroleId) {
            var deferred;
            deferred = $q.defer();
            $http.get('/~/system/userrole', {params: {userroleId: userroleId}}).success(function (data) {
                if (data) {
                    return deferred.resolve(data);
                } else {
                    return deferred.reject(data);
                }
            }).error(function (error) {
                return deferred.reject(error);
            });
            return deferred.promise;
        },
        updateUserrole: function (userrole) {
            var deferred;
            deferred = $q.defer();
            $http.put('/~/system/userrole', {userrole: userrole}).success(function (data) {
                if (data) {
                    return deferred.resolve(data);
                } else {
                    return deferred.reject(data);
                }
            }).error(function (error) {
                return deferred.reject(error);
            });
            return deferred.promise;
        },
        moveTop: function (userroleId) {
            var deferred;
            deferred = $q.defer();
            $http.get('/~/system/userrole/top', {params: {userroleId: userroleId}}).success(function (data) {
                if (data) {
                    return deferred.resolve(data);
                } else {
                    return deferred.reject(data);
                }
            }).error(function (error) {
                return deferred.reject(error);
            });
            return deferred.promise;
        },
        moveUp: function (userroleId) {
            var deferred;
            deferred = $q.defer();
            $http.get('/~/system/userrole/up', {params: {userroleId: userroleId}}).success(function (data) {
                if (data) {
                    return deferred.resolve(data);
                } else {
                    return deferred.reject(data);
                }
            }).error(function (error) {
                return deferred.reject(error);
            });
            return deferred.promise;
        },
        moveDown: function (userroleId) {
            var deferred;
            deferred = $q.defer();
            $http.get('/~/system/userrole/down', {params: {userroleId: userroleId}}).success(function (data) {
                if (data) {
                    return deferred.resolve(data);
                } else {
                    return deferred.reject(data);
                }
            }).error(function (error) {
                return deferred.reject(error);
            });
            return deferred.promise;
        }
    }

});

/********************mobile模块****************************/
consoleApp.factory("phone", function ($http, $q, $cookies) {

    return {
        /*******************检测手机号是否已注册******************************************************/
        check: function (phone) {
            console.log("time:" + new Date().getMilliseconds() + "(2)phone>>" + phone);
            var deferred;
            deferred = $q.defer();
            //验证验证码；
            $http.post('/~/phone/check', {phone: phone}).success(function (data) {
                if (data) {
                    return deferred.resolve(data);
                } else {
                    return deferred.reject(data);
                }
            }).error(function (error) {
                return deferred.reject(error);
            });
            return deferred.promise;
        },
        /*******************生成验证码******************************************************/
        generateCode: function (phone) {
            console.log("(2)phone>>" + phone);
            var deferred;
            deferred = $q.defer();
            //验证验证码；
            $http.get('/~/phone/code', {params: {phone: phone}}).success(function (data) {
                if (data) {
                    return deferred.resolve(data);
                } else {
                    return deferred.reject(data);
                }
            }).error(function (error) {
                return deferred.reject(error);
            });
            return deferred.promise;
        }
    }

});

/********************article模块****************************/
consoleApp.factory("article", function ($http, $q, $cookies) {

    return {
        write: function (article) {
            console.log(JSON.stringify(article));
            var deferred;
            deferred = $q.defer();
            $http.post('/~/article', {article: article}).success(function (data) {
                if (data) {
                    return deferred.resolve(data);
                } else {
                    return deferred.reject(data);
                }
            }).error(function (error) {
                return deferred.reject(error);
            });
            return deferred.promise;
        },
        articleList: function (uid, page, pageSize) {
            var deferred;
            deferred = $q.defer();
            $http.get('/~/article/list', {params: {uid: uid, page: page, pageSize: pageSize}}).success(function (data) {
                if (data) {
                    return deferred.resolve(data);
                } else {
                    return deferred.reject(data);
                }
            }).error(function (error) {
                return deferred.reject(error);
            });
            return deferred.promise;
        },
        typeList: function () {
            var deferred;
            deferred = $q.defer();
            $http.get('/~/article/types', {}).success(function (data) {
                if (data) {
                    return deferred.resolve(data);
                } else {
                    return deferred.reject(data);
                }
            }).error(function (error) {
                return deferred.reject(error);
            });
            return deferred.promise;
        },
        categoryList: function (parentCategory) {
            var deferred;
            deferred = $q.defer();
            $http.get('/~/article/categories', {params: {parentCategory: parentCategory}}).success(function (data) {
                if (data) {
                    return deferred.resolve(data);
                } else {
                    return deferred.reject(data);
                }
            }).error(function (error) {
                return deferred.reject(error);
            });
            return deferred.promise;
        },
        articleDetail: function (articleId) {
            var deferred;
            deferred = $q.defer();
            $http.get('/~/article/detail', {params: {articleId: articleId}}).success(function (data) {
                if (data) {
                    return deferred.resolve(data);
                } else {
                    return deferred.reject(data);
                }
            }).error(function (error) {
                return deferred.reject(error);
            });
            return deferred.promise;
        },
        approval: function (approval) {
            var deferred;
            deferred = $q.defer();
            $http.post('/~/approval', {approval: approval}).success(function (data) {
                if (data) {
                    return deferred.resolve(data);
                } else {
                    return deferred.reject(data);
                }
            }).error(function (error) {
                return deferred.reject(error);
            });
            return deferred.promise;
        },
        oppose: function (oppose) {
            var deferred;
            deferred = $q.defer();
            $http.post('/~/oppose', {oppose: oppose}).success(function (data) {
                if (data) {
                    return deferred.resolve(data);
                } else {
                    return deferred.reject(data);
                }
            }).error(function (error) {
                return deferred.reject(error);
            });
            return deferred.promise;
        },
        commentList: function (articleId) {
            var deferred;
            deferred = $q.defer();
            $http.get('/~/article/comment/list', {params: {articleId: articleId}}).success(function (data) {
                if (data) {
                    return deferred.resolve(data);
                } else {
                    return deferred.reject(data);
                }
            }).error(function (error) {
                return deferred.reject(error);
            });
            return deferred.promise;
        }
    }

});


/********************user模块****************************/
consoleApp.factory("user", function ($http, $q, $cookies) {
    var emailActiveCode = "";//邮箱激活码；

    return {
        /*******************登录******************************************************/
        loginVerify: function (user) {
            //alert("MainService.js->loginVerify(1)");

            var deferred;
            deferred = $q.defer();
            //验证验证码；
            $http.post('/~/login', {user: user}).success(function (data) {
                if (data) {
                    return deferred.resolve(data);
                } else {
                    swal("", "用户名或密码错误!", "error");
                    return deferred.reject(data);
                }
            }).error(function (error) {
                return deferred.reject(error);
            });
            return deferred.promise;
        },
        /**********注册**********************************************************/
        registerAccount: function (register) {
            console.log("从controller拿取的注册用户为" + JSON.stringify(register));
            var deferred;
            deferred = $q.defer();
            //先验证验证码，成功后再注册；
            // $http.get("/ccap/checkCode", {params: {upperCode: verifyCode.toUpperCase()}}).success(function (data) {
//                console.log("注册时经过ccap后返回的data为："+data);
//                 if (data) {
//                    console.log(checkRegisterForm(registerUser));
//                     if (checkRegisterForm(registerUser)) {
            $http.post('/~/register', {user: register}).success(function (data) {
//                            console.log("service注册成功返回"+JSON.stringify(data));
                return deferred.resolve(data);
            }).error(function (data) {
                swal("", "注册失败，请重新尝试！", "error");
                changeCode();
                return deferred.reject(data);
            });
            // }

            // } else {
            //     swal("", "验证码错误！", "error");
            //     changeCode();
            //     return deferred.reject(data);
            // }
            // }).error(function (data) {
            //     swal("", "验证码验证失败！", "error");
            //     changeCode();
            //     return deferred.reject(data);
            // });
            return deferred.promise;
        },
        /************************给用户发送普通信息邮件--主要用于转让*********************************/
        sendTransferEmail: function (receiveEmail) {
            var deferred = $q.defer();
            var user = JSON.parse($cookies.user);
//            console.log("发邮件时"+emailActiveCode);
            $http.post('/sendEmail/sendTransEmail', {
                receiveEmail: receiveEmail,
                sender: user.loginName
            }).success(function (data) {
                if (data) {
//                    console.log("邮件发送成功");
                    return deferred.resolve(data);
                } else {
//                    console.log("邮件发送失败");
                    return deferred.reject(data);
                }
            }).error(function (err) {
                console.log(err);
                return deferred.reject(err);
            });
            return deferred.promise;
        },
        /***************注册--给用户发送激活邮件**************************/
        sendActiveEmail: function (registerUser, activeEmailCode) {
            _showMask();
            var deferred = $q.defer();
            emailActiveCode = activeEmailCode;
//            console.log("发邮件时"+emailActiveCode);
            $http.post('/sendEmail', {
                email: registerUser.email,
                activeEmailCode: activeEmailCode
            }).success(function (data) {
                if (data) {
                    _hideMask();
//                   console.log("邮件发送成功");
                    swal("", "邮件发送成功", "success");
                    return deferred.resolve(data);
                } else {
                    _hideMask();
                    swal("", "邮件发送失败", "error");
                    return deferred.reject(data);
                }
            }).error(function (err) {
                console.log(err);
                return deferred.reject(err);
            });
            return deferred.promise;
        },
        /***************修改邮箱--给用户发送修改邮箱后的激活邮件**************************/
        sendActiveChangeEmail: function (registerUser, activeEmailCode) {
            _showMask();
            var deferred = $q.defer();
            emailActiveCode = activeEmailCode;
//            console.log("发邮件时"+emailActiveCode);
            $http.post('/sendEmail/reSendEmail', {
                email: registerUser.email,
                activeEmailCode: activeEmailCode
            }).success(function (data) {
                if (data) {
                    _hideMask();
//                   console.log("邮件发送成功");
                    swal("", "邮件发送成功", "success");
                    return deferred.resolve(data);
                } else {
                    swal("", "邮件发送失败", "error");
                    return deferred.reject(data);
                }
            }).error(function (err) {
                console.log(err);
                return deferred.reject(err);
            });
            return deferred.promise;
        },
        /***************重发激活邮件--给用户成重新发送账号激活邮件***************/
        reSendActiveEmail: function (email, activeEmailCode) {
            var deferred = $q.defer();
            emailActiveCode = activeEmailCode;
//            console.log("发邮件时"+emailActiveCode);
            $http.post('/sendEmail', {email: email, activeEmailCode: activeEmailCode}).success(function (data) {
                if (data) {
//                    console.log("邮件发送成功");
                    return deferred.resolve(data);
                } else {
//                    console.log("邮件发送失败");
                    return deferred.reject(data);
                }
            }).error(function (err) {
                console.log(err);
                return deferred.reject(err);
            });
            return deferred.promise;
        },
        /**************激活账号**********************************************/
        activeEmail: function (activeCode) {
//            console.log("激活时:"+activeCode);
            var deferred = $q.defer();
            $http.post('/sendEmail/active', {activeCode: activeCode}).success(function (data) {
//                console.log("激活邮件返回的值data"+data);
                if (data) {
                    return deferred.resolve(data);
                } else {
                    return deferred.reject(data);
                }
            }).error(function (error) {
                console.log(error);
                return deferred.reject(error);
            })
            return deferred.promise;
        },
        /****************忘记密码验证邮箱*********************************************/
        verifyEmail: function (nameOrEmail) {
//            console.log("service中拿到的用户名或验证邮箱是:"+nameOrEmail);
            var deferred = $q.defer();
            $http.post("/login/verifyEmail", {nameOrEmail: nameOrEmail}).success(function (data) {
                if (data != false) {
//                    console.log("返回的data"+data);
                    return deferred.resolve(data);
                } else {
                    return deferred.reject(data);
                }
            }).error(function (data) {
//                console.log("没有拿到返回的token"+data);
                return deferred.reject(data);
            });
            return deferred.promise;
        },
        /**********************发送重置密码的邮件******************************************/
        sendResetPwdEmail: function (email, emailToken) {
            var deferred = $q.defer();
            $http.post("/sendEmail/sendFindPwdEmail", {email: email, emailToken: emailToken}).success(function (data) {
                if (data) {
//                    console.log("service中:发送邮件成功");
                    return deferred.resolve(data);
                } else {
//                    console.log("service中:发送邮件失败");
                    return deferred.reject(data);
                }
            }).error(function (err) {
                return deferred.reject(err);
            });
            return deferred.promise;
        },
        /**********************重置密码*****************************************/
        resetPwd: function (newPassword, emailToken) {
            var deferred = $q.defer();
//            console.log(newPassword+"===="+emailToken);
            $http.put("/login/resetPwd", {newPassword: newPassword, emailToken: emailToken}).success(function (data) {
//                console.log(data);
                if (data) {
                    return deferred.resolve(data);
                } else {
                    return deferred.reject(data);
                }
            }).error(function (err) {
                return deferred.reject(err);
            });
            return deferred.promise;
        },
        /*********************是否存在该用户**********************************************/
        hasUser: function (receiver) {
            var deferred = $q.defer();
//            console.log("是否存在该用户："+receiver);
            $http.get("/login/hasUser", {params: {receiver: receiver}}).success(function (data) {
                if (data.email != "") {
                    return deferred.resolve(data);
                } else {
                    return deferred.reject(data);
                }
            }).error(function (err) {
                return deferred.reject(err);
            });
            return deferred.promise;
        }
    }
});

/********************usercenter模块****************************/
consoleApp.factory("usercenter", function ($http, $q, $cookies) {
    return {
        pageUsers: function (page, pageSize) {
            var deferred;
            deferred = $q.defer();
            $http.get('/~/system/usercenter/pageable', {params: {page: page, pageSize: pageSize}}).success(function (data) {
                if (data) {
                    return deferred.resolve(data);
                } else {
                    return deferred.reject(data);
                }
            }).error(function (error) {
                return deferred.reject(error);
            });
            return deferred.promise;
        }
    }
});
/********************toutiao模块****************************/
consoleApp.factory("toutiao", function ($http, $q, $cookies) {
    return {
        overview: function (page, pageSize) {
            var deferred;
            deferred = $q.defer();
            //验证验证码；get 传参：{params:{page: page,pageSize:pageSize}}
            $http.get('/~/hotspot/overview', {params: {page: page, pageSize: pageSize}}).success(function (data) {
                if (data) {
                    return deferred.resolve(data);
                } else {
                    swal("", "获取头条信息失败!", "error");
                    return deferred.reject(data);
                }
            }).error(function (error) {
                return deferred.reject(error);
            });
            return deferred.promise;
        }
    }
});
/********************tools模块****************************/
consoleApp.factory("tools", function ($http, $q, $cookies) {
    return {
        dateFormat: function (src, format, type) {
            var deferred;
            deferred = $q.defer();
            $http.get('/~/tools/format', {params: {src: src, format: format, type: type}}).success(function (data) {
                if (data) {
                    return deferred.resolve(data);
                } else {
                    swal("", "转换失败!", "error");
                    return deferred.reject(data);
                }
            }).error(function (error) {
                return deferred.reject(error);
            });
            return deferred.promise;
        },
        codec: function (src, type) {
            var deferred;
            deferred = $q.defer();
            $http.get('/~/tools/codec', {params: {src: src, type: type}}).success(function (data) {
                if (data) {
                    return deferred.resolve(data);
                } else {
                    swal("", "编解码失败!", "error");
                    return deferred.reject(data);
                }
            }).error(function (error) {
                return deferred.reject(error);
            });
            return deferred.promise;
        },
        dencrypt: function (dencryption) {
            var deferred;
            deferred = $q.defer();
            $http.post('/~/tools/dencrypt', {dencryption: dencryption}).success(function (data) {
                if (data) {
                    return deferred.resolve(data);
                } else {
                    swal("", "加解密失败!", "error");
                    return deferred.reject(data);
                }
            }).error(function (error) {
                return deferred.reject(error);
            });
            return deferred.promise;
        }
    }
});
/***************************账户模块******************************/
consoleApp.factory("account", function ($http, $q, $cookies) {
    return {
        /************************修改密码****************************************/
        changePwd: function (userId, oldPwd, newPwd) {
//            console.log("service中拿到的userId="+userId+"//oldPwd："+oldPwd+"//newPwd:"+newPwd);
            var deferred = $q.defer();
            $http.put("/login/changePwd", {userId: userId, oldPwd: oldPwd, newPwd: newPwd}).success(function (data) {
                if (data) {
//                   console.log("返回的数据:"+JSON.stringify(data));
                    return deferred.resolve(data);
                } else {
                    return deferred.reject(data);
                }
            }).error(function (err) {
                console.log("err:" + err);
                return deferred.reject(err);
            });
            return deferred.promise;
        },
        /*****************账户基本资料*******************/
        getAccountInfo: function (userId) {
            var deferred = $q.defer();
//            console.log("service:userId="+userId);
            $http.get("/account", {params: {userId: userId}}).success(function (data) {
//                console.log("service:"+JSON.stringify(data));
                return deferred.resolve(data);
            }).error(function (error) {
                return deferred.reject(error);
            });
            return deferred.promise;
        },
        /******************修改邮箱第一步——验证邮箱是否存在*******************/
        checkInputEmail: function (changeEmail, userId) {
//            console.log("从controller拿到的："+JSON.stringify(changeEmail)+"userId="+userId);
            var deferred = $q.defer();
            $http.get("/ccap/checkCode", {params: {upperCode: changeEmail.verifyCode.toUpperCase()}}).success(function (data) {
//                console.log("修改邮件时经过ccap后返回的data为："+data);
                if (data) {
                    //验证旧邮箱；
                    $http.put("/account/checkOldEmail", {
                        oldEmail: changeEmail.oldEmail,
                        userId: userId
                    }).success(function (data) {
                        if (data) {
//                            console.log("service中修改邮箱："+data);
                            return deferred.resolve(data);
                        } else {
                            swal("", "邮箱输入错误!", "error");
                            changeCode();
                            return deferred.reject(data);
                        }
                    }).error(function (error) {
                        return deferred.reject(error);
                    });
                } else {
                    swal("", "验证码错误！", "error");
                    changeCode();
                }
            }).error(function (err) {
                swal("", "验证码验证失败！", "error");
                changeCode();
                return deferred.reject(err);
            });
            return deferred.promise;
        },
        /*****************修改邮箱第二步——注册新邮箱并返回token*****************/
        registNewEmail: function (userId, newEmail) {
            var deferred = $q.defer();
//            console.log("从controller拿到的：userID="+userId+"-----"+newEmail);
            $http.put("/account/changeRegistEmail", {userId: userId, newEmail: newEmail}).success(function (data) {
//                console.log(JSON.stringify(data));
                if (data.token != null) {
                    return deferred.resolve(data.token);
                } else {
                    return deferred.reject(data);
                }
            }).error(function (error) {
                console.log(error);
                return deferred.reject(error);
            });
            return deferred.promise;

        }
    }
});
/**************************touchc插件应用模块*****************************/
consoleApp.factory("TouchC", function ($http, $q, $cookies) {
    return {
        //创建touchc应用；
        addTouchCApp: function (app, uuid) {
            var deferred = $q.defer();
//             console.log("service中创建touchc应用："+JSON.stringify(app)+"//uuid="+uuid);
            $http.post("/touchcApp", {app: app, uuid: uuid}).success(function (data) {
                if (data) {
                    return deferred.resolve(data);
                } else {
                    return deferred.reject(data);
                }
            }).error(function (err) {
                return deferred.reject(err);
            });
            return deferred.promise;
        },
        //获取touchc应用列表--分页；
        getPageOfTouchCAppList: function (uuid, page, pageSize) {
            var deferred = $q.defer();
//             console.log("uuid="+uuid+"//page="+page+"//pageSize="+pageSize);
            $http.get("/touchcApp/pageOfTouchcAppList", {
                params: {
                    uuid: uuid,
                    page: page,
                    pageSize: pageSize
                }
            }).success(function (data) {
                return deferred.resolve(data);
            }).error(function (err) {
                return deferred.reject(err);
            });
            return deferred.promise;
        },
        //获取touchc应用列表--不分页；
        getAllTouchCApps: function (uuid) {
            var deferred = $q.defer();
//             console.log("uuid="+uuid);
            $http.get("/touchcApp/touchcAllAppList", {params: {uuid: uuid}}).success(function (data) {
//                 console.log("service中获得应用列表:"+JSON.stringify(data));
                if (data.length != 0) {
                    return deferred.resolve(data);
                } else {
                    return deferred.reject(data);
                }
            }).error(function (err) {
                return deferred.reject(err);
            });
            return deferred.promise;
        },
        //获取应用详情；
        getTouchcSignalAppInfo: function (appId) {
            var user = JSON.parse($cookies.user);
//        console.log("service："+JSON.stringify(user));
            var deferred = $q.defer();
//             console.log("拿到的appId="+appId);
            $http.get('/touchcApp/appInfo', {params: {uuid: user.uuid, appId: appId}}).success(function (data) {
                if (data.id) {
//               console.log("返回的应用详情:"+JSON.stringify(data));
                    return deferred.resolve(data);
                } else {
                    return deferred.reject(data);
                }
            }).error(function (error) {
                console.log(error);
                return deferred.reject(error);
            });
            return deferred.promise;
        },
        //更新应用信息详情；
        updateTouchcApp: function (updateApp, appId) {
            var deferred = $q.defer();
            var user = JSON.parse($cookies.user);
//             console.log("更新应用信息:"+JSON.stringify(updateApp));
            $http.post("/touchcApp/updateAppInfo", {
                updateApp: updateApp,
                uuid: user.uuid,
                appId: appId
            }).success(function (data) {
                if (data) {
//                     console.log("应用更新结果:"+data);
                    return deferred.resolve(data);
                } else {
                    return deferred.reject(data);
                }
            }).error(function (err) {
                console.log(err);
                return deferred.reject(err);
            });
            return deferred.promise;
        },
        //创建应用的版本；
        addTouchcVersion: function (appId, version) {
            var deferred = $q.defer();
//        console.log("service:"+appId+"version---"+JSON.stringify(version));
            $http.post("/touchcApp/addVersion", {appId: appId, version: version}).success(function (data) {
                if (data) {
                    return deferred.resolve(data);
                } else {
                    return deferred.reject(data);
                }
            }).error(function (err) {
                return deferred.reject(err);
            });
            return deferred.promise;
        },
        //分页获取应用的版本列表；
        getTouchcAppVeriosnList: function (appId, page, pageSize) {
            var deferred = $q.defer();
            $http.get("/touchcApp/getAppVersionList", {
                params: {
                    appId: appId,
                    page: page,
                    pageSize: pageSize
                }
            }).success(function (data) {
                return deferred.resolve(data);
            }).error(function (err) {
                return deferred.reject(err);
            });
            return deferred.promise;
        },
        //删除touchc应用；
        deleteApp: function (uuid, appId) {
            var deferred = $q.defer();
            var user = JSON.parse($cookies.user);
            $http.delete("/touchcApp/deleteApp", {params: {uuid: user.uuid, appId: appId}}).success(function (data) {
                if (data) {
                    return deferred.resolve(data);
                } else {
                    return deferred.reject(data);
                }
            }).error(function (err) {
                return deferred.reject(err);
            });
            return deferred.promise;
        },
        //发布touchc版本；
        publishTouchcVerison: function (versionId) {
            var deferred = $q.defer();
//             console.log("service:"+versionId);
            $http.post("/touchcApp/publishTouchcVersion", {versionId: versionId}).success(function (data) {
//                 console.log(data);
                if (data) {
                    return deferred.resolve(data);
                } else {
                    return deferred.reject(data);
                }
            }).error(function (err) {
                return deferred.reject(err);
            });
            return deferred.promise;
        },
        //取消发布版本；
        unPublishTouchcVerison: function (versionId) {
//             console.log("service:"+versionId);
            var deferred = $q.defer();
            $http.post("/touchcApp/onPublishTouchcVersion", {versionId: versionId}).success(function (data) {
//                 console.log(data);
                if (data) {
                    return deferred.resolve(data);
                } else {
                    return deferred.reject(data);
                }
            }).error(function (err) {
                return deferred.reject(err);
            });
            return deferred.promise;
        },
        //启用和禁用touchc应用版本；
        enableTouchcVersion: function (versionId) {
            var deferred = $q.defer();
//             console.log("service:versionId"+versionId);
            $http.get("/touchcApp/enableTouchcVersion", {params: {versionId: versionId}}).success(function (data) {
                if (data) {
                    return deferred.resolve(data);
                } else {
                    return deferred.reject(data);
                }
            }).error(function (err) {
                return deferred.reject(err);
            });
            return deferred.promise;
        },
        //删除touchc应用版本;
        deleteTouchcVersion: function (versionIds, appId) {
            var deferred = $q.defer();
            var user = JSON.parse($cookies.user);
//             console.log("版本数组："+versionIds+"应用id:"+appId+"----"+user.uuid);
            $http.post("/touchcApp/deleteTouchcVersion", {
                appId: appId,
                uuid: user.uuid,
                versionIds: versionIds
            }).success(function (data) {
                if (data) {
                    return deferred.resolve(data);
                } else {
                    return deferred.reject(data);
                }
            }).error(function (err) {
                return deferred.reject(err);
            });
            return deferred.promise;
        },
        //转让touchc应用;
        transferTouchcApp: function (appId, receiver) {
            var deferred = $q.defer();
            var user = JSON.parse($cookies.user);
//             console.log("service中转让："+appId+"//receiver"+receiver+"//uuid="+user.uuid);
            $http.put("/touchcApp/transferTouchcApp", {
                appId: appId,
                uuid: user.uuid,
                receiver: receiver
            }).success(function (data) {
                if (data) {
                    return deferred.resolve(data);
                } else {
                    return deferred.reject(data);
                }
            }).error(function (err) {
                return deferred.reject(err);
            });
            return deferred.promise;
        },
        //更新touchc版本内容；
        updateTouchcVersion: function (appId, touchcVersionId, appTouchcVersion) {
//             console.log("appid="+appId+"//touchcVersionId:"+touchcVersionId+"//appTouchcVersion:"+JSON.stringify(appTouchcVersion));
            var deferred = $q.defer();
            $http.post("/touchcApp/updateTouchcVersion", {
                appId: appId,
                touchcVersionId: touchcVersionId,
                appTouchcVersion: appTouchcVersion
            }).success(function (data) {
                if (data) {
                    return deferred.resolve(data);
                } else {
                    return deferred.reject(data);
                }

            }).error(function (err) {
                return deferred.reject(err);
            });
            return deferred.promise;
        }

    }
});






