import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getIPOs, reset } from '../features/ipos/ipoSlice';
import Spinner from '../components/Spinner';
import PublicIPOItem from '../components/PublicIPOItem';

function IPOList() {
  const dispatch = useDispatch();
  const { ipos, isLoading, isError, message } = useSelector((state) => state.ipos);

  const [activeFilter, setActiveFilter] = useState('active'); // 'active' or 'closed' or 'upcoming'

  useEffect(() => {
    if (isError) {
      alert(message);
    }
    dispatch(getIPOs(activeFilter)); // Fetch IPOs based on activeFilter

    return () => {
      dispatch(reset());
    };
  }, [dispatch, isError, message, activeFilter]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-3xl font-bold mb-6 text-center'>Public IPO Listing</h1>

      <div className='flex justify-center mb-6'>
        <button
          onClick={() => setActiveFilter('active')}
          className={`px-6 py-3 text-lg font-semibold rounded-l-lg ${activeFilter === 'active' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
        >
          Active IPOs
        </button>
        <button
          onClick={() => setActiveFilter('upcoming')}
          className={`px-6 py-3 text-lg font-semibold ${activeFilter === 'upcoming' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
        >
          Upcoming IPOs
        </button>
        <button
          onClick={() => setActiveFilter('closed')}
          className={`px-6 py-3 text-lg font-semibold rounded-r-lg ${activeFilter === 'closed' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
        >
          Closed IPOs
        </button>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {ipos.length > 0 ? (
          ipos.map((ipo) => (
            <PublicIPOItem key={ipo._id} ipo={ipo} />
          ))
        ) : (
          <p className='col-span-full text-center text-gray-600 mt-4'>No {activeFilter} IPOs available at the moment.</p>
        )}
      </div>
    </div>
  );
}

export default IPOList;