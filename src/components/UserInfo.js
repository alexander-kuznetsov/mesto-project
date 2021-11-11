/**
 * Отвечает за управление информацией о пользователе на странице
 */
export class UserInfo {
    /**
     * @param userNameSelector - селектор элемента имени пользователя
     * @param userDetailsSelector - селектор элемента информации о себе
     * @param userAvatarSelector - - селектор элемента аватарки пользователя
     * @param getUserInfo - функция получения информации о пользователе с сервера
     * @param saveUserInfo - функция сохранения информации о пользователе на сервере
     * @param updateAvatar - функция сохранения новой аватарки пользователя на сервере
     */
    constructor(
        userNameSelector,
        userDetailsSelector,
        userAvatarSelector,
        {getUserInfo, saveUserInfo, updateAvatar}
    ) {
        this._userNameElement = document.querySelector(userNameSelector);
        this._userDetailsElement = document.querySelector(userDetailsSelector);
        this._userAvatarElement = document.querySelector(userAvatarSelector);
        this._getUserInfo = getUserInfo;
        this._saveUserInfo = saveUserInfo;
        this._updateAvatar = updateAvatar;
    }

    /**
     * Возвращает объект с данными пользователя
     */
    getUserInfo() {
        return this._getUserInfo();
    }

    /**
     * Принимает новые данные пользователя, отправляет их на сервер и добавляет их на страницу.
     * @param userName - имя пользователя
     * @param userDetails - информация о пользователе
     * @param userAvatar - ссылка на новый аватар
     *
     * @returns промис выполнения запроса к серверу
     */
    setUserInfo({userName, userDetails}) {
        return this._saveUserInfo(userName, userDetails)
            .then(savedUserInfo => {
                this._userNameElement.textContent = savedUserInfo.name;
                this._userDetailsElement.textContent = savedUserInfo.about;
            }).catch(err => console.log(err));
    }

    /**
     * Метод сохранения новой аватарки на сервере
     * @param userAvatarLink - ссылка на новый аватар
     * @returns промис выполнения запроса к серверу
     */
    setUserAvatar(userAvatarLink) {
        return this._updateAvatar(userAvatarLink)
            .then(_ => {
                this._userAvatarElement.src = userAvatarLink;
            }).catch(err => console.log(err));
    }
}