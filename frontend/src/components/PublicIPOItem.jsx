import React from 'react';

function PublicIPOItem({ ipo }) {
  return (
    <div className='bg-white p-6 rounded-lg shadow-md mb-4'>
      <h3 className='text-xl font-semibold mb-2'>{ipo.company.name}</h3>
      <p className='text-gray-700 mb-1'>Sector: {ipo.company.sector}</p>
      <p className='text-gray-700 mb-1'>Open Date: {new Date(ipo.openDate).toLocaleDateString()}</p>
      <p className='text-gray-700 mb-1'>Close Date: {new Date(ipo.closeDate).toLocaleDateString()}</p>
      <p className='text-gray-700 mb-2'>Price Band: {ipo.priceBand}</p>
      <span
        className={`px-3 py-1 rounded-full text-sm font-semibold ${
          ipo.status === 'active' ? 'bg-green-200 text-green-800' :
          ipo.status === 'closed' ? 'bg-gray-200 text-gray-800' :
          'bg-yellow-200 text-yellow-800'
        }`}
      >
        {ipo.status.charAt(0).toUpperCase() + ipo.status.slice(1)}
      </span>
    </div>
  );
}

export default PublicIPOItem;