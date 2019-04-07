import axios from 'axios';

class Api {
  constructor(host) {
    this._host = host;
    this._accessToken = null;
  }

  isAuthenticated() {
    if (this._accessToken === null) {
      // Try to pull in from cookie

      this._accessToken = window.cookies.get('ACCESS_TOKEN');
      console.log(this._accessToken);
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
          Api._setAuthCookie(response.data['access_token']);
          // resolve();
        })
        .catch(error => {
          console.log('=== Error ===');
          console.log(error);
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

  static _setAuthCookie(token) {
    window.cookie.set('ACCESS_TOKEN', token, {
      path: '/',
      maxAge: 60 * 60 * 2
    });
  }

  static _formData(data) {
    let formData = new FormData();
    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        formData.append(key, data[key]);
      }
    }
    return formData;
  }
}

export default Api;
