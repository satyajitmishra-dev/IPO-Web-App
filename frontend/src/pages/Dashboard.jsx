import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getCompanies, addCompany, reset as resetCompany } from '../features/companies/companySlice';
import { getIPOs, createIPO, updateIPO, reset as resetIPO } from '../features/ipos/ipoSlice';
import Spinner from '../components/Spinner';
import Modal from '../components/Modal';
import CompanyItem from '../components/CompanyItem';
import IPOItem from '../components/IPOItem';

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { companies, isLoading: companiesLoading, isError: companiesError, message: companiesMessage } = useSelector((state) => state.companies);
  const { ipos, isLoading: iposLoading, isError: iposError, message: iposMessage } = useSelector((state) => state.ipos);

  const [activeTab, setActiveTab] = useState('companies'); // 'companies' or 'ipos'
  const [isCompanyModalOpen, setIsCompanyModalOpen] = useState(false);
  const [newCompanyName, setNewCompanyName] = useState('');
  const [newCompanySector, setNewCompanySector] = useState('');

  const [isIPOModalOpen, setIsIPOModalOpen] = useState(false);
  const [currentIPO, setCurrentIPO] = useState(null); // For editing IPO
  const [ipoFormData, setIpoFormData] = useState({
    company: '',
    openDate: '',
    closeDate: '',
    priceBand: '',
    status: 'upcoming',
  });

  useEffect(() => {
    if (!user) {
      navigate('/admin-login');
    } else if (user.role !== 'admin') {
      alert('You are not authorized to view this page.');
      navigate('/');
    }
  }, [user, navigate]);

  useEffect(() => {
    if (companiesError) {
      alert(companiesMessage);
    }
    if (iposError) {
      alert(iposMessage);
    }

    if (user && user.role === 'admin') {
      dispatch(getCompanies());
      dispatch(getIPOs()); // Get all IPOs for admin view
    }

    return () => {
      dispatch(resetCompany());
      dispatch(resetIPO());
    };
  }, [user, navigate, companiesError, companiesMessage, iposError, iposMessage, dispatch]);

  const onAddCompanySubmit = (e) => {
    e.preventDefault();
    if (newCompanyName && newCompanySector) {
      dispatch(addCompany({ name: newCompanyName, sector: newCompanySector }));
      setNewCompanyName('');
      setNewCompanySector('');
      setIsCompanyModalOpen(false);
    } else {
      alert('Please fill in all company fields.');
    }
  };

  const onIpoFormChange = (e) => {
    setIpoFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onAddIPOSubmit = (e) => {
    e.preventDefault();
    const { company, openDate, closeDate, priceBand, status } = ipoFormData;
    if (company && openDate && closeDate && priceBand) {
      const formattedOpenDate = new Date(openDate).toISOString();
      const formattedCloseDate = new Date(closeDate).toISOString();

      if (currentIPO) {
        dispatch(updateIPO({ id: currentIPO._id, ipoData: { company, openDate: formattedOpenDate, closeDate: formattedCloseDate, priceBand, status } }));
      } else {
        dispatch(createIPO({ company, openDate: formattedOpenDate, closeDate: formattedCloseDate, priceBand, status }));
      }
      resetIpoForm();
      setIsIPOModalOpen(false);
    } else {
      alert('Please fill in all IPO fields.');
    }
  };

  const openAddIPOModal = () => {
    setCurrentIPO(null); // Clear for add mode
    resetIpoForm();
    setIsIPOModalOpen(true);
  };

  const openEditIPOModal = (ipo) => {
    setCurrentIPO(ipo);
    setIpoFormData({
      company: ipo.company._id, // Pre-select the company ID
      openDate: ipo.openDate.substring(0, 10), // Format for input type="date"
      closeDate: ipo.closeDate.substring(0, 10),
      priceBand: ipo.priceBand,
      status: ipo.status,
    });
    setIsIPOModalOpen(true);
  };

  const resetIpoForm = () => {
    setIpoFormData({
      company: '',
      openDate: '',
      closeDate: '',
      priceBand: '',
      status: 'upcoming',
    });
  };

  if (companiesLoading || iposLoading) {
    return <Spinner />;
  }

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-3xl font-bold mb-6 text-center'>Admin Dashboard</h1>

      <div className='flex justify-center mb-6'>
        <button
          onClick={() => setActiveTab('companies')}
          className={`px-6 py-3 text-lg font-semibold rounded-t-lg ${activeTab === 'companies' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
        >
          Manage Companies
        </button>
        <button
          onClick={() => setActiveTab('ipos')}
          className={`px-6 py-3 text-lg font-semibold rounded-t-lg ${activeTab === 'ipos' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
        >
          Manage IPOs
        </button>
      </div>

      {activeTab === 'companies' && (
        <div className='bg-white p-6 rounded-lg shadow-md'>
          <div className='flex justify-between items-center mb-4'>
            <h2 className='text-2xl font-bold'>Companies</h2>
            <button
              onClick={() => setIsCompanyModalOpen(true)}
              className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
            >
              Add Company
            </button>
          </div>
          {companies.length > 0 ? (
            <div className='overflow-x-auto'>
              <table className='min-w-full bg-white'>
                <thead>
                  <tr className='w-full bg-gray-200 text-gray-600 uppercase text-sm leading-normal'>
                    <th className='py-3 px-6 text-left'>Company Name</th>
                    <th className='py-3 px-6 text-left'>Sector</th>
                    <th className='py-3 px-6 text-left'>Created At</th>
                    <th className='py-3 px-6 text-left'>Actions</th>
                  </tr>
                </thead>
                <tbody className='text-gray-600 text-sm font-light'>
                  {companies.map((company) => (
                    <CompanyItem key={company._id} company={company} />
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className='text-center text-gray-600 mt-4'>No companies found. Please add some.</p>
          )}
        </div>
      )}

      {activeTab === 'ipos' && (
        <div className='bg-white p-6 rounded-lg shadow-md'>
          <div className='flex justify-between items-center mb-4'>
            <h2 className='text-2xl font-bold'>IPOs</h2>
            <button
              onClick={openAddIPOModal}
              className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
            >
              Add IPO
            </button>
          </div>
          {ipos.length > 0 ? (
            <div className='overflow-x-auto'>
              <table className='min-w-full bg-white'>
                <thead>
                  <tr className='w-full bg-gray-200 text-gray-600 uppercase text-sm leading-normal'>
                    <th className='py-3 px-6 text-left'>Company</th>
                    <th className='py-3 px-6 text-left'>Open Date</th>
                    <th className='py-3 px-6 text-left'>Close Date</th>
                    <th className='py-3 px-6 text-left'>Price Band</th>
                    <th className='py-3 px-6 text-left'>Status</th>
                    <th className='py-3 px-6 text-left'>Actions</th>
                  </tr>
                </thead>
                <tbody className='text-gray-600 text-sm font-light'>
                  {ipos.map((ipo) => (
                    <IPOItem key={ipo._id} ipo={ipo} onEditClick={openEditIPOModal} />
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className='text-center text-gray-600 mt-4'>No IPOs found. Please add some.</p>
          )}
        </div>
      )}

      {/* Add Company Modal */}
      <Modal isOpen={isCompanyModalOpen} onClose={() => setIsCompanyModalOpen(false)} title='Add New Company'>
        <form onSubmit={onAddCompanySubmit}>
          <div className='mb-4'>
            <label htmlFor='companyName' className='block text-gray-700 text-sm font-bold mb-2'>
              Company Name
            </label>
            <input
              type='text'
              id='companyName'
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              value={newCompanyName}
              onChange={(e) => setNewCompanyName(e.target.value)}
              placeholder='e.g., Tech Innovators Inc.'
              required
            />
          </div>
          <div className='mb-6'>
            <label htmlFor='companySector' className='block text-gray-700 text-sm font-bold mb-2'>
              Sector
            </label>
            <input
              type='text'
              id='companySector'
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              value={newCompanySector}
              onChange={(e) => setNewCompanySector(e.target.value)}
              placeholder='e.g., Technology, Finance'
              required
            />
          </div>
          <div className='flex justify-end'>
            <button
              type='button'
              onClick={() => setIsCompanyModalOpen(false)}
              className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2'
            >
              Cancel
            </button>
            <button
              type='submit'
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            >
              Add Company
            </button>
          </div>
        </form>
      </Modal>

      {/* Add/Edit IPO Modal */}
      <Modal isOpen={isIPOModalOpen} onClose={() => setIsIPOModalOpen(false)} title={currentIPO ? 'Edit IPO' : 'Add New IPO'}>
        <form onSubmit={onAddIPOSubmit}>
          <div className='mb-4'>
            <label htmlFor='ipoCompany' className='block text-gray-700 text-sm font-bold mb-2'>
              Company
            </label>
            <select
              id='ipoCompany'
              name='company'
              value={ipoFormData.company}
              onChange={onIpoFormChange}
              className='shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              required
            >
              <option value=''>Select a Company</option>
              {companies.map((company) => (
                <option key={company._id} value={company._id}>
                  {company.name}
                </option>
              ))}
            </select>
          </div>
          <div className='mb-4'>
            <label htmlFor='ipoOpenDate' className='block text-gray-700 text-sm font-bold mb-2'>
              Open Date
            </label>
            <input
              type='date'
              id='ipoOpenDate'
              name='openDate'
              value={ipoFormData.openDate}
              onChange={onIpoFormChange}
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              required
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='ipoCloseDate' className='block text-gray-700 text-sm font-bold mb-2'>
              Close Date
            </label>
            <input
              type='date'
              id='ipoCloseDate'
              name='closeDate'
              value={ipoFormData.closeDate}
              onChange={onIpoFormChange}
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              required
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='ipoPriceBand' className='block text-gray-700 text-sm font-bold mb-2'>
              Price Band
            </label>
            <input
              type='text'
              id='ipoPriceBand'
              name='priceBand'
              value={ipoFormData.priceBand}
              onChange={onIpoFormChange}
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              placeholder='e.g., $100-120'
              required
            />
          </div>
          <div className='mb-6'>
            <label htmlFor='ipoStatus' className='block text-gray-700 text-sm font-bold mb-2'>
              Status
            </label>
            <select
              id='ipoStatus'
              name='status'
              value={ipoFormData.status}
              onChange={onIpoFormChange}
              className='shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              required
            >
              <option value='upcoming'>Upcoming</option>
              <option value='active'>Active</option>
              <option value='closed'>Closed</option>
            </select>
          </div>
          <div className='flex justify-end'>
            <button
              type='button'
              onClick={() => setIsIPOModalOpen(false)}
              className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2'
            >
              Cancel
            </button>
            <button
              type='submit'
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            >
              {currentIPO ? 'Update IPO' : 'Create IPO'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default Dashboard;