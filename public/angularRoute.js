var consoleApp=angular.module("consoleApp",[
    'ui.router',
    'consoleApp.controllers',
    'consoleApp.services'
]);
/**
 * 由于整个应用都会和路由打交道，所以这里把$state和$stateParams这两个对象放到$rootScope上，方便其它地方引用和注入。
 * 这里的run方法只会在angular启动的时候运行一次。
 * @param  {[type]} $rootScope
 * @param  {[type]} $state
 * @param  {[type]} $stateParams
 * @return {[type]}
 */
consoleApp.run(function ($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
});
/**
 * 配置路由。
 * 注意这里采用的是ui-router这个路由，而不是ng原生的路由。
 * ng原生的路由不能支持嵌套视图，所以这里必须使用ui-router。
 * @param  {[type]} $stateProvider
 * @param  {[type]} $urlRouterProvider
 * @return {[type]}
 */
consoleApp.config(function ($stateProvider, $urlRouterProvider,$locationProvider) {
    $urlRouterProvider.otherwise('/index');
    $stateProvider
        .state('index', {
            url: '/index',
            templateUrl: 'views/index.html',
            controller: 'IndexController'
        })
        .state('register', {
            url: '/register',
            templateUrl: 'views/user/register.html',
            controller: 'RegisterController'
        })//头条新闻路由
        .state('navi', {//导航总路由
            url: '/navi',
            templateUrl: 'views/navi.html',
            controller: 'NaviController'
        })
        .state('navi.toutiao', {
            url: '/toutiao',
            templateUrl: 'views/toutiao/toutiao.html',
            controller: 'ToutiaoController'
        })
        .state('navi.dateTools', {
            url: '/tools',
            templateUrl: 'views/tools/date_tools.html',
            controller: 'DateToolsController'
        })
        .state('navi.codec', {
            url: '/codec',
            templateUrl: 'views/codec/codec.html',
            controller: 'CodecController'
        })
        .state('navi.regex', {
            url: '/regex',
            templateUrl: 'views/tools/regex.html',
            controller: 'RegexController'
        })
        .state('login', {
            url: '/login',
            templateUrl: 'views/user/login.html',
            controller: 'LoginCtrl'
        })
        .state('loginOut', {
            url: '/loginOut',
            controller: 'LoginOutCtrl'
        })
    $locationProvider.html5Mode(true);
});