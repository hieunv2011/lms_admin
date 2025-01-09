import React from 'react';
import CollapsibleNav from './kibana_collapsible_nav';
import { EuiPageTemplate } from '@elastic/eui';
import './kibana.styles.css';
import { useUIContext } from '../components/UIContext';

const KibanaLayout = ({ children, pageHeader, pageTitle, ...rest }) => {
  const { apiLoading } = useUIContext();

  return (
    <div className="mainWrapper">
      <CollapsibleNav pageTitle={pageTitle} loading={apiLoading} />

      <div className="contentWrapper">
        <EuiPageTemplate restrictWidth={false} panelled={false} bottomBorder={true} {...rest}>
          {pageHeader && <EuiPageTemplate.Header {...pageHeader} />}
          <EuiPageTemplate.Section>{children}</EuiPageTemplate.Section>
        </EuiPageTemplate>
      </div>
    </div>
  );
};

export default KibanaLayout;
