app.controller("loginCtrl", function ($scope, $http, $location, $window, $route) {

    $scope.customesr = []
    $http.get("../../db/customer.json").then(function (reponse) {
        $scope.customers = reponse.data
        console.log($scope.customers)
    }, function (repone) {
        alert("Lỗi")
    })

    if (localStorage.getItem('login')) {
        $location.path("/home")

        $scope.info = angular.fromJson(localStorage.getItem('login'))
        console.log($scope.info);
    }
    $scope.login = function () {
        let user = check_login($scope.username, $scope.password)
        if (user) {
            localStorage.setItem('login', angular.toJson(user))
            $window.location.reload();
            $location.path("/home")
        } else {
            alert("Thông Tin Tài Khoản Không Hợp Lệ")
        }
    }

    function check_login(username, password) {
        for (let i = 0; i < $scope.customers.length; i++) {
            if ($scope.customers[i].username == username && $scope.customers[i].password == password) {
                return $scope.customers[i];

            }
        }
        return false;

    }
})