import React, { useState, useEffect } from 'react';
import { EuiBasicTable, EuiButtonIcon } from '@elastic/eui';
import KibanaLayout from '../layouts/kibana';
import useApi from '../utils/useApi';
import { useAppContext } from './AppContext';

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const { selectedCustomer, setSelectedCustomer, setSelectedBranch } = useAppContext();

  const { getCustomers } = useApi();

  useEffect(() => {
    (async () => {
      const response = await getCustomers();
      setCustomers(response.data.items);
    })();
  }, [getCustomers]);

  const saveToLocalStorage = (customer) => {
    setSelectedBranch(null);
    setSelectedCustomer(customer);
  };

  const columns = [
    { field: 'id', name: 'ID', width: '100px' },
    { field: 'name', name: 'Tên khách hàng' },
    {
      name: '',
      actions: [
        {
          render: (customer) => {
            return !selectedCustomer || selectedCustomer.id !== customer.id ? (
              <EuiButtonIcon
                onClick={() => saveToLocalStorage(customer)}
                iconType="eye"
                aria-label="Chọn khách hàng"
                title="Chọn khách hàng"
              />
            ) : null;
          },
        },
      ],
    },
  ];

  return (
    <KibanaLayout pageTitle="Danh sách Khách hàng">
      <EuiBasicTable items={customers} columns={columns} />
    </KibanaLayout>
  );
};

export default Customers;
