$(document).ready(function () {
    let cart = []; // Array to track items and their quantities
    let totalValue = 0; // Total value of the cart

    function updateCart() {
        const cartItemsContainer = $(".cart-items");
        cartItemsContainer.empty();

        cart.forEach(item => {
            cartItemsContainer.append(`
                <div class="cart-item">
                    <p>${item.name} x${item.quantity} - $${item.price * item.quantity}</p>
                </div>
            `);
        });

        $("#total-value").text(totalValue); // Update the total value displayed
        $("#checkout").prop("disabled", cart.length === 0);
    }

    $(".add-to-cart").click(function () {
        const product = $(this).closest(".product");
        const id = product.data("id");
        const name = product.data("name");
        const price = product.data("price");

        // Check if the product is already in the cart
        let existingProduct = cart.find(item => item.id === id);

        if (existingProduct) {
            existingProduct.quantity += 1; // Increment quantity
        } else {
            cart.push({ id, name, price, quantity: 1 }); // Add new product with quantity 1
        }

        totalValue += price; // Add the price to the total value
        updateCart();
    });

    $("#checkout").click(function () {
        alert(`Total amount: $${totalValue}`); // Display the total value
        cart = [];
        totalValue = 0; // Reset total value
        updateCart();
    });
});
