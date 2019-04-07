import axios from 'axios';

class Api {
  constructor(host) {
    this.host = host;
  }

  register(email, password, password_confirmation) {
    return new Promise((resolve, reject) => {
      axios
        .post(
          'http://localhost:9000/api/register',
          Api.formData({
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

  static formData(data) {
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
