import React, { useState, useEffect } from 'react';
import { EuiFormRow, EuiComboBox } from '@elastic/eui';
import useApi from '../../utils/useApi';

const CustomerSelect = ({ onChange, value }) => {
  const [selectedIds, setSelectedIds] = useState(value > 0 ? [value] : []);
  const [customers, setCustomers] = useState([]);

  const { getCustomers } = useApi();
  const selectedOptions = customers.filter((customer) => selectedIds.includes(customer.value));

  useEffect(() => {
    (async () => {
      const response = await getCustomers(true);
      const cs = response.data.items.map((s) => ({ label: s.name, value: s.id }));
      setCustomers(cs);
    })();
  }, [getCustomers]);

  const onChangeCustomer = (options) => {
    if (options.length > 0) {
      setSelectedIds([options[0].value]);
      onChange(options[0].value);
    } else {
      setSelectedIds([]);
      onChange(0);
    }
  };

  return (
    <EuiFormRow label="Khách hàng" display="centerCompressed">
      <EuiComboBox
        aria-label="Lựa chọn khách hàng"
        placeholder="Chọn một khách hàng"
        singleSelection={{ asPlainText: true }}
        options={customers}
        selectedOptions={selectedOptions}
        onChange={onChangeCustomer}
        isClearable={true}
      />
    </EuiFormRow>
  );
};

export default CustomerSelect;
