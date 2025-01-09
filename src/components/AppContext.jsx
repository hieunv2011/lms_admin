import React, { createContext, useContext, useState, useEffect } from 'react';
import { getProfile, removeToken } from '../utils/storage';
import { EuiLoadingSpinner, EuiFlexGroup, EuiFlexItem } from '@elastic/eui';
import { useLocalStorage } from '../utils/useStorage';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);
  const [selectedBranch, setSelectedBranch] = useLocalStorage('selectedBranch', null);
  const [selectedCustomer, setSelectedCustomer] = useLocalStorage('selectedCustomer', null);

  useEffect(() => {
    const profile = getProfile();
    setIsAuthenticated(!!profile);
    setLoading(false);
    setUserProfile(profile);
  }, []);

  const logout = () => {
    removeToken();
    setIsAuthenticated(false);
  };

  if (loading) {
    return (
      <EuiFlexGroup justifyContent="center" style={{ minHeight: '100vh' }} alignItems="center">
        <EuiFlexItem grow={false} style={{ textAlign: 'center' }}>
          <EuiLoadingSpinner size="xxl" />
        </EuiFlexItem>
      </EuiFlexGroup>
    );
  }
  const contextValue = {
    isAuthenticated,
    setIsAuthenticated,
    userProfile,
    setUserProfile,
    logout,
    loading,
    selectedBranch,
    setSelectedBranch,
    selectedCustomer,
    setSelectedCustomer,
  };

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  return useContext(AppContext);
}
