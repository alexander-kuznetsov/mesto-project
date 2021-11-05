/**
 * Класс отвечает за отрисовку элементов на странице
 */
class Section {
    constructor(
        {
            items,//массив данных, которые нужно добавить на страницу при инициализации класса
            renderer//функция, которая отвечает за создание и отрисовку данных на странице.
        },
        selector//селектор контейнера, в который нужно добавлять созданные элементы
    ) {
        this._items = items;
        this._renderer = renderer;
        this._container = document.querySelector(selector);
    }

    /**
     * Метод, который отвечает за отрисовку всех элементов
     */
    rendererItems() {
        this._items.forEach(item => {
            const element = this._renderer(item);
            this.addItem(element);
        });
    }

    /**
     * Добавляет в контейнер элемент
     * @param element DOM-элемент, который необходимо добавить
     */
    addItem(element) {
        this._container.append(element);
    }
}