app.controller("loginCtrl", function ($scope, $http, $location, $window, $route) {

    $scope.customers = []



    $http.get("http://localhost:3000/customers").then(function (reponse) {
        $scope.customers = reponse.data
        console.log($scope.customers);
    }, function (reponse) {
        alert("Lỗi")
    })

    if (localStorage.getItem('login')) {
        $location.path("/home")
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
    $scope.register = function () {
        let user = check_username($scope.usernameR, $scope.passwordR)
        let check_form1 = check_form($scope.fullnameR, $scope.usernameR, $scope.passwordR)

        if (check_form1) {

            if (user) {
                axios.post("http://localhost:3000/customers", {
                    username: $scope.usernameR,
                    password: $scope.passwordR,
                    fullname: $scope.fullnameR,
                    email: $scope.emailR,
                    avatar: "https://i.pinimg.com/564x/69/00/d1/6900d1523554b6df7edc14804d1eca68.jpg"
                }).then(function (response) {
                    console.log("ok")
                }).catch(function (error) {
                    console.log("not working")
                })
            } else {
                alert("Tài Khoản Đã Tồn Tại")
            }
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

    function check_username(username, password) {
        for (let i = 0; i < $scope.customers.length; i++) {
            if ($scope.customers[i].username == username && $scope.customers[i].password == password) {
                return false;
            }
        }
        return true;
    }

    function check_form(fullname, username, password) {
        if (fullname == null && username == null && password == null) {
            $scope.submitted = true
            $scope.message = "Không để trống"

            return false
        }
        // if (password.length < 7) {
        //     $scope.submitted = true
        //     $scope.message = "Vui Lòng Nhập Username Hơn 7 Kí Tự"
        //     return false
        // }

        return true

    }
})