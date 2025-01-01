#include <iostream>
#include <fstream>
#include <nlohmann/json.hpp> // Подключаем библиотеку JSON

using namespace std;
using json = nlohmann::json;

void addRecipe(json& recipes) {
    int id;
    string title, instructions;
    vector<std::string> ingredients;
    string ingredient, images, description, duration;

    cout << "Введите ID рецепта: ";
    cin >> id;
    cin.ignore(); // Убираем оставшийся символ новой строки

    cout << "Введите название рецепта: ";
    getline(std::cin, title);

    cout << "Введите описание блюда: ";
    getline(std::cin, description);

    cout << "Введите продолжительность готовки: ";
    getline(std::cin, duration);

    cout << "Введите инструкции: ";
    getline(std::cin, instructions);

    cout << "Введите изобрежение блюда: ";
    getline(std::cin, images);

    int count_ingredients = -1;
    std::cout << "Введите ингредиенты (вводите по одному, для завершения введите 'done'):\n";
    while (true) {
        std::getline(std::cin, ingredient);
        count_ingredients++;
        if (ingredient == "done") break;
        ingredients.push_back(ingredient);
    }

    // Создаем новый рецепт
    json newRecipe = {
        {"id", id},
        {"title", title},
        {"ingredients", ingredients},
        {"count_ingredients", count_ingredients},
        {"instructions", instructions},
        {"description", description},
        {"duration", duration},
        {"images", images}
    };

    // Добавляем рецепт в массив
    recipes.push_back(newRecipe);
    std::cout << "Рецепт успешно добавлен!\n";
}

void saveRecipes(const json& recipes, const std::string& filename) {
    std::ofstream file(filename);
    if (file.is_open()) {
        file << recipes.dump(4); // Сохраняем в читаемом формате
        file.close();
        std::cout << "Рецепты сохранены в файл " << filename << "!\n";
    }
    else {
        std::cerr << "Не удалось открыть файл для записи!\n";
    }
}

int main() {
    setlocale(LC_ALL, "Ru");
    string filename = "recipes.json";
    json recipes;

    // Загружаем существующий JSON
    std::ifstream file(filename);
    if (file.is_open()) {
        file >> recipes;
        file.close();
    }
    else {
        std::cout << "Файл не найден. Будет создан новый JSON.\n";
    }

    int choice;
    do {
        std::cout << "\nМеню:\n";
        std::cout << "1. Добавить рецепт\n";
        std::cout << "2. Сохранить и выйти\n";
        std::cout << "Ваш выбор: ";
        std::cin >> choice;

        switch (choice) {
        case 1:
            addRecipe(recipes);
            break;
        case 2:
            saveRecipes(recipes, filename);
            break;
        default:
            std::cout << "Неверный выбор, попробуйте снова.\n";
        }
    } while (choice != 2);

    return 0;
}
