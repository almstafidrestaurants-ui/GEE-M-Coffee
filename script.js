/* =====================================================
   GM QR MENU
   JavaScript الخاص بشاشة البداية
===================================================== */


/* =====================================================
   جلب عناصر الصفحة
===================================================== */

const splashScreen =
    document.getElementById("splashScreen");

const homeScreen =
    document.getElementById("homeScreen");

const loadingPercent =
    document.getElementById("loadingPercent");

const menuScreen =
    document.getElementById("menuScreen");

/* =====================================================
   NEW CUSTOMER = EMPTY CART
===================================================== */

sessionStorage.removeItem("gmCart");
/* =====================================================
   مدة التحميل
===================================================== */

/*
   2000 milliseconds = ثانيتين
*/

const loadingDuration = 2000;


/* =====================================================
   قيمة التحميل الحالية
===================================================== */

let progress = 0;


/* =====================================================
   تشغيل التحميل
===================================================== */

const loadingInterval = setInterval(() => {

    /* زيادة النسبة */

    progress++;


    /* عرض النسبة */

    loadingPercent.textContent =
        progress + "%";


    /* عندما تصل إلى 100% */

    if (progress >= 100) {

        /* إيقاف العداد */

        clearInterval(loadingInterval);


        /* فتح الصفحة الرئيسية */

        openHomeScreen();

    }

}, loadingDuration / 100);


/* =====================================================
   فتح الصفحة الرئيسية
===================================================== */
function openHomeScreen() {

    document.body.classList.remove("menu-active");

    document.body.classList.add("home-active");

    if (splashScreen) {
        splashScreen.classList.add("hidden");
    }

    if (homeScreen) {
        homeScreen.style.display = "flex";
    }

    if (menuScreen) {
      menuScreen.style.setProperty("display", "none", "important");
    }

}


/* =====================================================
   فتح المنيو
===================================================== */
function openMenu() {

    document.body.classList.remove("home-active");
    document.body.classList.add("menu-active");

    if (splashScreen) {
        splashScreen.classList.add("hidden");
    }

    if (homeScreen) {
        homeScreen.style.display = "none";
    }

    if (menuScreen) {
      menuScreen.style.setProperty("display", "block", "important");
    }

    window.scrollTo({
        top: 0,
        behavior: "instant"
    });
}
/* =====================================================
  رجوع لشلشة رئيسية
===================================================== */
function goHome() {

    document.body.classList.remove("menu-active");
    document.body.classList.add("home-active");

    if (menuScreen) {
        menuScreen.style.display = "none";
    }

    if (homeScreen) {
        homeScreen.style.display = "flex";
    }

    if (splashScreen) {
        splashScreen.classList.add("hidden");
    }

    window.scrollTo({
        top: 0,
        behavior: "instant"
    });
}
/* =====================================================
   فتح قسم الأصناف
===================================================== */
function openItems(sectionId) {

    // إخفاء شاشة الأقسام
    const menuScreen = document.getElementById("menuScreen");

    if (menuScreen) {
        menuScreen.style.display = "none";
    }

    // إخفاء كل شاشات الأصناف
    document.querySelectorAll(".items-screen").forEach(function(screen) {
        screen.style.display = "none";
        screen.classList.remove("active");
    });

    // إظهار القسم المطلوب
    const selectedScreen = document.getElementById(sectionId);

    if (selectedScreen) {
     selectedScreen.style.setProperty("display", "block", "important");
        selectedScreen.classList.add("active");

        window.scrollTo(0, 0);
    }
}

/* =====================================================
   الرجوع من الأصناف إلى شاشة الأقسام
===================================================== */

function closeItems() {

    // إخفاء جميع شاشات الأصناف
    document.querySelectorAll(".items-screen").forEach(function(screen) {
        screen.style.setProperty("display", "none", "important");
        screen.classList.remove("active");
    });

    // إظهار شاشة الأقسام
    if (menuScreen) {
        menuScreen.style.setProperty("display", "block", "important");
    }

    // حالة المنيو
    document.body.classList.remove("home-active");
    document.body.classList.remove("category-active");
    document.body.classList.add("menu-active");

    // الرجوع إلى بداية الأقسام
    window.scrollTo({
        top: 0,
        behavior: "instant"
    });
}

/* =====================================================
   ITEM MODAL + ADD TO CART
===================================================== */

let selectedItem = null;

