import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';

import Header from './components/Header';
import AdminLogin from './pages/AdminLogin';
import Dashboard from './pages/Dashboard';
import IPOList from './pages/IPOList';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className='min-h-screen bg-gray-100'>
          <Header />
          <Routes>
            <Route path='/' element={<IPOList />} />
            <Route path='/admin-login' element={<AdminLogin />} />
            <Route path='/dashboard' element={<Dashboard />} />
            {/* Add more routes here if needed, e.g., for specific IPO details */}
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;