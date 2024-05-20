import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import LoginInput from './LoginInput';
import userEvent from '@testing-library/user-event';
import matchers from '@testing-library/jest-dom/matchers';

expect.extend(matchers);

/**
 * skenario testing
 *
 * - LoginInput component
 *   - should handle username typing correctly
 *   - should handle password typing correctly
 *   - should call login function when login button is clicked
 */

describe('LoginInput component', () => {
  afterEach(() => {
    cleanup();
  });
  it('should handle username typing correctly', async () => {
    render(<LoginInput login={() => {}} />);
    const usernameInput = screen.getByPlaceholderText('Username');

    await userEvent.type(usernameInput, 'usernameInputTest');

    expect(usernameInput).toHaveValue('usernameInputTest');
  });

  it('should handle password typing correctly', async () => {
    render(<LoginInput login={() => {}} />);
    const passwordInput = screen.getByPlaceholderText('Password');

    await userEvent.type(passwordInput, 'PasswordInput');

    expect(passwordInput).toHaveValue('PasswordInput');
  });

  it('should call login function when login button is clicked', async () => {
    const mockLogin = vi.fn();
    render(<LoginInput login={mockLogin} />);
    const usernameInput = screen.getByPlaceholderText('Username');
    const passwordInput = screen.getByPlaceholderText('Password');
    await userEvent.type(usernameInput, 'UsernameInputTest');
    await userEvent.type(passwordInput, 'PasswordInputTest');

    const button = screen.getByRole('button', { name: 'Login' });

    await userEvent.click(button);

    expect(mockLogin).toBeCalledWith({
      id: 'UsernameInputTest',
      password: 'PasswordInputTest',
    });
  });
});
