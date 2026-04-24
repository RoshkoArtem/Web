import { useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setErrorMsg('');
    
    const response = await login(username, password);
    setIsLoggingIn(false);
    
    if (response.success) {
      const redirectTo = location.state?.from || '/';
      navigate(redirectTo);
    } else {
      setErrorMsg(response.error || 'Невірний логін або пароль. Перевірте Google Таблицю.');
    }
  };

  return (
    <div className="hero bg-base-200 min-h-[70vh] rounded-2xl border border-base-300 flex items-center justify-center px-4">
      <div className="card w-full max-w-sm shadow-2xl bg-base-100">
        <form className="card-body" onSubmit={handleLogin}>
          <h2 className="text-2xl font-bold text-center mb-4">Вхід у систему</h2>
          {location.state?.from && (
            <div className="alert alert-info text-sm">
              Авторизуйтесь, щоб відкрити сторінку `{location.state.from}`
            </div>
          )}
          {errorMsg && (
            <div className="alert alert-error mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span>{errorMsg}</span>
            </div>
          )}
          <div className="form-control">
            <label className="label"><span className="label-text">Логін</span></label>
            <input type="text" placeholder="admin" className="input input-bordered" 
              value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div className="form-control">
            <label className="label"><span className="label-text">Пароль</span></label>
            <input type="password" placeholder="admin123" className="input input-bordered" 
              value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div className="form-control mt-6">
            <button type="submit" className="btn btn-primary" disabled={isLoggingIn}>
              {isLoggingIn ? <span className="loading loading-spinner"></span> : 'Увійти'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