let modalQuantity = 1;

/* =====================================================
   فتح Modal الصنف
===================================================== */

function openItemModal(name, image, price, description) {

    /* حفظ بيانات الصنف */

    selectedItem = {
        name: name,
        image: image,
        price: Number(price),
        description: description
    };


    /* الكمية تبدأ من 1 */

    modalQuantity = 1;


    /* جلب Modal */

    const modal =
        document.getElementById("itemModal");

    const modalImage =
        document.getElementById("modalItemImage");

    const modalName =
        document.getElementById("modalItemName");

    const modalPrice =
        document.getElementById("modalItemPrice");

    const modalDescription =
        document.getElementById("modalItemDescription");

    const quantity =
        document.getElementById("modalQuantity");


    /* إذا الـModal غير موجود */

    if (!modal) {

        console.error("itemModal غير موجود في HTML");

        return;

    }


    /* تعبئة البيانات */

    if (modalImage) {

        modalImage.src = image;

        modalImage.alt = name;

    }


    if (modalName) {

        modalName.textContent = name;

    }


    if (modalPrice) {

        modalPrice.textContent =
            "$" + Number(price).toFixed(2);

    }


    if (modalDescription) {

        modalDescription.textContent =
            description;

    }


    if (quantity) {

        quantity.textContent =
            "1";

    }


    /* فتح Modal */

    modal.classList.add("active");

}
/* =====================================================
   تغيير الكمية
===================================================== */

function changeModalQuantity(change) {

    modalQuantity += change;


    if (modalQuantity < 1) {

        modalQuantity = 1;

    }


    const quantity =
        document.getElementById(
            "modalQuantity"
        );


    if (quantity) {

        quantity.textContent =
            modalQuantity;

    }

}


/* =====================================================
   إضافة إلى السلة
===================================================== */
function confirmAddToCart() {

    if (!selectedItem) return;


    let cart =
        JSON.parse(
            sessionStorage.getItem("gmCart")
        ) || [];


    const existingItem =
        cart.find(
            item =>
                item.name ===
                selectedItem.name
        );


    if (existingItem) {

        existingItem.quantity +=
            modalQuantity;

    }

    else {

        cart.push({

            name:
                selectedItem.name,

            image:
                selectedItem.image,

            price:
                selectedItem.price,

            quantity:
                modalQuantity

        });

    }


    sessionStorage.setItem(
        "gmCart",
        JSON.stringify(cart)
    );


    if (typeof updateCartCount === "function") {

        updateCartCount();

    }


    closeItemModal();

}

/* =====================================================
   إغلاق Modal الصنف
===================================================== */

function closeItemModal() {

    const modal =
        document.getElementById("itemModal");


    if (modal) {

        modal.classList.remove("active");

    }


    selectedItem = null;

    modalQuantity = 1;

}


/* =====================================================
   إغلاق Modal عند الضغط على الخلفية
===================================================== */

document.addEventListener("click", function(event) {

    const modal =
        document.getElementById("itemModal");


    if (!modal) return;


    if (event.target === modal) {

        closeItemModal();

    }

});

/* =====================================================
   MENU SEARCH
===================================================== */

function openSearch() {

    const searchScreen = document.getElementById("searchScreen");
    const searchInput = document.getElementById("menuSearchInput");

    if (!searchScreen) return;

    searchScreen.style.display = "block";

    document.body.style.overflow = "hidden";

    // تنظيف البحث
    if (searchInput) {
        searchInput.value = "";
    }

    const results = document.getElementById("searchResults");

    if (results) {
        results.innerHTML = `
            <div class="search-empty">
                Search for an item
            </div>
        `;
    }

    // فتح الكيبورد والتركيز على البحث
    setTimeout(function() {

        if (searchInput) {
            searchInput.focus();
        }

    }, 100);
}


/* =====================================================
   CLOSE SEARCH
===================================================== */
function closeSearch() {

    const searchScreen = document.getElementById("searchScreen");

    if (searchScreen) {
        searchScreen.style.display = "none";
    }

    document.body.style.overflow = "";

    // إظهار شاشة الأقسام
    if (menuScreen) {
        menuScreen.style.setProperty("display", "block", "important");
    }

    document.body.classList.remove("home-active");
    document.body.classList.remove("category-active");
    document.body.classList.add("menu-active");

    window.scrollTo({
        top: 0,
        behavior: "instant"
    });
}

