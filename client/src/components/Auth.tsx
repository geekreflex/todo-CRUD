import { useState } from 'react';
import { useAppDispatch } from '../app/hooks';
import { loginUser, registerUser } from '../feature/userSlice';
import { LoginFormData, RegisterFormData } from '../types';

const Auth = () => {
  const [view, setView] = useState('register');

  const handleView = () => {
    setView(view === 'register' ? 'login' : 'register');
  };
  return (
    <div className="auth-wrap">
      <div className="auth-main">
        <h1>{view == 'register' ? 'Register' : 'Login'}</h1>
        {view === 'register' && <RegisterForm />}
        {view === 'login' && <LoginForm />}
        {view === 'register' ? (
          <p>
            Already have an account <span onClick={handleView}>Login</span>
          </p>
        ) : (
          <p>
            Don't have an account? <span onClick={handleView}>Register</span>
          </p>
        )}
      </div>
    </div>
  );
};

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload: LoginFormData = { email, password };
    dispatch(loginUser(payload));
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="btn">Login</button>
    </form>
  );
};

const RegisterForm = () => {
  const dispatch = useAppDispatch();
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload: RegisterFormData = { fullname, email, password };
    dispatch(registerUser(payload));
  };

  return (
    <form onSubmit={handleRegister}>
      <input
        type="text"
        placeholder="Full name"
        value={fullname}
        onChange={(e) => setFullname(e.target.value)}
      />
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="btn">Regiter</button>
    </form>
  );
};

export default Auth;
