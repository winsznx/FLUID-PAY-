// components/Wallet/AddressBookContent.jsx
import React from 'react';

const AddressBookContent = () => {
  // Example addresses
  const addresses = [
    { name: 'My Exchange', address: '0x1234...5678' },
    { name: 'Friend', address: '0xabcd...ef01' },
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Address Book</h1>
      <div className="mb-4">
        <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
          Add New Contact
        </button>
      </div>
      <div className="border rounded-lg overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Address
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {addresses.map((item, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {item.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {item.address}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button className="text-blue-600 hover:text-blue-800 mr-2">
                    Edit
                  </button>
                  <button className="text-red-600 hover:text-red-800">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AddressBookContent;