/* =====================================================
   SEARCH ITEMS
===================================================== */

function searchMenuItems() {

    const input = document.getElementById("menuSearchInput");
    const results = document.getElementById("searchResults");

    if (!input || !results) return;

    const searchText = input.value
        .trim()
        .toLowerCase();

    // إذا البحث فارغ
    if (searchText === "") {

        results.innerHTML = `
            <div class="search-empty">
                Search for an item
            </div>
        `;

        return;
    }


    // جلب جميع الأصناف الموجودة
    const allItems = document.querySelectorAll(
        ".items-screen .menu-item-card"
    );


    let foundItems = 0;

    results.innerHTML = "";


    allItems.forEach(function(item) {

        const nameElement = item.querySelector(".menu-item-name");

        if (!nameElement) return;

        const itemName = nameElement.textContent
            .trim()
            .toLowerCase();


        // البحث بالاسم
        if (itemName.includes(searchText)) {

            const clonedItem = item.cloneNode(true);

            results.appendChild(clonedItem);

            foundItems++;

        }

    });


    // لا توجد نتائج
    if (foundItems === 0) {

        results.innerHTML = `
            <div class="search-no-results">
                No items found
            </div>
        `;

    }

}

/* =====================================================
   CART SYSTEM
===================================================== */


/* =====================================================
   GET CART
===================================================== */
function getCart() {

    try {

        return JSON.parse(
            sessionStorage.getItem("gmCart")
        ) || [];

    } catch (error) {

        return [];

    }

}


/* =====================================================
   SAVE CART
===================================================== */
function saveCart(cart) {

    sessionStorage.setItem(
        "gmCart",
        JSON.stringify(cart)
    );

}
/* =====================================================
   CART COUNT
===================================================== */

function updateCartCount() {

    const cartCount =
        document.getElementById("cartCount");

    if (!cartCount) return;


    const cart = getCart();

    let count = 0;


    cart.forEach(function(item) {

        count += Number(item.quantity) || 0;

    });


    cartCount.textContent = count;

}


/* =====================================================
   OPEN CART
===================================================== */

function openCart() {

    const cartScreen =
        document.getElementById("cartScreen");

    if (!cartScreen) return;


    /* إخفاء الأصناف */

    document
        .querySelectorAll(".items-screen")
        .forEach(function(screen) {

            screen.style.setProperty(
                "display",
                "none",
                "important"
            );

        });


    /* إخفاء شاشة الأقسام */

    if (typeof menuScreen !== "undefined" && menuScreen) {

        menuScreen.style.setProperty(
            "display",
            "none",
            "important"
        );

    }


    /* إخفاء البحث */

    const searchScreen =
        document.getElementById("searchScreen");

    if (searchScreen) {

        searchScreen.style.display = "none";

    }


    /* إظهار السلة */

    cartScreen.style.display = "block";


    document.body.style.overflow = "hidden";


    renderCart();

}


/* =====================================================
   CLOSE CART
===================================================== */

function closeCart() {

    const cartScreen =
        document.getElementById("cartScreen");

    if (!cartScreen) return;


    cartScreen.style.display = "none";


    document.body.style.overflow = "";


    /* إظهار الأقسام */

    if (typeof menuScreen !== "undefined" && menuScreen) {

        menuScreen.style.setProperty(
            "display",
            "block",
            "important"
        );

    }


    document.body.classList.remove("home-active");
    document.body.classList.remove("category-active");

    document.body.classList.add("menu-active");


    window.scrollTo({
        top: 0,
        behavior: "instant"
    });

}


/* =====================================================
   RENDER CART
===================================================== */

