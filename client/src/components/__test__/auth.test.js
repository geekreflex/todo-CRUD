import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Auth from '../Auth';
import { loginUser, registerUser } from '../../feature/userSlice';

jest.mock('../app/hooks', () => ({
  useAppDispatch: () => jest.fn(),
}));

jest.mock('../feature/userSlice', () => ({
  loginUser: jest.fn(),
  registerUser: jest.fn(),
}));

describe('Auth component', () => {
  test('should render the registration form by default', () => {
    render(<Auth />);
    expect(screen.getByText('Register')).toBeInTheDocument();
  });

  test('should switch to login form on "Login" link click', () => {
    render(<Auth />);
    fireEvent.click(screen.getByText('Login'));
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  test('should switch to registration form on "Register" link click', () => {
    render(<Auth />);
    fireEvent.click(screen.getByText('Login'));
    fireEvent.click(screen.getByText('Register'));
    expect(screen.getByText('Register')).toBeInTheDocument();
  });

  test('should call loginUser action on successful login form submit', () => {
    render(<Auth />);
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const loginButton = screen.getByText('Login');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'test123' } });
    fireEvent.click(loginButton);
    expect(loginUser).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'test123',
    });
  });

  test('should call registerUser action on successful registration form submit', () => {
    render(<Auth />);
    const fullnameInput = screen.getByPlaceholderText('Full name');
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const registerButton = screen.getByText('Regiter');
    fireEvent.change(fullnameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'johndoe@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(registerButton);
    expect(registerUser).toHaveBeenCalledWith({
      fullname: 'John Doe',
      email: 'johndoe@example.com',
      password: 'password123',
    });
  });
});
