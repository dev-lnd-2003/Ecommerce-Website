app.controller("cartCtrl", function ($scope, $route, $rootScope) {
    $scope.cartItems = [];

    $scope.totalPrice = 0;
    $scope.choose = false;
    if (localStorage.getItem('cart')) {
        $scope.cartItems = JSON.parse(localStorage.getItem('cart'))
        console.log($scope.cartItems);

    }

    for (let i = 0; i < $scope.cartItems.length; i++) {
        let price = $scope.cartItems[i].product.price;
        let quantity = $scope.cartItems[i].quantity;

        $scope.totalPrice += price * quantity

    }

    // $rootScope.removeProduct = function (index) {
    //     $scope.cartItems.splice(index, 1)
    //     $route.reload()
    //     localStorage.setItem('cart', JSON.stringify($scope.cartItems))

    // }
})