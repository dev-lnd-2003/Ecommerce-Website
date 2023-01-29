app.controller("clothesCtrl", function ($scope, $location, productService, $rootScope) {

    $scope.products = []

    productService.getClothesData().then(function (data) {
        $scope.products.clothes = data

        $scope.filteredProducts = productService.search($scope.products.clothes)

        $rootScope.search = function () {
            $scope.filteredProducts = productService.search($scope.products.clothes, $rootScope.key)
            if ($scope.filteredProducts.length === 0) {
                $scope.filteredProducts = $filter('filter')($scope.products.clothes);
                alert("Sản Phẩm Không Tồn Tại")
            }
        }
    }, function () {
        alert("Lỗi")
    })



    $scope.addToCart = function (product) {
        if (localStorage.getItem('login')) {
            $scope.info = angular.fromJson(localStorage.getItem('login'))
            productService.addToCart(product, $scope.info.fullname)
        } else {
            $location.path("/login")
            alert("Vui Lòng Đăng Nhập")
        }

    }

})
