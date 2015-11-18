//Довольно часто требуется чтобы был красивый url
//http://mysyte.com/dashboard вместо http://mysyte.com/#/dashboard
//
//Как мы знает ExpressJS попадая на такой роут будет пытаться запустить такой роут на сервере
//но так как такого роута на сервере не существует - будет 404 ошибка

// чтобы этого не добустить нужно все серверные неизвестные роуты редиректить на файл index.html

// для этого необходимо создать middleware обязательно в конце объявления всех возможных роутов
// где-то в районе middleware 404 (см. точку входа ExpressJS)

// Redirect all unknown routes to index.html
app.all('/*', function(req, res) {
    res.sendfile(path.join(__dirname, '../../build/index.html')); //путь к index.html может быть разный
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

//ВАЖНО!!! - воизбежания конфликтов серверных и клиентских роутов
// все серверные роуты необходимо перевести с приставкой /api
// 
// /api/users/all
// /api/user/:id


//На стороне Angular необходимо укзать использование роутов без # хеша
//такая конфигурация называется html5mode
//и указывается в блоке .config точки инициализации Ангулар
angular.module('myApp', [
        'templates-app',
        'templates-common',
        'ngSanitize',
        'ui.router',
        'ngResource',
        'ngTagsInput',
        'ui.select'
    ])
.config(function myAppConfig($locationProvider, $stateProvider, $urlRouterProvider, stripeProvider) {
    $locationProvider.html5Mode(true); //<-------
    $urlRouterProvider.otherwise('/');
})


//Поледнее что нужно сделать, это указать браузеру что все пути начинаются с /
/*

<html>
	<head>
		<title>My application</title>
		<base href="/"> <!----ВОТ ЭТО------>
   		<meta name="viewport" content="width=device-width, initial-scale=1">
    	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
*/