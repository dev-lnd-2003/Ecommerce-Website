app.service("productService", function ($http, $filter, $route) {


    this.getClothesData = function () {
        return $http.get("./../../db/clothes.json").then(function (reponse) {
            return reponse.data;
        })
    }

    this.search = function (data, keyword) {
        return $filter('filter')(data, { product_name: keyword })
    }

    let cartItems = []

    this.addToCart = function (product, user) {
        let exists = false;
        for (let i = 0; i < cartItems.length; i++) {
            if (cartItems[i].product.id === product.id) {
                cartItems[i].quantity++;
                exists = true;
                break;
            }
        }


        if (!exists) {
            cartItems.push({
                product,
                user,
                quantity: 1,
            })
        }
        // Lưu giỏ hàng vào localStorage
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }

    this.removeProduct = function (index) {
        cartItems.splice(index, 1)
        localStorage.setItem('cart', JSON.stringify(cartItems))

    }
})