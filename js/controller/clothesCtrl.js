app.controller("clothesCtrl", function ($scope, $http, $location, productService, $rootScope, $filter, $route) {

    // Lấy dữ liệu của sản phẩm
    $scope.products = []
    $scope.begin = 0;
    $scope.currentPage = 1

    productService.getClothesData().then(function (data) {

        $scope.products.clothes = data

        // Tính số trang
        $scope.pageCount = Math.ceil($scope.products.clothes.length / 20)

        // Lọc sản phẩm
        $scope.filteredProducts = productService.search($scope.products.clothes)

        // Lọc ra những brand name khác nhau 
        $scope.uniqueBrands = $filter('unique')($scope.products.clothes, 'brand_name')

        // Hàm tìm kiếm sản phẩm
        $rootScope.search = function () {

            $scope.filteredProducts = productService.search($scope.products.clothes, $rootScope.key)
            // Cập nhật lại số trang
            $scope.pageCount = Math.ceil($scope.filteredProducts.length / 20)

            // Nếu không tìm thấy sẽ thông báo
            if ($scope.filteredProducts.length === 0) {
                $scope.filteredProducts = productService.search($scope.products.clothes)
                alert("Sản Phẩm Không Tồn Tại")
            }
        }

    }, function () {
        alert("Lỗi")
    })


    // Hàm thêm sản phẩm vào giỏ hàng ($scope.cartItems)
    $scope.addToCart = function (product) {
        if (localStorage.getItem('login')) {

            $scope.info = JSON.parse(localStorage.getItem('login'))

            productService.addToCart(product, $scope.info)

            $scope.cartItems = JSON.parse(localStorage.getItem('cart'))
            for (let i = 0; i < $scope.cartItems.length; i++) {
                $rootScope.quantityItems = i + 1;
                console.log("Số lượng : " + i);
            }
            $rootScope.isQuantityItemsShow = false
            $rootScope.isQuantityItemsHide = false

        } else {
            $location.path("/login")
            alert("Vui Lòng Đăng Nhập")
        }

    }

    $rootScope.removeProduct = function (index) {


        for (let i = 0; i < $scope.cartItems.length; i++) {
            if (localStorage.getItem('cart')) {
                $scope.cartItems = JSON.parse(localStorage.getItem('cart'))
                if ($scope.cartItem == 0) {
                    $rootScope.quantityItem = 0
                }
            }
            $rootScope.quantityItems = i;
        }
        $route.reload()
        productService.removeProduct(index)
    }
    // Trang trước
    $scope.prev = function () {
        if ($scope.begin > 0) {
            $scope.begin -= 20
        }
    }

    // Trang sau
    $scope.next = function () {
        if ($scope.begin < ($scope.pageCount - 1) * 20) {
            $scope.begin += 20
        }
    }

    // Trang tiếp theo
    $scope.goToPage = (pageNumber) => {
        $scope.currentPage = pageNumber;
        $scope.begin = (pageNumber - 1) * 20; // 24 sản phẩm/trang
    }

})

app.filter("unique", function () {

    return function (data, propertyName) {

        let uniqueValues = []

        for (let i = 0; i < data.length; i++) {

            // lay gia tri cua thuoc tinh tuong ung

            let value = data[i][propertyName]

            // neu gia tri chua ton tai trong mang uniquevalues, thi them vao mang

            if (uniqueValues.indexOf(value) === -1) {

                uniqueValues.push(value)
            }

        }
        return uniqueValues;
    }

});