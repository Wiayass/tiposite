// Массив с продуктами
let products = [
    "Мука", "Молоко", "Яйца", "Сахар", "Масло", "Творог", "Картофель", "Помидоры", "Лук",
    "Чеснок", "Капуста", "Перец", "Морковь", "Гречка", "Рис", "Макароны", "Сыр", "Грибы", "Сметана", "Мед"
    // Дополните список по необходимости
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

//Search

// Функция для отображения результатов поиска продуктов for search
document.addEventListener("DOMContentLoaded", () => {
    const animatedElements = document.querySelectorAll(".search-container");

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Элемент в зоне видимости — добавляем класс
                entry.target.classList.add("show");
                observer.unobserve(entry.target); // Отключаем наблюдение за этим элементом
            } else {
                // Для невидимых элементов (опционально)
                entry.target.classList.remove("show");
            }
        });
    }, {
        threshold: 0.1 // Процент видимости элемента, после которого срабатывает анимация
    });

    animatedElements.forEach(element => observer.observe(element));
});



// Fetch the product data
fetch('recipes.json')
.then(response => response.json())
.then(data => {
    const searchBar = document.getElementById('search-bar');
    const resultsContainer = document.getElementById('results-container');

    // Listen for input in the search bar
    searchBar.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        resultsContainer.innerHTML = ''; // Clear previous results

        if (query) {
            const filteredProducts = data.filter(product => product.title.toLowerCase().startsWith(query));
            if (filteredProducts.length){
                filteredProducts.forEach(product => {
                    const resultItem = document.createElement('div');
                    resultItem.classList.add('search-result-item');
                    resultItem.textContent = product.title;
                    resultItem.addEventListener('click', () => {
                        window.location.href = `recipe.html?id=${product.id}`;
                    });
                    resultsContainer.appendChild(resultItem);
                });
            } else {
                const noResultsDiv = document.createElement("div");
                noResultsDiv.textContent = "Нет результатов";
                
                resultsContainer.appendChild(noResultsDiv);
            }
    
            resultsContainer.style.display = "block"; // Показать подсказки
            
            resultsContainer.style.display = 'block';

        } else {
            resultsContainer.style.display = "none"; // Скрыть подсказки
        }
    });
});

// Close the search results when clicking outside
document.addEventListener("click", (e) => {
    if (!e.target.closest(".search-container")) {
        resultsContainer.style.display = "none";
    }
});

// Функция для отображения результатов поиска продуктов for things
productSearchBar.addEventListener("input", () => {
    const query = productSearchBar.value.toLowerCase();
    productResultsContainer.innerHTML = ""; // Очистка предыдущих результатов

    if (query) {
        const filteredProducts = products.filter(product =>
            product.toLowerCase().startsWith(query) //чтобы продукты искались по первой букве
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


// Массив для хранения выбранных продуктов
let cart = [];



// Функция для загрузки рецептов из файла recipes.json
async function loadRecipes() {
    try {
        const response = await fetch("recipes.json");
        if (!response.ok) throw new Error("Не удалось загрузить рецепты");
        const recipes = await response.json();
        return recipes;
    } catch (error) {
        console.error("Ошибка загрузки рецептов:", error);
        return [];
    }
}

// Функция для нахождения подходящих рецептов
async function findRecipes(selectedProducts) {
    const recipes = await loadRecipes();
    // Фильтрация рецептов, содержащих выбранные продукты
    return recipes.filter(recipe => {
        const recipeIngredients = recipe.ingredients.map(ingredient => ingredient.toLowerCase());
        return selectedProducts.every(product => recipeIngredients.includes(product.toLowerCase()));
    });
}


// Функция для добавления продукта в корзину
function addToCart(product) {
    if (!cart.includes(product)) {
        // Создаем элемент списка
        cart.push(product);
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
            cart = cart.filter(item => item !== product); // Удаляем продукт из массива
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




// Обработчик кнопки "Получить рецепты"
getRecipesBtn.addEventListener("click", async () => {
    if (cart.length === 0) {
        // Если корзина пуста, показываем предупреждение
        recipesOutput.innerHTML = `
            <img 
                src="images/photo_2024-11-29_19-09-29.jpg" 
                alt="Предупреждение" 
                style="width: 100%; border-radius: 8px;">
        `;
        recipesOutput.style.display = "block";
        setTimeout(() => {
            recipesOutput.classList.add("active");
        }, 10);

        setTimeout(() => {
            recipesOutput.classList.remove("active");
            setTimeout(() => {
                recipesOutput.style.display = "none";
            }, 500);
        }, 3000);
    } else {
        
        const matchedRecipes = await findRecipes(cart); // Находим подходящие рецепты
        if (cart.length > 0 && matchedRecipes.length > 0) {
            localStorage.setItem("matchedRecipes", JSON.stringify(matchedRecipes));
            localStorage.setItem("cartProducts", JSON.stringify(cart)); // Сохраняем список в localStorage
            window.location.href = "search.html"; // Переходим на другую страницу
        } else {
            alert("Выберите хотя бы один продукт!");
        }

        
    }
});









//ANIMATION

//navbar animation
document.addEventListener("DOMContentLoaded", () => {
    const animatedElements = document.querySelectorAll(".navbar");

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Элемент в зоне видимости — добавляем класс
                entry.target.classList.add("show");
                observer.unobserve(entry.target); // Отключаем наблюдение за этим элементом
            } else {
                // Для невидимых элементов (опционально)
                entry.target.classList.remove("show");
            }
        });
    }, {
        threshold: 0.1 // Процент видимости элемента, после которого срабатывает анимация
    });

    animatedElements.forEach(element => observer.observe(element));
});



//things

document.addEventListener("DOMContentLoaded", () => {
    const animatedElements = document.querySelectorAll(".things");

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Элемент в зоне видимости — добавляем класс
                entry.target.classList.add("show");
                observer.unobserve(entry.target); // Отключаем наблюдение за этим элементом
            } else {
                // Для невидимых элементов (опционально)
                entry.target.classList.remove("show");
            }
        });
    }, {
        threshold: 0.1 // Процент видимости элемента, после которого срабатывает анимация
    });

    animatedElements.forEach(element => observer.observe(element));
});

