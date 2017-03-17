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
consoleApp.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/index');
    $stateProvider
        .state('index', {
            url: '/index',
            templateUrl: 'views/user/login.html',
            controller: 'LoginCtrl'
        })
        .state('register', {
            url: '/register',
            templateUrl: 'views/user/register.html',
            controller: 'RegisterCtrl'
        })
        .state('home', {
            url: '/home',
            templateUrl: 'views/home/home.html',
            controller: 'HomeCtrl'
        })
        .state('home.truelove', {
            url: '/truelove',
            templateUrl: 'views/sweet/truelove.html',
            controller: 'HomeCtrl'
        })
        .state('home.whisper', {
            url: '/whisper',
            templateUrl: 'views/sweet/whisper.html',
            controller: 'HomeCtrl'
        })
        .state('home.blog', {
            url: '/blog',
            templateUrl: 'views/article/blog.html',
            controller: 'HomeCtrl'
        })
        .state('home.drain', {
            url: '/drain',
            templateUrl: 'views/article/drain.html',
            controller: 'HomeCtrl'
        })
        .state('home.essay', {
            url: '/essay',
            templateUrl: 'views/article/essay.html',
            controller: 'HomeCtrl'
        })
        .state('home.wish', {
            url: '/wish',
            templateUrl: 'views/article/wish.html',
            controller: 'HomeCtrl'
        })
        .state('home.photoEssay', {
            url: '/photoEssay',
            templateUrl: 'views/photo/photoEssay.html',
            controller: 'HomeCtrl'
        })
        .state('home.photoManagement', {
            url: '/photoManagement',
            templateUrl: 'views/photo/photoManagement.html',
            controller: 'HomeCtrl'
        })
        .state('home.photoTourism', {
            url: '/photoTourism',
            templateUrl: 'views/photo/photoTourism.html',
            controller: 'HomeCtrl'
        })
        .state('home.videoManagement', {
            url: '/videoManagement',
            templateUrl: 'views/video/videoManagement.html',
            controller: 'HomeCtrl'
        })
        .state('home.videoRelease', {
            url: '/videoRelease',
            templateUrl: 'views/video/videoRelease.html',
            controller: 'HomeCtrl'
        })
        .state('home.videoCollection', {
            url: '/videoCollection',
            templateUrl: 'views/video/videoCollection.html',
            controller: 'HomeCtrl'
        })
        .state('home.musicManagement', {
            url: '/musicManagement',
            templateUrl: 'views/music/musicManagement.html',
            controller: 'HomeCtrl'
        })
        .state('home.musicRelease', {
            url: '/musicRelease',
            templateUrl: 'views/music/musicRelease.html',
            controller: 'HomeCtrl'
        })
        .state('home.musicPlayer', {
            url: '/musicPlayer',
            templateUrl: 'views/music/musicPlayer.html',
            controller: 'HomeCtrl'
        })
        .state('home.musicCollection', {
            url: '/musicCollection',
            templateUrl: 'views/music/musicCollection.html',
            controller: 'HomeCtrl'
        })

        .state('home.musicSquareFind', {
            url: '/musicSquareFind',
            templateUrl: 'views/musicSquare/musicSquareFind.html',
            controller: 'HomeCtrl'
        })
        .state('home.musicSquareClassify', {
            url: '/musicSquareClassify',
            templateUrl: 'views/musicSquare/musicSquareClassify.html',
            controller: 'HomeCtrl'
        })
        .state('home.musicSquareSinger', {
            url: '/musicSquareSinger',
            templateUrl: 'views/musicSquare/musicSquareSinger.html',
            controller: 'HomeCtrl'
        })
        .state('home.musicSquareHot', {
            url: '/musicSquareHot',
            templateUrl: 'views/musicSquare/musicSquareHot.html',
            controller: 'HomeCtrl'
        })

        .state('home.videoSquareMM', {
            url: '/videoSquareMM',
            templateUrl: 'views/videoSquare/videoSquareMM.html',
            controller: 'HomeCtrl'
        })
        .state('home.videoSquareDrama', {
            url: '/videoSquareDrama',
            templateUrl: 'views/videoSquare/videoSquareDrama.html',
            controller: 'HomeCtrl'
        })
        .state('home.videoSquareFilm', {
            url: '/videoSquareFilm',
            templateUrl: 'views/videoSquare/videoSquareFilm.html',
            controller: 'HomeCtrl'
        })
        .state('home.videoSquareAnime', {
            url: '/videoSquareAnime',
            templateUrl: 'views/videoSquare/videoSquareAnime.html',
            controller: 'HomeCtrl'
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
        .state('activeAccount', {
            url: '/activeAccount',
            controller:"activeAccountCtrl"
        })
        .state('activeEmail', {
            url: '/activeEmail',
            controller:"activeEmailCtrl"
        })
        .state('findPwd', {
            url: '/findPwd',
            templateUrl: 'views/user/findPwd.html',
            controller:"findPwdCtrl"
        })
        .state('resetPwd', {
            url: '/resetPwd',
            templateUrl: 'views/user/resetPwd.html',
            controller:"resetPwdCtrl"
        })
        .state('userAccountSafe', {
            url: '/userAccountSafe',
            templateUrl: 'views/user/userAccountSafe.html',
            controller:"userAccountSafeCtrl"
        })
        .state('changeEmail', {
            url: '/changeEmail',
            templateUrl: 'views/user/changeEmail/changeEmail.html'
        })
        .state('changeEmail.verifyEmail', {
            url: '/verifyEmail',
            templateUrl: 'views/user/changeEmail/emailVerify.html',
            controller:"userAccountSafeCtrl"
        })
        .state('changeEmail.inputNewEmail', {
            url: '/inputNewEmail',
            templateUrl: 'views/user/changeEmail/inputNewEmail.html',
            controller:"userAccountSafeCtrl"
        })
        .state('changeEmail.getEmail', {
            url: '/getEmail',
            templateUrl: 'views/user/changeEmail/getEmail.html',
            controller:"userAccountSafeCtrl"
        })
        .state('changeEmail.finishEmail', {
            url: '/finishEmail',
            templateUrl: 'views/user/changeEmail/finishEmail.html',
            controller:"userAccountSafeCtrl"
        })
        .state('userInfo', {
            url: '/userInfo',
            templateUrl: 'views/user/userInfo.html',
            controller:'accountCtrl'
        })
        .state('userNews', {
            url: '/userNews',
            templateUrl: 'views/user/userNews.html'
        })
        .state('touchc', {
            url: '/touchc',
            templateUrl: 'views/touchc/touchc.html',
            controller:"touchcCtrl"
        })
        .state('docs', {
            url: '/docs',
            templateUrl: 'views/docs/doc.html'
        })
        .state('touchcApp', {
            url: '/touchcApp',
            templateUrl: 'views/touchc/apps/app/app.html'
        })
        .state('touchcApp.basicInfo', {
            url: '/basicInfo',
            templateUrl: 'views/touchc/apps/app/appBasicInfo.html',
            controller:"signalTouchcCtrl"
        })
        .state('touchcApp.appUpdate', {
            url: '/appUpdate',
            templateUrl: 'views/touchc/apps/app/appUpdate.html',
            controller:"signalTouchcCtrl"
        })
        .state('touchcApp.appManage', {
            url: '/appManage',
            templateUrl: 'views/touchc/apps/app/appManage.html',
            controller:"signalTouchcCtrl"
        })
        .state('dataCount', {
            url: '/dataCount',
            templateUrl: 'views/touchc/apps/count/dataCount.html'
//            controller:"signalTouchcCtrl"
        })
});