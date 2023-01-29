let app = angular.module("myApp", ["ngRoute"])

app.config(($routeProvider) => {
    $routeProvider.when("/home", {
        templateUrl: "page/homepage.html",
    }).when("/login", {
        templateUrl: "page/login.html",
        controller: "loginCtrl"
    }).when("/clothes", {
        templateUrl: "page/clothes.html",
        controller: "clothesCtrl"
    }).otherwise({
        redirectTo: "/home"
    })
}) 