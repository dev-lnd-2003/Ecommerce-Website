let app = angular.module("myApp", ["ngRoute"])

app.config(($routeProvider) => {
    $routeProvider.when("/home", {
        templateUrl: "page/homepage.html",
    }).when("/login", {
        templateUrl: "page/login.html"
    }).otherwise({
        redirectTo: "/home"
    })
}) 