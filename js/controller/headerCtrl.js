app.controller("headerCtrl", function ($scope, $location, $route, $window) {

    $scope.isUser = true
    $scope.isAvatar = true

    if (localStorage.getItem('login')) {
        $scope.isUser = false
        $scope.isAvatar = false
        $scope.info = angular.fromJson(localStorage.getItem('login'))
        $scope.avatar = $scope.info.avatar
        $scope.fullname = $scope.info.fullname
        console.log($scope.info);
    }

    $scope.logout = function () {
        localStorage.clear()
        $scope.isUser = true
        $scope.isAvatar = true
        $route.reload();
        $location.path("/login")
    }

})