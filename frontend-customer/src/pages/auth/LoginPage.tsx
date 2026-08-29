/**
 * Question Mart & Cafe - LoginPage Component
 * Minimal login page using existing authentication context
 */

import './LoginPage.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context';
import { useTheme } from '../../context';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const { language, direction } = useTheme();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const content = {
    en: {
      title: 'Welcome Back',
      subtitle: 'Sign in to access your loyalty account',
      emailLabel: 'Email',
      passwordLabel: 'Password',
      loginButton: 'Sign In',
      loading: 'Signing in...',
      emailRequired: 'Email is required',
      passwordRequired: 'Password is required',
    },
    ar: {
      title: 'مرحباً بعودتك',
      subtitle: 'سجل الدخول للوصول إلى حساب الولاء الخاص بك',
      emailLabel: 'البريد الإلكتروني',
      passwordLabel: 'كلمة المرور',
      loginButton: 'تسجيل الدخول',
      loading: 'جاري تسجيل الدخول...',
      emailRequired: 'البريد الإلكتروني مطلوب',
      passwordRequired: 'كلمة المرور مطلوبة',
    },
  };

  const t = content[language];

  // Redirect if already authenticated
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/loyalty');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email) {
      setError(t.emailRequired);
      return;
    }
    if (!password) {
      setError(t.passwordRequired);
      return;
    }

    setIsLoading(true);
    try {
      await login({ email, password });
      navigate('/loyalty');
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="page page--login" dir={direction}>
      <div className="container">
        <div className="login-page">
          <div className="login-page__header">
            <h1 className="login-page__title">{t.title}</h1>
            <p className="login-page__subtitle">{t.subtitle}</p>
          </div>

          <form className="login-page__form" onSubmit={handleSubmit}>
            {error && (
              <div className="login-page__error">
                {error}
              </div>
            )}

            <div className="login-page__field">
              <label htmlFor="email" className="login-page__label">
                {t.emailLabel}
              </label>
              <input
                id="email"
                type="email"
                className="login-page__input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>

            <div className="login-page__field">
              <label htmlFor="password" className="login-page__label">
                {t.passwordLabel}
              </label>
              <input
                id="password"
                type="password"
                className="login-page__input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>

            <button
              type="submit"
              className="login-page__button"
              disabled={isLoading}
            >
              {isLoading ? t.loading : t.loginButton}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