function renderCart() {

    const list =
        document.getElementById("cartItemsList");

    const empty =
        document.getElementById("cartEmpty");

    const footer =
        document.getElementById("cartFooter");


    if (!list || !empty || !footer) return;


    const cart = getCart();


    list.innerHTML = "";


    /* =================================================
       EMPTY
    ================================================= */

    if (cart.length === 0) {

        list.style.display = "none";

        empty.style.display = "block";

        footer.style.display = "none";

        updateCartCount();

        return;

    }


    /* =================================================
       HAS ITEMS
    ================================================= */

    list.style.display = "block";

    empty.style.display = "none";

    footer.style.display = "block";


    let subtotal = 0;


    cart.forEach(function(item, index) {

        const quantity =
            Number(item.quantity) || 1;

        const price =
            Number(item.price) || 0;

        const itemTotal =
            price * quantity;


        subtotal += itemTotal;


        const product =
            document.createElement("div");

        product.className =
            "cart-product";


        product.innerHTML = `

            <div class="cart-product-image">

                <img
                    src="${item.image}"
                    alt="${item.name}">

            </div>


            <div class="cart-product-info">

                <div class="cart-product-name">
                    ${item.name}
                </div>


               <div class="cart-product-price">
    $${price.toFixed(2)}
</div>


                <div class="cart-product-controls">

                    <button
                        type="button"
                        class="cart-qty-button"
                        onclick="changeCartQuantity(${index}, -1)">
                        −
                    </button>


                    <span class="cart-product-quantity">
                        ${quantity}
                    </span>


                    <button
                        type="button"
                        class="cart-qty-button"
                        onclick="changeCartQuantity(${index}, 1)">
                        +
                    </button>

                </div>

            </div>


            <button
                type="button"
                class="cart-remove-button"
                onclick="removeCartItem(${index})">
                ×
            </button>

        `;


        list.appendChild(product);

    });


    /* TAX */

    const tax = 0;


    /* TOTAL */

    const total =
        subtotal + tax;


    document.getElementById(
        "cartSubtotal"
    ).textContent =
        "$" + subtotal.toFixed(2);


    document.getElementById(
        "cartTax"
    ).textContent =
        "$" + tax.toFixed(2);


    document.getElementById(
        "cartTotal"
    ).textContent =
        "$" + total.toFixed(2);


    updateCartCount();

}


/* =====================================================
   CHANGE QUANTITY
===================================================== */

function changeCartQuantity(index, change) {

    const cart = getCart();


    if (!cart[index]) return;


    cart[index].quantity =
        (Number(cart[index].quantity) || 1)
        + change;


    /* أقل كمية = 1 */

    if (cart[index].quantity < 1) {

        cart[index].quantity = 1;

    }


    saveCart(cart);


    renderCart();

}


/* =====================================================
   REMOVE ITEM
===================================================== */

function removeCartItem(index) {

    const cart = getCart();


    if (!cart[index]) return;


    cart.splice(index, 1);


    saveCart(cart);


    renderCart();

}


/* =====================================================
   CLEAR CART
===================================================== */
function clearCart() {
sessionStorage.removeItem("gmCart");
    renderCart();
}

/* =====================================================
   CUSTOMER LOCATION
===================================================== */

let customerLocation = null;


/* =====================================================
   START ORDER
===================================================== */

function placeOrder() {

    const cart = getCart();

    if (!cart || cart.length === 0) {

        alert("Your cart is empty.");

        return;
    }


    // إذا الموقع مأخوذ مسبقاً
    if (customerLocation) {

        sendOrderToWhatsApp();

        return;
    }


    // فتح رسالة طلب الموقع
    const locationModal =
        document.getElementById("locationModal");

    if (locationModal) {

        locationModal.style.display = "flex";

    }

}


/* =====================================================
   CLOSE LOCATION MODAL
===================================================== */

function closeLocationModal() {

    const modal =
        document.getElementById("locationModal");

    if (modal) {

        modal.style.display = "none";

    }

}


/* =====================================================
   REQUEST LOCATION
===================================================== */

function requestCustomerLocation() {

    if (!navigator.geolocation) {

        alert(
            "Location is not supported by your browser."
        );

        return;
    }


    const button =
        document.querySelector(
            ".location-allow-button"
        );


    if (button) {

        button.textContent =
            "GETTING LOCATION...";

        button.disabled = true;

    }


    navigator.geolocation.getCurrentPosition(

        function(position) {

            customerLocation = {

                latitude:
                    position.coords.latitude,

                longitude:
                    position.coords.longitude

            };


            if (button) {

                button.textContent =
                    "LOCATION SELECTED";

                button.disabled = false;

            }


            closeLocationModal();


            // إظهار نجاح تحديد الموقع
            const successModal =
                document.getElementById(
                    "locationSuccessModal"
                );


            if (successModal) {

                successModal.style.display =
                    "flex";

            }

        },


        function(error) {

            if (button) {

                button.textContent =
                    "ALLOW LOCATION";

                button.disabled = false;

            }


            if (error.code === 1) {

                alert(
                    "Location permission was denied. Please allow location access to complete your order."
                );

            }
            else {

                alert(
                    "Unable to get your location. Please try again."
                );

            }

        },

        {
            enableHighAccuracy: true,

            timeout: 15000,

            maximumAge: 0

        }

    );

}


