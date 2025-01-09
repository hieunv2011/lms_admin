import React, { createContext, useContext, useState, useRef, useCallback, useMemo, useEffect } from 'react';
import eventBus from '../utils/eventbus';

const UIContext = createContext();

export function UIProvider({ children }) {
  const [apiLoading, setApiLoadingState] = useState(false);
  const [toasts, setToasts] = useState([]);
  const toastId = useRef(0);

  const setApiLoading = useCallback((loading) => {
    setApiLoadingState(loading);
  }, []);

  const removeToast = useCallback((removedToast) => {
    setToasts((prevToasts) => prevToasts.filter(toast => toast !== removedToast));
  }, [])

  const addToast = useCallback((toast) => {
    toast.id = `toast${toastId.current++}`;
    setToasts((prevToasts) => prevToasts.concat(toast));
  }, [])

  const value = useMemo(() => ({
    apiLoading, 
    setApiLoading, 
    removeToast, 
    toasts, 
    addToast
  }), [apiLoading, toasts]);

  useEffect(() => {
    const handleApiLoading = (isLoading) => {
      setApiLoading(isLoading);
    };

    const handleApiError = (message) => {
      addToast({
        title: 'Error',
        color: 'danger',
        iconType: 'alert',
        text: message,
      });
    };

    // Subscribe to events
    eventBus.on('api-loading', handleApiLoading);
    eventBus.on('api-error', handleApiError);

    return () => {
      eventBus.off('api-loading', handleApiLoading);
      eventBus.off('api-error', handleApiError);
    };
  }, []);

  return (
    <UIContext.Provider value={value}>
      {children}
    </UIContext.Provider>
  );
}

export function useUIContext() {
  return useContext(UIContext);
}