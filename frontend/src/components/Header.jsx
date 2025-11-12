import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  };

  return (
    <header className='bg-gray-800 text-white p-4 flex justify-between items-center'>
      <div>
        <Link to='/' className='text-2xl font-bold'>
          IPO Tracker
        </Link>
      </div>
      <nav>
        <ul className='flex space-x-4 items-center'>
          <li>
            <Link to='/' className='hover:text-gray-300'>Public View</Link>
          </li>
          {isAuthenticated ? (
            <>
              <li>
                <Link to='/dashboard' className='hover:text-gray-300'>Dashboard</Link>
              </li>
              <li>
                <button onClick={onLogout} className='bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded'>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link to='/admin-login' className='hover:text-gray-300'>Admin Login</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;