/* =====================================================
   CLOSE SUCCESS MESSAGE
===================================================== */

function closeLocationSuccess() {

    const modal =
        document.getElementById(
            "locationSuccessModal"
        );


    if (modal) {

        modal.style.display = "none";

    }

}
/* =====================================================
   UPDATE COUNT WHEN PAGE LOADS
===================================================== */
document.addEventListener(
    "DOMContentLoaded",
    function() {

        cleanCartItems();

        updateCartCount();

    }
);
/* =====================================================
   SEND ORDER TO WHATSAPP
===================================================== */

function sendOrderToWhatsApp() {

    const cart = getCart();


    if (!cart || cart.length === 0) {

        alert("Your cart is empty.");

        return;

    }


    if (!customerLocation) {

        alert(
            "Please select your location first."
        );

        return;

    }


    /* =================================================  
       ضع رقم المطعم هنا بدون +
       وبدون مسافات
    ================================================= */

  const whatsappNumber = "96176460667";
    /* =================================================
       GOOGLE MAPS LOCATION
    ================================================= */

    const latitude =
        customerLocation.latitude;

    const longitude =
        customerLocation.longitude;


    const mapsLink =
        "https://www.google.com/maps?q="
        + latitude
        + ","
        + longitude;


    /* =================================================
       BUILD ORDER MESSAGE
    ================================================= */

    let message =
        "🍽️ NEW ORDER\n\n";


    message +=
        "━━━━━━━━━━━━━━━━━━\n";


    message +=
        "🛒 ORDER DETAILS\n";


    message +=
        "━━━━━━━━━━━━━━━━━━\n\n";


    let subtotal = 0;


    cart.forEach(function(item, index) {

        const quantity =
            Number(item.quantity) || 1;


        const price =
            Number(item.price) || 0;


        const total =
            price * quantity;


        subtotal += total;


        message +=
            (index + 1)
            + ". "
            + item.name
            + "\n";


        message +=
            "   Quantity: "
            + quantity
            + "\n";


        message +=
            "   Price: $"
            + price.toFixed(2)
            + "\n";


        message +=
            "   Total: $"
            + total.toFixed(2)
            + "\n\n";

    });


    /* =================================================
       TOTAL
    ================================================= */

    message +=
        "━━━━━━━━━━━━━━━━━━\n";


    message +=
        "Subtotal: $"
        + subtotal.toFixed(2)
        + "\n";


    message +=
        "Tax: $0.00\n";


    message +=
        "TOTAL: $"
        + subtotal.toFixed(2)
        + "\n";


    message +=
        "━━━━━━━━━━━━━━━━━━\n\n";


    /* =================================================
       CUSTOMER LOCATION
    ================================================= */

    message +=
        "📍 CUSTOMER LOCATION\n\n";


    message +=
        "🗺️ Google Maps:\n";


    message +=
        mapsLink
        + "\n\n";


    message +=
        "Please confirm the order.";


    /* =================================================
       OPEN WHATSAPP
    ================================================= */

    const whatsappURL =
        "https://wa.me/"
        + whatsappNumber
        + "?text="
        + encodeURIComponent(message);


    window.open(
        whatsappURL,
        "_blank"
    );

}

/* =====================================================
   REMOVE OLD / DELETED MENU ITEMS FROM CART
===================================================== */

function cleanCartItems() {

    const cart = getCart();

    if (!cart || cart.length === 0) {
        return;
    }

    // جلب أسماء كل الأصناف الموجودة حاليًا بالمنيو
    const menuItems = document.querySelectorAll(
        ".items-screen .menu-item-name"
    );

    const currentMenuNames = [];

    menuItems.forEach(function(item) {

        const name = item.textContent
            .trim()
            .toLowerCase();

        currentMenuNames.push(name);

    });


    // الاحتفاظ فقط بالأصناف الموجودة حاليًا
    const cleanedCart = cart.filter(function(item) {

        return currentMenuNames.includes(
            item.name.trim().toLowerCase()
        );

    });


    // حفظ السلة الجديدة
    saveCart(cleanedCart);

    // تحديث رقم السلة
    updateCartCount();
}