//cite_block
document.addEventListener("DOMContentLoaded", () => {
    const animatedElements = document.querySelectorAll(".cite_block");

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Элемент в зоне видимости — добавляем класс
                entry.target.classList.add("show");
                observer.unobserve(entry.target); // Отключаем наблюдение за этим элементом
            } else {
                // Для невидимых элементов (опционально)
                entry.target.classList.remove("show");
            }
        });
    }, {
        threshold: 0.1 // Процент видимости элемента, после которого срабатывает анимация
    });

    animatedElements.forEach(element => observer.observe(element));
});





//card
document.addEventListener("DOMContentLoaded", () => {
    const animatedElements = document.querySelectorAll(".card-container");

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Элемент в зоне видимости — добавляем класс
                entry.target.classList.add("show");
                observer.unobserve(entry.target); // Отключаем наблюдение за этим элементом
            } else {
                // Для невидимых элементов (опционально)
                entry.target.classList.remove("show");
            }
        });
    }, {
        threshold: 0.1 // Процент видимости элемента, после которого срабатывает анимация
    });

    animatedElements.forEach(element => observer.observe(element));
});
    

//footer
document.addEventListener("DOMContentLoaded", () => {
    const animatedElements = document.querySelectorAll(".footer");

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Элемент в зоне видимости — добавляем класс
                entry.target.classList.add("show");
                observer.unobserve(entry.target); // Отключаем наблюдение за этим элементом
            } else {
                // Для невидимых элементов (опционально)
                entry.target.classList.remove("show");
            }
        });
    }, {
        threshold: 0.1 // Процент видимости элемента, после которого срабатывает анимация
    });

    animatedElements.forEach(element => observer.observe(element));
});

//footer-bottom
document.addEventListener("DOMContentLoaded", () => {
    const animatedElements = document.querySelectorAll(".footer-bottom");

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Элемент в зоне видимости — добавляем класс
                entry.target.classList.add("show");
                observer.unobserve(entry.target); // Отключаем наблюдение за этим элементом
            } else {
                // Для невидимых элементов (опционально)
                entry.target.classList.remove("show");
            }
        });
    }, {
        threshold: 0.1 // Процент видимости элемента, после которого срабатывает анимация
    });

    animatedElements.forEach(element => observer.observe(element));
});



//slider

