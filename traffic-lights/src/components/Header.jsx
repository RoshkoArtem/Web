import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Header = () => {
  const { isAuthenticated, userEmail, logout } = useContext(AuthContext);

  const getLinkClass = ({ isActive }) => 
    isActive ? "btn btn-primary" : "btn btn-ghost";

  return (
    <div className="navbar bg-base-200/95 backdrop-blur border border-base-300 shadow-md rounded-2xl mb-8 px-3">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 gap-2">
            <li><NavLink to="/" className={getLinkClass}>Головна</NavLink></li>
            <li><NavLink to="/horizontal" className={getLinkClass}>Горизонтальний світлофор</NavLink></li>
            <li><NavLink to="/vertical" className={getLinkClass}>Вертикальний світлофор</NavLink></li>
            <li><NavLink to="/settings" className={getLinkClass}>Налаштування</NavLink></li>
            {isAuthenticated && <li><NavLink to="/f1-traffic-light" className={getLinkClass}>Світлофор F1</NavLink></li>}
          </ul>
        </div>
        <NavLink to="/" className="btn btn-ghost normal-case text-xl">Світлофори • React</NavLink>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2">
          <li><NavLink to="/" className={getLinkClass}>Головна</NavLink></li>
          <li><NavLink to="/horizontal" className={getLinkClass}>Горизонтальний світлофор</NavLink></li>
          <li><NavLink to="/vertical" className={getLinkClass}>Вертикальний світлофор</NavLink></li>
          <li><NavLink to="/settings" className={getLinkClass}>Налаштування</NavLink></li>
          {isAuthenticated && <li><NavLink to="/f1-traffic-light" className={getLinkClass}>Світлофор F1</NavLink></li>}
        </ul>
      </div>
      <div className="navbar-end gap-2">
        {isAuthenticated && userEmail && (
          <span className="badge badge-neutral hidden md:inline-flex">{userEmail}</span>
        )}
        {isAuthenticated ? (
          <button className="btn btn-error" onClick={logout}>Вихід</button>
        ) : (
          <NavLink to="/login" className="btn btn-accent">Вхід</NavLink>
        )}
      </div>
    </div>
  );
};

export default Header;
