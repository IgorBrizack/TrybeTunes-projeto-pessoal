import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import LoadingScreen from './LoadingScreen';

const INPUT_MINIMUM_SIZE = 2;

class Login extends React.Component {
  state ={
    isEnabled: true,
    nameInput: '',
    loading: false,
    redirect: false,
  }

  checkHasName = () => {
    const { nameInput } = this.state;
    if (nameInput.length >= INPUT_MINIMUM_SIZE) {
      this.setState({ isEnabled: false });
    } else {
      this.setState({ isEnabled: true });
    }
  }

  doLogin = async () => {
    const { nameInput } = this.state;
    this.setState({ loading: true });
    await createUser({ name: nameInput });
    this.setState({ loading: false, redirect: true });
  }

  onInputChange = ({ target }) => this.setState({ [target.name]: target.value },
    this.checkHasName());

  render() {
    const { isEnabled, loading, redirect } = this.state;
    return (
      <div data-testid="page-login">
        <form>
          <label htmlFor="name-input">
            Nome:
            <input
              type="text"
              data-testid="login-name-input"
              id="name-input"
              onChange={ this.onInputChange }
              name="nameInput"
            />
          </label>
          <button
            type="button"
            data-testid="login-submit-button"
            disabled={ isEnabled }
            onClick={ this.doLogin }
          >
            Entrar
          </button>
          <div>
            { loading && <LoadingScreen /> }
            { redirect && <Redirect to="/search" /> }
          </div>
        </form>
      </div>
    );
  }
}

export default Login;
