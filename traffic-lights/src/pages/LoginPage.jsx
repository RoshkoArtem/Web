import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    login(email, password);
    navigate('/');
  };

  return (
    <div className="hero bg-base-200 min-h-[60vh] rounded-xl flex items-center justify-center">
      <div className="card w-full max-w-sm shadow-2xl bg-base-100">
        <form className="card-body" onSubmit={handleLogin}>
          <h2 className="text-2xl font-bold text-center mb-4">Вхід у систему</h2>
          <div className="form-control">
            <label className="label"><span className="label-text">Email</span></label>
            <input type="email" placeholder="admin@example.com" className="input input-bordered" 
              value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="form-control">
            <label className="label"><span className="label-text">Пароль</span></label>
            <input type="password" placeholder="admin123" className="input input-bordered" 
              value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div className="form-control mt-6">
            <button type="submit" className="btn btn-primary">Увійти</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
