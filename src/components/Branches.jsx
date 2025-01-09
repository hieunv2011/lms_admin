import React, { useState, useEffect } from 'react';
import { EuiBasicTable, EuiFlexGroup, EuiFlexItem, EuiSpacer, EuiButtonIcon } from '@elastic/eui';
import KibanaLayout from '../layouts/kibana';
import useApi from '../utils/useApi';
import CustomerSelect from './Form/CustomerSelect';
import { useAppContext } from './AppContext';

const Branches = () => {
  const [branches, setBranches] = useState([]);
  const [customerId, setCustomerId] = useState(0);
  const { setSelectedCustomer, selectedBranch, setSelectedBranch } = useAppContext();

  const { getBranches } = useApi();

  useEffect(() => {
    (async () => {
      const response = await getBranches(customerId);
      setBranches(response.data.items);
    })();
  }, [customerId, getBranches]);

  const saveToLocalStorage = (branch) => {
    setSelectedBranch(branch);
    setSelectedCustomer({ id: branch.customer.id, name: branch.customer.name });
  };

  const columns = [
    { field: 'id', name: 'ID', width: '100px' },
    { field: 'name', name: 'Tên chi nhánh' },
    {
      name: '',
      actions: [
        {
          render: (branch) => {
            return !selectedBranch || selectedBranch.id !== branch.id ? (
              <EuiButtonIcon
                onClick={() => saveToLocalStorage(branch)}
                iconType="eye"
                aria-label="Chọn chi nhánh"
                title="Chọn chi nhánh"
              />
            ) : null;
          },
        },
      ],
    },
  ];

  return (
    <KibanaLayout pageTitle="Danh sách Chi nhánh">
      <EuiFlexGroup>
        <EuiFlexItem grow={false}>
          <CustomerSelect onChange={(customerId) => setCustomerId(customerId)} value={customerId} />
        </EuiFlexItem>
      </EuiFlexGroup>

      <EuiSpacer size="l" />

      <EuiBasicTable items={branches} columns={columns} />
    </KibanaLayout>
  );
};

export default Branches;
