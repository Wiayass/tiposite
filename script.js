// Массив с продуктами
let products = [
    "Мука", "Молоко", "Яйца", "Сахар", "Масло", "Творог", "Картофель", "Помидоры", "Лук",
    "Чеснок", "Капуста", "Перец", "Морковь", "Гречка", "Рис", "Макароны", "Сыр", "Грибы"
    // Дополните список по необходимости
];

// Пример рецептов
const recipes = [
    { name: "Омлет", ingredients: ["Яйца", "Молоко", "Соль"] },
    { name: "Салат", ingredients: ["Помидоры", "Огурцы", "Лук", "Масло"] },
    { name: "Каша", ingredients: ["Гречка", "Молоко", "Сахар"] },
    { name: "Пицца", ingredients: ["Мука", "Сыр", "Томатный соус", "Грибы"] }
];

// Элементы DOM
const searchBar = document.getElementById("search-bar");
const resultsContainer = document.getElementById("results-container");
const productSearchBar = document.getElementById("product-search-bar");
const productResultsContainer = document.getElementById("product-results-container");
const cartList = document.getElementById("cart-list");
const recipesOutput = document.getElementById("recipes-output");
const getRecipesBtn = document.getElementById("get-recipes-btn");

// Массив для хранения выбранных продуктов
let cart = [];

// Функция для отображения результатов поиска продуктов
searchBar.addEventListener("input", () => {
    const query = searchBar.value.toLowerCase();
    resultsContainer.innerHTML = ""; // Очистка предыдущих результатов

    if (query) {
        const filteredProducts = products.filter(product =>
            product.toLowerCase().includes(query)
        );

        if (filteredProducts.length) {
            filteredProducts.forEach(product => {
                const div = document.createElement("div");
                div.textContent = product;
                div.addEventListener("click", () => {
                    addProductToCart(product); // Добавление продукта в корзину
                    searchBar.value = ""; // Очистка строки поиска
                    resultsContainer.innerHTML = ""; // Очистка подсказок
                });
                resultsContainer.appendChild(div);
            });
        } else {
        }

        resultsContainer.style.display = "block"; // Показать подсказки
    } else {
        resultsContainer.style.display = "none"; // Скрыть подсказки
    }
});

// Функция для добавления продукта в корзину
function addProductToCart(product) {
    const li = document.createElement("li");
    li.textContent = product;
    cartList.appendChild(li);
}

recipesOutput.style.display = "none";
// Функция для обработки кнопки "Получить рецепты"
getRecipesBtn.addEventListener("click", () => {
    if (cartList.children.length === 0) {
        // Если список пуст, выводим предупреждение
        recipesOutput.textContent = "Выберите продукты сначала.";
        recipesOutput.style.color = "#FFFDF5"; // Акцентируем внимание
        recipesOutput.style.display = "block";
        
    } else {
        // Если в списке есть продукты, перенаправляем на recipes.html
        window.location.href = "recipes.html";
    }
});



// Получаем элементы
const menuToggle1 = document.getElementById('menu-toggle1');
const navbarLinks1 = document.getElementById('navbar-links1');

// Добавляем обработчик клика
menuToggle1.addEventListener('click', () => {
    menuToggle1.classList.toggle('active'); // Анимация иконки
    navbarLinks1.classList.toggle('active'); // Плавное меню
});


// Закрытие списка подсказок при клике вне поля
document.addEventListener("click", (e) => {
    if (!e.target.closest(".search-container")) {
        resultsContainer.style.display = "none";
    }
});

// Функция для отображения результатов поиска продуктов
productSearchBar.addEventListener("input", () => {
    const query = productSearchBar.value.toLowerCase();
    productResultsContainer.innerHTML = ""; // Очистка предыдущих результатов

    if (query) {
        const filteredProducts = products.filter(product =>
            product.toLowerCase().includes(query)
        );

        if (filteredProducts.length) {
            filteredProducts.forEach(product => {
                const div = document.createElement("div");
                div.textContent = product;
                div.addEventListener("click", () => {
                    addToCart(product); // Добавление продукта в корзину
                    productSearchBar.value = ""; // Очистка поля поиска
                    productResultsContainer.innerHTML = ""; // Очистка списка
                });
                productResultsContainer.appendChild(div);
            });
        } else {
            productResultsContainer.innerHTML = `<div>Нет результатов</div>`;
        }

        productResultsContainer.style.display = "block"; // Показать подсказки
    } else {
        productResultsContainer.style.display = "none"; // Скрыть подсказки
    }
});

// Закрытие списка подсказок при клике вне поля
document.addEventListener("click", (e) => {
    if (!e.target.closest(".filter-container")) {
        productResultsContainer.style.display = "none";
    }
});

// Функция для добавления продукта в корзину
function addToCart(product) {
    if (!cart.includes(product)) {
        cart.push(product);
        const cartItem = document.createElement("li");
        cartItem.textContent = product;
        cartList.appendChild(cartItem);
    }
}

/* Функция для получения рецептов на основе продуктов в корзине
function getRecipes() {
    const availableRecipes = recipes.filter(recipe =>
        recipe.ingredients.every(ingredient => cart.includes(ingredient))
    );

    recipesOutput.innerHTML = availableRecipes.length
        ? availableRecipes.map(recipe => `<div>${recipe.name}</div>`).join("")
        : "<div>Нет доступных рецептов</div>";
}*/

// Событие для кнопки "Получить рецепты"
getRecipesBtn.addEventListener("click", getRecipes);

// Функция для скрытия/показа фильтра
function toggleFilter() {
    const filterOptions = document.getElementById("filter-options");
    const filterToggleButton = document.querySelector(".filter-toggle");

    filterOptions.style.display = (filterOptions.style.display === "none" || !filterOptions.style.display) ? "block" : "none";

    filterToggleButton.classList.toggle("active");
}


    const menuIcon = document.querySelector('.navbar-menu-icon');
    const navbarLinks = document.querySelector('.navbar-links.mobile');

    menuIcon.addEventListener('click', () => {
        navbarLinks.classList.toggle('active');
    });



    
