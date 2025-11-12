import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteIPO } from '../features/ipos/ipoSlice';

function IPOItem({ ipo, onEditClick }) {
  const dispatch = useDispatch();

  return (
    <tr className='border-b'>
      <td className='py-3 px-4'>{ipo.company.name}</td>
      <td className='py-3 px-4'>{new Date(ipo.openDate).toLocaleDateString()}</td>
      <td className='py-3 px-4'>{new Date(ipo.closeDate).toLocaleDateString()}</td>
      <td className='py-3 px-4'>{ipo.priceBand}</td>
      <td className='py-3 px-4'>
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold ${
            ipo.status === 'active' ? 'bg-green-200 text-green-800' :
            ipo.status === 'closed' ? 'bg-gray-200 text-gray-800' :
            'bg-yellow-200 text-yellow-800'
          }`}
        >
          {ipo.status.charAt(0).toUpperCase() + ipo.status.slice(1)}
        </span>
      </td>
      <td className='py-3 px-4 flex space-x-2'>
        <button
          onClick={() => onEditClick(ipo)}
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded text-sm'
        >
          Edit
        </button>
        <button
          onClick={() => dispatch(deleteIPO(ipo._id))}
          className='bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded text-sm'
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

export default IPOItem;