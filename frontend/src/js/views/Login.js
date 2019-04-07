import React from 'react';
import BaseLayout from './BaseLayout';
import TextField from '../components/TextField';

const Login = () => {
  return (
    <BaseLayout>
      <div className="col-6">
        <div className="card box-shadow">
          <div className="card-body">
            <div className="card-title mb-4">
              <h1 className="h3">Login</h1>
            </div>
            <div className="card-text">
              <TextField
                label="Username"
                id="username"
                helpMessage="This should be the email address you signed up with."
              />
            </div>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};

export default Login;
