/**
 * Класс отвечает за отрисовку элементов на странице
 */
export class Section {
    /**
     * @param items - массив данных, которые нужно добавить на страницу при инициализации класса
     * @param renderer - функция, которая отвечает за создание и отрисовку данных на странице.
     * @param selector - селектор контейнера, в который нужно добавлять созданные элементы
     */
    constructor({items, renderer}, selector) {
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