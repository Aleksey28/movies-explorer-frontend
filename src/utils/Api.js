export default class Api {
  constructor({ baseUrl, headers, credentials = "" }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
    this._credentials = credentials;
  }

  _getProxy({ relativePath, method, body = "", headers = {} }) {
    const options = {
      method,
      headers: { ...this._headers, ...headers },
    };

    if (body) {
      options.body = body;
    }
    if (this._credentials) {
      options.credentials = this._credentials;
    }

    return fetch(`${this._baseUrl}${relativePath}`, options);
  }

  async _handleResponse(response) {
    const description = await response.json();

    if (response.ok) {
      return description;
    } else {
      return Promise.reject({
        status: response.status,
        message: description.message
                 ? description.message
                 : description.error
                   ? description.error
                   : "Что-то пошло не так!\nПопробуйте ещё раз.",
      });
    }
  }
}
