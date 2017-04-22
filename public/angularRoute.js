var consoleApp = angular.module("consoleApp", [
    'ui.router',
    'consoleApp.controllers',
    'consoleApp.services',
    'consoleApp.directives'
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
consoleApp.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
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
        })
        .state('hotspot', {//
            url: '/hotspot',
            templateUrl: 'views/toutiao/index.html',
            controller: 'NaviController'
        })//头条新闻路由
        .state('hotspot.toutiao', {//
            url: '/toutiao',
            templateUrl: 'views/toutiao/toutiao.html',
            controller: 'ToutiaoController'
        })//头条新闻路由
        .state('article', {//
            url: '/article',
            templateUrl: 'views/article/index.html',
            controller: 'NaviController'
        })//技术文章路由
        .state('article.technology', {//
            url: '/technology',
            templateUrl: 'views/article/technology.html',
            controller: 'ArticleController'
        })//技术文章路由
        .state('article.write', {//
            url: '/write',
            templateUrl: 'views/article/write.html',
            controller: 'ArticleController'
        })//技术文章路由
        .state('article.detail', {//
            url: '/detail/:articleId',
            templateUrl: 'views/article/article_detail.html',
            controller: 'ArticleDetailController'
        })//技术文章路由
        .state('tools', {//工具总路由
            url: '/tools',
            templateUrl: 'views/tools/index.html',
            controller: 'NaviController'
        })
        .state('tools.date', {
            url: '/date',
            templateUrl: 'views/tools/date_tools.html',
            controller: 'ToolsController'
        })
        .state('tools.codec', {
            url: '/codec',
            templateUrl: 'views/tools/codec.html',
            controller: 'ToolsController'
        })
        .state('tools.encrypt', {
            url: '/encrypt',
            templateUrl: 'views/tools/encrypt.html',
            controller: 'ToolsController'
        })
        .state('tools.regex', {
            url: '/regex',
            templateUrl: 'views/tools/regex.html'
        })
        .state('login', {
            url: '/login',
            templateUrl: 'views/user/login.html',
            controller: 'LoginCtrl'
        })
        .state('usercenter', {
            url: '/usercenter',
            templateUrl: 'views/usercenter/index.html'
        })
        .state('usercenter.article', {
            url: '/article',
            templateUrl: 'views/usercenter/article.html',
        })
        .state('usercenter.subscribe', {
            url: '/subscribe',
            templateUrl: 'views/usercenter/subscribe.html',
        })
        .state('usercenter.favorite', {
            url: '/favorite',
            templateUrl: 'views/usercenter/favorite.html',
        })
        .state('usercenter.help', {
            url: '/help',
            templateUrl: 'views/usercenter/help.html',
        })
        .state('system', {
            url: '/system',
            templateUrl: 'views/system/system.html',
            controller: 'SystemController'
        })
        .state('system.management', {
            url: '/management',
            templateUrl: 'views/system/outer/management.html',
            controller: 'SystemController'
        })
        .state('system.module', {
            url: '/module',
            templateUrl: 'views/system/outer/help.html',
            controller: 'SystemController'
        })
        .state('system.menu', {
            url: '/menu',
            templateUrl: 'views/system/outer/help.html',
            controller: 'SystemController'
        })
        .state('system.auth', {
            url: '/auth',
            templateUrl: 'views/system/outer/help.html',
            controller: 'SystemController'
        })
        .state('system.role', {
            url: '/role',
            templateUrl: 'views/system/outer/help.html',
            controller: 'SystemController'
        })
        .state('system.mapping', {
            url: '/mapping',
            templateUrl: 'views/system/outer/help.html',
            controller: 'SystemController'
        })
        .state('system.route', {
            url: '/route',
            templateUrl: 'views/system/outer/help.html',
            controller: 'SystemController'
        })
    $locationProvider.html5Mode(true);
});