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
//Search
const searchBar = document.getElementById("search-bar");
const resultsContainer = document.getElementById("results-container");


//prosucts

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
            const noResultsDiv = document.createElement("div");
            noResultsDiv.textContent = "Нет результатов";
            
            resultsContainer.appendChild(noResultsDiv);
        }

        resultsContainer.style.display = "block"; // Показать подсказки
    } else {
        resultsContainer.style.display = "none"; // Скрыть подсказки
    }
});




// Функция для добавления продукта в корзину
function addProductToCart(product) {
    // Создаем элемент списка
    const li = document.createElement("li");
    li.style.display = "flex";
    li.style.justifyContent = "space-between";
    li.style.alignItems = "center";
    li.style.padding = "8px 0";
    li.style.borderBottom = "1px solid #ccc"; // Разделитель между элементами

    // Добавляем текст продукта
    const productName = document.createElement("span");
    productName.textContent = product;
    productName.style.flex = "1";

    // Создаем кнопку удаления с иконкой мусорного бака
    const removeBtn = document.createElement("button");
    removeBtn.innerHTML = "🗑️"; // Символ мусорного бака
    removeBtn.style.backgroundColor = "transparent";
    removeBtn.style.border = "none";
    removeBtn.style.cursor = "pointer";
    removeBtn.style.color = "#ff4d4d"; // Красный цвет для иконки
    removeBtn.style.fontSize = "18px";

    // Добавляем обработчик для удаления продукта
    removeBtn.addEventListener("click", () => {
        cartList.removeChild(li); // Удаляем элемент списка
    });

    // Вставляем название продукта и кнопку удаления в элемент списка
    li.appendChild(productName);
    li.appendChild(removeBtn);

    // Добавляем элемент списка в корзину
    cartList.appendChild(li);
}

// Пример использования: добавляем продукт в корзину при поиске
productSearchBar.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && productSearchBar.value.trim() !== "") {
        addProductToCart(productSearchBar.value.trim()); // Добавляем продукт в корзину
        productSearchBar.value = ""; // Очищаем строку поиска
    }
});






// Событие для кнопки "Получить рецепты"

recipesOutput.style.display = "none";

// Функция для обработки кнопки "Получить рецепты"
getRecipesBtn.addEventListener("click", () => {
    if (cartList.children.length === 0) {
        // Если список пуст, показываем сообщение с изображением
        recipesOutput.innerHTML = `
            <img 
                src="photo_2024-11-29_19-09-29.jpg" 
                alt="Предупреждение" 
                style="width: 100%; border-radius: 8px;">
        `;
        recipesOutput.style.display = "block"; // Делаем элемент видимым

        // Небольшая задержка для запуска анимации
        setTimeout(() => {
            recipesOutput.classList.add("active"); // Выдвигаем табличку
        }, 10);

        // Убираем сообщение через 3 секунды
        setTimeout(() => {
            recipesOutput.classList.remove("active"); // Скрываем табличку
            setTimeout(() => {
                recipesOutput.style.display = "none"; // Полностью убираем из DOM
            }, 500); // Ждем завершения анимации
        }, 3000);
    } else {
        // Если в списке есть продукты, перенаправляем на recipes.html
        window.location.href = "recipes.html";
    }
});




// Получаем элементы Navbar
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
        // Создаем элемент списка
        const li = document.createElement("li");
        li.style.display = "flex";
        li.style.justifyContent = "space-between";
        li.style.alignItems = "center";
        li.style.padding = "8px 0";
        li.style.borderBottom = "1px solid #ccc"; // Разделитель между элементами

        // Добавляем текст продукта
        const productName = document.createElement("span");
        productName.textContent = product;
        productName.style.flex = "1";

        // Создаем кнопку удаления с иконкой мусорного бака
        const removeBtn = document.createElement("button");
        removeBtn.innerHTML = "🗑️"; // Символ мусорного бака
        removeBtn.style.backgroundColor = "transparent";
        removeBtn.style.border = "none";
        removeBtn.style.cursor = "pointer";
        removeBtn.style.color = "#ff4d4d"; // Красный цвет для иконки
        removeBtn.style.fontSize = "18px";

        // Добавляем обработчик для удаления продукта
        removeBtn.addEventListener("click", () => {
            cartList.removeChild(li); // Удаляем элемент списка
        });

        // Вставляем название продукта и кнопку удаления в элемент списка
        li.appendChild(productName);
        li.appendChild(removeBtn);

        // Добавляем элемент списка в корзину
        cartList.appendChild(li);
    }

    // Пример использования: добавляем продукт в корзину при поиске
    productSearchBar.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && productSearchBar.value.trim() !== "") {
            addProductToCart(productSearchBar.value.trim()); // Добавляем продукт в корзину
            productSearchBar.value = ""; // Очищаем строку поиска
        }
    })
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






    
