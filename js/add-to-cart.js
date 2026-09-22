const CART_COUNT_KEY = "bitebox:cart-count";
const ADDED_LABEL_DURATION = 1400;

function readCartCount() {
    try {
        return Number(window.localStorage.getItem(CART_COUNT_KEY)) || 0;
    } catch (error) {
        return 0;
    }
}

function writeCartCount(count) {
    try {
        window.localStorage.setItem(CART_COUNT_KEY, String(count));
    } catch (error) {
        /* storage unavailable, badge stays session-only */
    }
}

function renderCartCount(count, animate) {
    const badge = document.getElementById("cart-count");
    if (!badge) {
        return;
    }

    badge.textContent = String(count);
    badge.hidden = count === 0;

    if (animate) {
        badge.classList.remove("pop");
        void badge.offsetWidth;
        badge.classList.add("pop");
    }
}

function showAddedState(button) {
    const originalMarkup = button.innerHTML;

    button.classList.add("added");
    button.innerHTML =
        '<img class="cart" src="assets/icons/cart.png" alt="" width="14" height="14"> Added to Cart';

    window.setTimeout(function () {
        button.classList.remove("added");
        button.innerHTML = originalMarkup;
    }, ADDED_LABEL_DURATION);
}

document.addEventListener("DOMContentLoaded", function () {
    renderCartCount(readCartCount(), false);

    const buttons = document.querySelectorAll("#menu-items article > button");

    buttons.forEach(function (button) {
        button.addEventListener("click", function () {
            if (button.classList.contains("added")) {
                return;
            }

            const count = readCartCount() + 1;
            writeCartCount(count);
            renderCartCount(count, true);
            showAddedState(button);
        });
    });
});
