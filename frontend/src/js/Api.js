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
      axios
        .post(
          'http://localhost:9000/api/login',
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
          'http://localhost:9000/api/logout',
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
          'http://localhost:9000/api/register',
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
        .get('http://localhost:9000/api/todos/', {
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
          `http://localhost:9000/api/todos`,
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
        .post(`http://localhost:9000/api/todos/${id}`, options, {
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