document.addEventListener("DOMContentLoaded", () => {
    const animatedElements = document.querySelectorAll(".animated-element");
    
    // Функция для добавления класса 'show' ко всем элементам
    animatedElements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add("show");
            }, index * 500); // Задержка для последовательного появления
        });
    });


    document.addEventListener("DOMContentLoaded", () => {
        const slidesContainer = document.querySelector(".slides");
        const slides = document.querySelectorAll(".slide");
        const prevButton = document.querySelector(".prev");
        const nextButton = document.querySelector(".next");

        const gap = 20; // Расстояние между слайдами
        const slideWidth = slides[0].clientWidth + gap; // Ширина слайда + gap
        let currentIndex = 0; // Стартовая позиция (учитываем дополнительные клоны)

        // Клонируем слайды
        const totalSlides = slides.length;
        const clonesBefore = [];
        const clonesAfter = [];

        // Создаем клоны для начала и конца
        slides.forEach((slide, index) => {
            const cloneBefore = slide.cloneNode(true);
            const cloneAfter = slide.cloneNode(true);

            cloneBefore.classList.add("clone");
            cloneAfter.classList.add("clone");

            clonesBefore.push(cloneBefore);
            clonesAfter.push(cloneAfter);
        });

        // Функция для перехода к предыдущему слайду
        function prevSlide() {
            if (currentIndex <= 0) {
                // Если это первый слайд, плавно переходим к клону последнего
                slidesContainer.style.transition = "transform 3s ease";
                currentIndex--;
                slidesContainer.style.transform = `translateX(${-slideWidth * currentIndex}px)`;

                // Через небольшую задержку переключаемся на оригинальный последний слайд без анимации
                setTimeout(() => {
                    slidesContainer.style.transition = "none";
                    currentIndex = totalSlides - 1;
                    slidesContainer.style.transform = `translateX(${-slideWidth * currentIndex}px)`;
                }, 5000);
            } else {
                currentIndex--;
                slidesContainer.style.transition = "transform 3s ease";
                slidesContainer.style.transform = `translateX(${-slideWidth * currentIndex}px)`;
            }
        }

        // Автоматическое переключение
        let autoSlideInterval = setInterval(nextSlide, 5000);

        // Добавляем клонированные элементы в DOM
        clonesBefore.reverse().forEach((clone) => {
            slidesContainer.insertBefore(clone, slidesContainer.firstChild);
        });

        clonesAfter.forEach((clone) => {
            slidesContainer.appendChild(clone);
        });

        const allSlides = document.querySelectorAll(".slide"); // Обновляем NodeList после клонирования
        slidesContainer.style.transform = `translateX(${-slideWidth * currentIndex}px)`;

        // Перемещение слайдов
        function moveToIndex(index) {
            slidesContainer.style.transition = "transform 3s ease";
            slidesContainer.style.transform = `translateX(${-slideWidth * index}px)`;
        }

        function nextSlide() {
            currentIndex++;
            moveToIndex(currentIndex);

            if (currentIndex >= totalSlides + 2) {
                setTimeout(() => {
                    slidesContainer.style.transition = "none";
                    currentIndex = 2; // Возвращаемся на оригинальный первый слайд
                    slidesContainer.style.transform = `translateX(${-slideWidth * currentIndex}px)`;
                }, 5000);
            }
        }

        function prevSlide() {
            currentIndex--;
            moveToIndex(currentIndex);

            if (currentIndex <= 1) {
                setTimeout(() => {
                    slidesContainer.style.transition = "none";
                    currentIndex = totalSlides + 1; // Возвращаемся на оригинальный последний слайд
                    slidesContainer.style.transform = `translateX(${-slideWidth * currentIndex}px)`;
                }, 5000);
            }
        }

        nextButton.addEventListener("click", nextSlide);
        prevButton.addEventListener("click", prevSlide);

        // Обработка свайпов
        let touchStartX = 0;
        let touchEndX = 0;

        slidesContainer.addEventListener("touchstart", (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });

        slidesContainer.addEventListener("touchend", (e) => {
            touchEndX = e.changedTouches[0].screenX;

            if (touchStartX > touchEndX + 50) {
                nextSlide();
            } else if (touchStartX < touchEndX - 50) {
                prevSlide();
            }
        });
    });


    //slider
document.addEventListener("DOMContentLoaded", () => {
    const animatedElements = document.querySelectorAll(".slider");

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Элемент в зоне видимости — добавляем класс
                entry.target.classList.add("show");
                observer.unobserve(entry.target); // Отключаем наблюдение за этим элементом
            } else {
                // Для невидимых элементов (опционально)
                entry.target.classList.remove("show");
            }
        });
    }, {
        threshold: 0.1 // Процент видимости элемента, после которого срабатывает анимация
    });

    animatedElements.forEach(element => observer.observe(element));
});


document.addEventListener("DOMContentLoaded", () => {
    const animatedElements = document.querySelectorAll(".aboutus");

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Элемент в зоне видимости — добавляем класс
                entry.target.classList.add("show");
                observer.unobserve(entry.target); // Отключаем наблюдение за этим элементом
            } else {
                // Для невидимых элементов (опционально)
                entry.target.classList.remove("show");
            }
        });
    }, {
        threshold: 0.1 // Процент видимости элемента, после которого срабатывает анимация
    });

    animatedElements.forEach(element => observer.observe(element));
});
