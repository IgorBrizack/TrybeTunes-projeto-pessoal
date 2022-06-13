/* eslint-disable react/jsx-max-depth */
import React from 'react';
import propTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import LoadingScreen from './LoadingScreen';
import '../bootstrap.min.css';
import MainHeader from './MainHeader';
import Footer from '../components/Footer';

const INPUT_MINIMUM_SIZE = 2;

class Login extends React.Component {
  state ={
    isEnabled: true,
    nameInput: '',
    passwordInput: '',
    loading: false,
    emailInput: '',
    imageInput: '',
    descricaoInput: '',
  }

  componentWillUnmount() {
    this.setState({ loading: false });
  }

  checkHasName = () => {
    const { nameInput, passwordInput } = this.state;
    if (nameInput.length >= INPUT_MINIMUM_SIZE
       && passwordInput.length >= INPUT_MINIMUM_SIZE) {
      this.setState({ isEnabled: false });
    } else {
      this.setState({ isEnabled: true });
    }
  }

  doLogin = async () => {
    const { history } = this.props;
    const { nameInput, emailInput, imageInput, descricaoInput } = this.state;
    this.setState({ loading: true });
    await createUser({ name: nameInput,
      email: emailInput,
      image: imageInput,
      description: descricaoInput });
    // his.setState({ loading: false, redirect: true });
    history.push('/search');
  }

  onInputChange = ({ target }) => this.setState({ [target.name]: target.value },
    this.checkHasName());

  render() {
    const { isEnabled, loading } = this.state;
    return (
      <>
        <MainHeader userName="offline" />
        <div data-testid="page-login" className="login-main-container">
          <form>
            <div className="login-elements">
              <label htmlFor="name-input" className="label-font">
                Usuário:
                <input
                  className="form-control"
                  type="text"
                  data-testid="login-name-input"
                  id="name-input"
                  onChange={ this.onInputChange }
                  name="nameInput"
                />
              </label>
            </div>
            <div className="login-elements">
              <label htmlFor="password-input" className="label-font">
                Senha:
                <input
                  className="form-control"
                  type="password"
                  data-testid="login-password-input"
                  id="password-input"
                  onChange={ this.onInputChange }
                  name="passwordInput"
                />
              </label>
            </div>
            <div className="login-button-element">
              <button
                className="btn btn-primary"
                type="button"
                data-testid="login-submit-button"
                disabled={ isEnabled }
                onClick={ this.doLogin }
              >
                Entrar
              </button>
            </div>
            <div className="loading-screen-main">
              { loading && <LoadingScreen /> }
              {/* { redirect && <Redirect to="/search" /> } */}
            </div>
          </form>
        </div>
        <div>
          <Footer />
        </div>
      </>
    );
  }
}

Login.propTypes = {
  history: propTypes.shape({
    push: propTypes.func.isRequired,
  }).isRequired,
};

export default Login;
