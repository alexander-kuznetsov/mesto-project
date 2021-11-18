/**
 * Класс отвечает за отрисовку элементов на странице
 */
export class Section {
    /**
    
     * @param renderer - функция, которая отвечает за создание и отрисовку данных на странице.
     * @param selector - селектор контейнера, в который нужно добавлять созданные элементы
     */
    constructor( renderer, selector) {
        this._renderer = renderer;
        this._container = document.querySelector(selector);
    }

    /**
     * Метод, который отвечает за отрисовку всех элементов
     * @param items - массив данных, которые нужно добавить на страницу при инициализации класса
     */
    renderItems(items) {
        items.forEach(item => {
            const element = this._renderer(item);
            this.addItem(element);
        });
    }

    /**
     * Добавляет в контейнер элемент
     * @param element DOM-элемент, который необходимо добавить
     */
    addItem(element) {
        this._container.prepend(element);
    }
}