import axios from 'axios';

class Api {
  constructor(host) {
    this._host = host;
    this._accessToken = null;
  }

  isAuthenticated() {
    if (this._accessToken === null) {
      // Try to pull in from cookie
      this._accessToken = window.cookie.get('ACCESS_TOKEN');
    }
    return this._accessToken != null;
  }

  login(username, password) {
    return new Promise((resolve, reject) => {
      console.log(window.env.API_URL);
      axios
        .post(
          `${this._host}/login`,
          Api._formData({
            username,
            password
          })
        )
        .then(response => {
          this._accessToken = response.data.access_token;
          Api._setAccessCookie(this._accessToken);
          resolve();
        })
        .catch(error => {
          reject(error.response.data.error_description);
        });
    });
  }

  logout() {
    return new Promise((resolve, reject) => {
      if (!this.isAuthenticated()) {
        reject('No access token set.');
      }

      axios
        .post(
          `${this._host}/logout`,
          {},
          {
            headers: {
              Authorization: 'Bearer ' + this._accessToken
            }
          }
        )
        .then(() => {
          this._accessToken = null;
          Api._removeAccessCookie();
          resolve();
        })
        .catch(() => {
          this._accessToken = null;
          Api._removeAccessCookie();
          resolve();
        });
    });
  }

  register(email, password, password_confirmation) {
    return new Promise((resolve, reject) => {
      axios
        .post(
          `${this._host}/register`,
          Api._formData({
            email,
            password,
            password_confirmation
          })
        )
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error.response.data.errors);
        });
    });
  }

  todos() {
    return new Promise((resolve, reject) => {
      if (!this.isAuthenticated()) {
        reject('Not authenticated');
      }

      axios
        .get(`${this._host}/todos`, {
          headers: {
            Authorization: 'Bearer ' + this._accessToken
          }
        })
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  createTodo(name) {
    return new Promise((resolve, reject) => {
      if (!this.isAuthenticated()) {
        reject('Not authenticated');
      }

      axios
        .post(
          `${this._host}/todos`,
          { name },
          {
            headers: {
              Authorization: 'Bearer ' + this._accessToken
            }
          }
        )
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error.response.data.errors);
        });
    });
  }

  setTodo(id, options) {
    return new Promise((resolve, reject) => {
      if (!this.isAuthenticated()) {
        reject('Not authenticated');
      }

      axios
        .post(`${this._host}/todos/${id}`, options, {
          headers: {
            Authorization: 'Bearer ' + this._accessToken
          }
        })
        .then(() => {
          resolve();
        })
        .catch(error => {
          reject(error.response.data.errors);
        });
    });
  }

  deleteTodo(id) {
    return new Promise((resolve, reject) => {
      if (!this.isAuthenticated()) {
        reject('Not authenticated');
      }

      axios
        .delete(`${this._host}/todos/${id}`, {
          headers: {
            Authorization: 'Bearer ' + this._accessToken
          }
        })
        .then(() => {
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  static _setAccessCookie(token) {
    window.cookie.set('ACCESS_TOKEN', token, {
      path: '/',
      maxAge: 60 * 60 * 2
    });
  }

  static _removeAccessCookie() {
    window.cookie.remove('ACCESS_TOKEN');
  }

  static _formData(data) {
    const formData = new FormData();
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        formData.append(key, data[key]);
      }
    }
    return formData;
  }
}

export default Api;
