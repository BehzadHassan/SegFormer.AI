'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface ApiConfigContextType {
  apiBaseUrl: string;
  setApiBaseUrl: (url: string) => void;
}

const ApiConfigContext = createContext<ApiConfigContextType | undefined>(undefined);

export function ApiConfigProvider({ children }: { children: React.ReactNode }) {
  const [apiBaseUrl, setApiBaseUrlState] = useState<string>('http://localhost:8000');
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Load saved URL from localStorage on mount
    const savedUrl = localStorage.getItem('segformer_api_url');
    if (savedUrl) {
      setApiBaseUrlState(savedUrl);
    }
    setIsInitialized(true);
  }, []);

  const setApiBaseUrl = (url: string) => {
    // Remove trailing slash if present
    const cleanUrl = url.trim().replace(/\/$/, '');
    setApiBaseUrlState(cleanUrl);
    localStorage.setItem('segformer_api_url', cleanUrl);
  };

  // Don't render children until initialized to prevent hydration mismatch
  if (!isInitialized) return null;

  return (
    <ApiConfigContext.Provider value={{ apiBaseUrl, setApiBaseUrl }}>
      {children}
    </ApiConfigContext.Provider>
  );
}

export function useApiConfig() {
  const context = useContext(ApiConfigContext);
  if (context === undefined) {
    throw new Error('useApiConfig must be used within an ApiConfigProvider');
  }
  return context;
}
