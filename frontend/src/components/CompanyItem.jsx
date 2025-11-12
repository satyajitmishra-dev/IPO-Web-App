import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteCompany } from '../features/companies/companySlice';

function CompanyItem({ company }) {
  const dispatch = useDispatch();

  return (
    <tr className='border-b'>
      <td className='py-3 px-4'>{company.name}</td>
      <td className='py-3 px-4'>{company.sector}</td>
      <td className='py-3 px-4'>{new Date(company.createdAt).toLocaleDateString()}</td>
      <td className='py-3 px-4 flex space-x-2'>
        {/* <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded text-sm'>
          Edit
        </button> */}
        <button
          onClick={() => dispatch(deleteCompany(company._id))}
          className='bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded text-sm'
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

export default CompanyItem;