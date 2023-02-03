app.controller("cartCtrl", function ($scope, $http) {
    $scope.cartItems = [];

    $scope.totalPrice = 0;
    $scope.choose = false;
    if (localStorage.getItem('cart')) {
        $scope.cartItems = JSON.parse(localStorage.getItem('cart'))
    }

    for (let i = 0; i < $scope.cartItems.length; i++) {
        let price = $scope.cartItems[i].product.price;
        let quantity = $scope.cartItems[i].quantity;
        $scope.totalPrice += price * quantity

    }


    // $http.get("http://localhost:3000/cart").then(function (reponse) {
    //     $scope.cart = reponse.data
    //     // Biến tạm 
    //     let tempCart = [];
    //     for (let i = 0; i < $scope.cart.length; i++) {
    //         console.log("cart : " + i);
    //         for (let j = 0; j < $scope.cart[i].cartItems.length; j++) {
    //             let found = false;
    //             for (let k = 0; k < tempCart.length; k++) {
    //                 if (tempCart[k].id === $scope.cart[i].cartItems[j].product.id) {
    //                     found = true;
    //                     tempCart[k].quantity++;
    //                     break;
    //                 }
    //             }
    //             if (!found) {
    //                 tempCart.push({
    //                     id: $scope.cart[i].cartItems[j].product.id,
    //                     quantity: 1
    //                 });
    //             }
    //         }
    //     }
    // })
})