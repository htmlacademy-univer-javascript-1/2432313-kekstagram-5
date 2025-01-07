const Urls = {
  GET: 'https://29.javascript.htmlacademy.pro/kekstagram/data',
  POST: 'https://29.javascript.htmlacademy.pro/kekstagram',
};

const ServerCodes = {
  400: 'Неверный запрос',
  401: 'Пользователь не авторизован',
  404: 'Страница не найдена',
  500: 'Внутренняя ошибка сервера',
};

const request = (onSuccess, onFail, method, data) => {
  fetch(Urls[method],
    {
      method: method,
      body: data,
    })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error(`${response.status} (${ServerCodes[response.status] ? ServerCodes[response.status] : response.statusText})`);
    })
    .then((response) => {
      onSuccess(response);
    })
    .catch((err) => {
      onFail(err);
    });
};

export { request };
